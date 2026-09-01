export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	concertvenue: {
		name: "Concert Venue",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Concert Venue', `[duration] ${this.field.fieldState.duration || 0}`, "[message] Let's get HYPED!");
		},
		onFieldEnd() {
			this.add('-fieldend', 'Concert Venue', '[message] The hype died down.');
		},
	},
	forestfield: {
		name: "Forest Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.field.fieldState.waterCounter = 0;
			const duration = this.field.fieldState.duration;
			this.add('-fieldstart', 'Forest Field', `[duration] ${duration}`);
			this.add('-message', 'The field is abound with trees.');
		},
		onBasePower(basePower, attacker, defender, move) {
			const counter = (this.field.fieldState as any).waterCounter || 0;
			if (move.type === 'Grass') {
				this.debug('forest field boost');
				this.add('-message', 'The forestry strengthened the attack!');
				return this.chainModify([5325, 4096]);
			}
			if (move.type === 'Bug' && move.category === 'Special') {
				this.debug('forest field boost');
				return this.chainModify([5325, 4096]);
			}
			if (move.id === 'surf' && counter + 1 >= 3) return this.chainModify([13, 10]);
			if (move.id === 'muddywater' && counter + 2 >= 3) return this.chainModify([13, 10]);
		},
		onAfterMove(source, target, move) {
			let amount = 0;
			if (move.id === 'surf') amount = 1;
			if (move.id === 'muddywater') amount = 2;
			if (!amount) return;

			const state = this.field.fieldState as any;
			state.waterCounter = (state.waterCounter || 0) + amount;
			if (state.waterCounter >= 3) {
				this.add('-message', 'The forest became marshy!');
				this.field.setField('swampfield', source, move);
			} else {
				this.add('-message', 'The ground became waterlogged...');
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Forest Field', '[message] The forest calms down.');
		},
	},
	swampfield: {
		name: "Swamp Field",
		effectType: 'Field',
		duration: 0,
		onBeforeMove(pokemon, target, move) {
			if (move.drain) this.field.fieldState.drainStartHP = pokemon.hp;
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (!move.drain) return;
			const oldHP = this.field.fieldState.drainStartHP;
			delete this.field.fieldState.drainStartHP;
			if (oldHP === undefined || pokemon.hp <= oldHP) return;
			if (!target || target.fainted) return;

			const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
			const stat = this.sample(stats);
			const boost: SparseBoostsTable = {};
			boost[stat] = -1;
			this.boost(boost, target, pokemon);
		},
		onResidualOrder: 28,
		onResidual(pokemon) {
			const trapped = !!pokemon.volatiles['partiallytrapped'];
			if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
				this.add('-message', `${pokemon.name}'s strength is sapped by the swamp!`);
				this.damage(pokemon.baseMaxhp / (trapped ? 8 : 16), pokemon);
			}

			if (!pokemon.isGrounded()) return;
			if (pokemon.hasItem(['heavydutyboots', 'clearamulet'])) return;
			if (pokemon.hasAbility([
				'clearbody', 'propellertail', 'quickfeet', 'swiftswim', 'whitesmoke',
			])) return;

			this.add('-message', `${pokemon.name}'s Speed sank...!`);
			this.boost({ spe: trapped ? -2 : -1 }, pokemon, null, this.dex.conditions.get('swampfieldspeed'));
		},
		onBasePower(basePower, attacker, defender, move) {
			switch (move.type) {
			case 'Bug':
				this.add('-message', 'Bugs are swarming everywhere!');
				return this.chainModify([5325, 4096]);
			case 'Grass':
				this.add('-message', 'Thick mangroves line the area!');
				return this.chainModify([5325, 4096]);
			case 'Water':
				this.add('-message', 'The dampness strengthened the attack!');
				return this.chainModify([5325, 4096]);
			case 'Fire':
				this.add('-message', 'The dampness weakened the flame...');
				return this.chainModify([3277, 4096]);
			}
		},
		onFieldStart() {
			this.field.fieldState.waterCounter = 0;
			this.add('-fieldstart', 'Swamp Field', `[duration] ${this.field.fieldState.duration}`);
			this.add('-message', 'The field is swamped.');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Swamp Field', '[message] The swamp recedes.');
		},
	},
	frozendimensionalfield: {
		name: "Frozen Dimensional Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Frozen Dimensional Field', `[duration] ${this.field.fieldState.duration || 0}`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Frozen Dimensional Field');
		},
	},
	corrosivemistfield: {
		name: "Corrosive Mist Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Corrosive Mist Field', `[duration] ${this.field.fieldState.duration || 0}`);
			this.add('-message', 'Corrosive mist settles on the field!');
			for (const pokemon of this.getAllActive()) {
				if (pokemon?.hasAbility('watercompaction')) {
					this.boost({ def: 2 }, pokemon, pokemon, this.dex.abilities.get('watercompaction'));
				}
				if (pokemon?.hasItem('elementalseed') && !pokemon.ignoringItem()) {
					pokemon.useItem();
				}
			}
		},
		onModifyMove(move, pokemon) {
			move.additionalTypes ??= [];
			if (move.category === 'Special' && move.type === 'Flying') {
				move.additionalTypes.push('Poison');
			}
			if (['appleacid', 'bubble', 'bubblebeam', 'sparklingaria', 'energyball'].includes(move.id)) {
				move.additionalTypes.push('Poison');
			}
			if (move.id === 'mistyexplosion' && pokemon.isGrounded()) {
				move.additionalTypes.push('Poison');
			}
		},
		onModifyCritRatio(critRatio, source) {
			if (source.hasAbility('merciless')) return 5;
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			if (move.type === 'Fire') {
				this.add('-message', 'The toxic mist caught flame!');
				modifier *= 1.5;
			}
			if (['appleacid', 'bubble', 'bubblebeam', 'sparklingaria', 'acidspray', 'clearsmog', 'smog'].includes(move.id)) {
				this.add('-message', 'The poison strengthened the attack!');
				modifier *= 1.5;
			}
			if (move.id === 'mistyexplosion' && attacker.isGrounded()) {
				this.add('-message', 'The poison strengthened the attack!');
				modifier *= 1.5;
			}
			if (attacker.hasAbility('corrosion')) modifier *= 1.5;
			if (attacker.hasAbility('toxicboost') && move.category === 'Physical') modifier *= 1.5;

			const transitionMoves = [
				'gravity', 'seedflare', 'bleakwindstorm', 'defog', 'gust', 'hurricane',
				'razorwind', 'tailwind', 'twister', 'whirlwind', 'supersonicskystrike',
				'burningjealousy', 'eruption', 'explosion', 'firepledge', 'flameburst',
				'heatwave', 'incinerate', 'lavaplume', 'mindblown', 'searingshot',
				'selfdestruct', 'infernooverdrive',
			];
			if (transitionMoves.includes(move.id)) modifier *= 1.3;
			if (modifier !== 1) return this.chainModify(modifier);
		},
		onFieldResidualOrder: 28,
		onFieldResidual() {
			const active = this.getAllActive().filter(pokemon => pokemon && !pokemon.fainted);
			for (const pokemon of active) {
				if (pokemon.hasAbility('dryskin')) {
					if (pokemon.hasType('Poison')) {
						this.add('-message', `${pokemon.name} was healed by poison!`);
						this.heal(pokemon.baseMaxhp / 8, pokemon);
					} else if (!pokemon.hasType('Steel')) {
						this.add('-message', `${pokemon.name} absorbed the poison!`);
						this.damage(pokemon.baseMaxhp / 8, pokemon);
					}
				}
				if (pokemon.hasAbility('poisonheal') && !['psn', 'tox'].includes(pokemon.status)) {
					this.add('-message', `${pokemon.name} was healed by the poison!`);
					this.heal(pokemon.baseMaxhp / 8, pokemon);
				}
			}

			if (active.some(pokemon => pokemon.hasAbility('neutralizinggas'))) return;
			let poisoned = false;
			for (const pokemon of active) {
				if (pokemon.hasType(['Poison', 'Steel']) || pokemon.status) continue;
				if (pokemon.setStatus('psn', null, this.effect)) poisoned = true;
			}
			if (poisoned) this.add('-message', 'The Pokémon were poisoned by the corrosive mist!');
		},
		onAfterMove(source, target, move) {
			if (move.id === 'gravity') {
				this.field.clearField();
				this.add('-message', 'The toxic mist collected on the ground!');
				this.field.setField('corrosivefield', source, move);
				return;
			}
			if (move.id === 'seedflare') {
				this.field.clearField();
				this.add('-message', 'The polluted mist was purified!');
				this.field.setTerrain('mistyterrain', source, move);
				return;
			}
			const windMoves = [
				'bleakwindstorm', 'defog', 'gust', 'hurricane', 'razorwind',
				'supersonicskystrike', 'tailwind', 'twister', 'whirlwind',
			];
			if (windMoves.includes(move.id)) {
				this.field.clearField();
				this.add('-message', 'The mist was blown away!');
				return;
			}
			const combustionMoves = [
				'burningjealousy', 'eruption', 'explosion', 'firepledge', 'flameburst',
				'heatwave', 'incinerate', 'lavaplume', 'mindblown', 'searingshot',
				'selfdestruct', 'infernooverdrive',
			];
			if (!combustionMoves.includes(move.id)) return;

			this.field.clearField();
			const dampUser = this.getAllActive().find(pokemon =>
				pokemon && !pokemon.fainted && pokemon.hasAbility('damp')
			);
			if (dampUser) {
				this.add('-ability', dampUser, 'Damp');
				return;
			}

			this.add('-message', 'The toxic mist combusted!');
			for (const pokemon of this.getAllActive()) {
				if (!pokemon || pokemon.fainted) continue;
				if (pokemon.hasAbility('flashfire')) continue;
				if (pokemon.volatiles['commanding'] || pokemon.isSemiInvulnerable()) continue;
				if (
					pokemon.isProtected() || pokemon.side.getSideCondition('wideguard') ||
					pokemon.side.getSideCondition('matblock') || pokemon.side.getSideCondition('quickguard') ||
					pokemon.side.getSideCondition('craftyshield')
				) continue;

				let damage = pokemon.hp;
				if (pokemon.hp === pokemon.maxhp && pokemon.hasAbility('sturdy')) {
					this.add('-ability', pokemon, 'Sturdy');
					damage = pokemon.hp - 1;
				} else if (pokemon.hp === pokemon.maxhp && pokemon.volatiles['endure']) {
					this.add('-activate', pokemon, 'move: Endure');
					damage = pokemon.hp - 1;
				}
				if (damage > 0) this.damage(damage, pokemon, source, move);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Corrosive Mist Field');
		},
	},
	corrosivefield: {
		name: "Corrosive Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Corrosive Field', `[duration] ${this.field.fieldState.duration || 0}`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Corrosive Field');
		},
	},
	underwaterfield: {
		name: "Underwater Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Underwater Field', `[duration] ${this.field.fieldState.duration || 0}`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Underwater Field');
		},
	},
	swampfieldspeed: {
		name: "Swamp Field Speed",
		effectType: "Condition",
	},
	partiallytrapped: {
		inherit: true,
		name: 'partiallytrapped',
		duration: 5,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);
			if (this.effectState.sourceEffect.id === 'thundercage' && this.field.isUnlayeredTerrain('electricterrain')) {
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 4 : 6;
			} else {
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			}
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}

			let divisor = this.effectState.boundDivisor;
			if (this.effectState.sourceEffect.id === 'infestation' && this.field.isField('forestfield')) {
				divisor = 6;
			}

			this.damage(pokemon.baseMaxhp / divisor);

			if (
				this.field.isField('swampfield') &&
				['infestation', 'snaptrap'].includes(this.effectState.sourceEffect.id)
			) {
				const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
				const stat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[stat] = -1;
				this.boost(boost, pokemon, source);
			}
		},
	},
	trapped: {
		inherit: true,
		onStart(target, source, effect) {
			this.effectState.source = source;
			this.effectState.sourceEffect = effect;
			this.add('-activate', target, 'trapped');
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			if (
				this.field.isField('swampfield') &&
				this.effectState.sourceEffect?.id === 'spiderweb'
			) {
				const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
				const stat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[stat] = -1;
				this.boost(boost, pokemon, this.effectState.source);
			}
		},
	},
	shelterelectric: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
	},
	shelterforest: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify(0.5);
			}
		},
	},
	sheltermisty: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy') {
				return this.chainModify(0.5);
			}
		},
	},
	sheltercorrosivemist: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Poison' || move.additionalTypes?.includes('Poison')) {
				return this.chainModify(0.5);
			}
		},
	},
	shelterswamp: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
	},
};
