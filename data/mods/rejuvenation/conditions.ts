export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	concertvenue: {
		name: "Concert Venue",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Concert Venue', "[message] Let's get HYPED!");
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
			this.add('-fieldstart', 'Frozen Dimensional Field');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Frozen Dimensional Field');
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
	shelterswamp: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
	},
};
