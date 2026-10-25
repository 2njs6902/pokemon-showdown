function moveHasType(move: ActiveMove, type: string) {
	return move.type === type || !!move.additionalTypes?.includes(type);
}

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
	hauntedfield: {
		name: "Haunted Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Haunted Field', `[duration] ${this.field.fieldState.duration || 0}`);
			this.add('-message', 'The field is haunted!');
			for (const pokemon of this.getAllActive()) {
				if (pokemon?.hasItem('magicalseed') && !pokemon.ignoringItem()) pokemon.useItem();
			}
		},
		onModifyMove(move) {
			move.additionalTypes ??= [];
			if (['flameburst', 'inferno', 'flamecharge', 'firespin'].includes(move.id)) {
				move.additionalTypes.push('Ghost');
			}
			if (moveHasType(move, 'Ghost')) move.ignoreImmunity = { Ghost: true };
			if (['willowisp', 'hypnosis'].includes(move.id)) move.accuracy = 90;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (type === 'Normal' && moveHasType(move, 'Ghost')) return 0;
			if (move.id === 'spiritbreak' && type === 'Ghost') return 1;
			if (move.additionalTypes?.includes('Ghost')) {
				return typeMod + this.dex.getEffectiveness('Ghost', type);
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			const boostedMoves = [
				'flameburst', 'inferno', 'flamecharge', 'firespin', 'burningjealousy',
				'torchsong', 'bitterblade', 'boneclub', 'bonerush', 'bonemerang', 'astonish',
			];
			if (boostedMoves.includes(move.id)) {
				modifier *= 1.5;
				const messages: Record<string, string> = {
					flameburst: "Will-o'-wisps joined the attack!",
					inferno: "Will-o'-wisps joined the attack!",
					flamecharge: "Will-o'-wisps joined the attack!",
					firespin: "Will-o'-wisps joined the attack!",
					burningjealousy: "Will-o'-wisps joined the attack!",
					torchsong: 'A dirge for the dead...',
					bitterblade: "Will-o'-wisps joined the attack!",
					boneclub: 'Spooky scary skeletons!',
					bonerush: 'Spooky scary skeletons!',
					bonemerang: 'Spooky scary skeletons!',
					astonish: 'Boo!',
				};
				this.add('-message', messages[move.id]);
			}
			if (moveHasType(move, 'Ghost')) {
				modifier *= 1.5;
				this.add('-message', 'The evil aura powered up the attack!');
			}
			if (modifier !== 1) return this.chainModify(modifier);
		},
		onFieldResidualOrder: 28,
		onFieldResidual() {
			for (const pokemon of this.getAllActive()) {
				if (!pokemon?.hp || pokemon.hasType('Ghost')) continue;
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) continue;
				this.add('-message', `${pokemon.name}'s dream is corrupted by the evil spirits!`);
				this.damage(pokemon.baseMaxhp / 16, pokemon);
			}
		},
		onAfterMove(source, target, move) {
			if (['judgment', 'originpulse', 'purify', 'sacredfire'].includes(move.id)) {
				this.add('-message', 'The evil spirits have been exorcised!');
				this.field.setField('blessedfield', source, move);
				return;
			}
			if (['flash', 'dazzlinggleam'].includes(move.id)) {
				this.add('-message', 'The evil spirits have been forced back!');
				this.field.clearField();
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Haunted Field');
		},
	},
	narcissafield: {
		name: "Narcissa Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Narcissa Field', `[duration] ${this.field.fieldState.duration || 0}`);
			this.add('-message', 'The field is haunted!');
			for (const pokemon of this.getAllActive()) {
				if (pokemon?.hasItem('magicalseed') && !pokemon.ignoringItem()) pokemon.useItem();
			}
		},
		onModifyMove(move) {
			move.additionalTypes ??= [];
			if (['flameburst', 'inferno', 'flamecharge', 'firespin'].includes(move.id)) {
				move.additionalTypes.push('Ghost');
			}
			if (moveHasType(move, 'Ghost')) move.ignoreImmunity = { Ghost: true };
			if (['willowisp', 'hypnosis'].includes(move.id)) move.accuracy = 90;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (type === 'Normal' && moveHasType(move, 'Ghost')) return 0;
			if (move.id === 'spiritbreak' && type === 'Ghost') return 1;
			if (move.additionalTypes?.includes('Ghost')) {
				return typeMod + this.dex.getEffectiveness('Ghost', type);
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			const boostedMoves = [
				'flameburst', 'inferno', 'flamecharge', 'firespin', 'burningjealousy',
				'torchsong', 'bitterblade', 'boneclub', 'bonerush', 'bonemerang', 'astonish',
			];
			if (boostedMoves.includes(move.id)) {
				modifier *= 1.5;
				const messages: Record<string, string> = {
					flameburst: "Will-o'-wisps joined the attack!",
					inferno: "Will-o'-wisps joined the attack!",
					flamecharge: "Will-o'-wisps joined the attack!",
					firespin: "Will-o'-wisps joined the attack!",
					burningjealousy: "Will-o'-wisps joined the attack!",
					torchsong: 'A dirge for the dead...',
					bitterblade: "Will-o'-wisps joined the attack!",
					boneclub: 'Spooky scary skeletons!',
					bonerush: 'Spooky scary skeletons!',
					bonemerang: 'Spooky scary skeletons!',
					astonish: 'Boo!',
				};
				this.add('-message', messages[move.id]);
			}
			if (moveHasType(move, 'Ghost')) {
				modifier *= 1.5;
				this.add('-message', 'The evil aura powered up the attack!');
			}
			if (modifier !== 1) return this.chainModify(modifier);
		},
		onFieldResidualOrder: 28,
		onFieldResidual() {
			for (const pokemon of this.getAllActive()) {
				if (!pokemon?.hp || pokemon.hasType('Ghost')) continue;
				if (pokemon.status !== 'slp' && !pokemon.hasAbility('comatose')) continue;
				this.add('-message', `${pokemon.name}'s dream is corrupted by the evil spirits!`);
				this.damage(pokemon.baseMaxhp / 16, pokemon);
			}
		},
		onAfterMove(source, target, move) {
			if (['judgment', 'originpulse', 'purify', 'sacredfire'].includes(move.id)) {
				this.add('-message', 'The evil spirits have been exorcised!');
				this.field.setField('blessedfield', source, move);
				return;
			}
			if (['flash', 'dazzlinggleam'].includes(move.id)) {
				this.add('-message', 'The evil spirits have been forced back!');
				this.field.setField('forestfield', source, move);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Narcissa Field');
		},
	},
	blessedfield: {
		name: "Blessed Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Blessed Field', `[duration] ${this.field.fieldState.duration || 0}`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Blessed Field');
		},
	},
	rainbowfield: {
		name: "Rainbow Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart(field, source, effect) {
			this.add('-fieldstart', 'Rainbow Field', `[duration] ${this.field.fieldState.duration || 0}`);
			if (!['firepledge', 'waterpledge', 'raindance', 'sunnyday'].includes(effect?.id || '')) {
				this.add('-message', 'What does it mean?');
			}
			for (const pokemon of this.getAllActive()) {
				if (pokemon?.hasItem('magicalseed') && !pokemon.ignoringItem()) pokemon.useItem();
			}
		},
		onModifyMove(move) {
			if (move.category === 'Special' && move.type === 'Normal') {
				(move as any).rainbowNormal = true;
				const types = this.dex.types.all().filter(type => (
					type.exists && !['Normal', 'Stellar'].includes(type.name)
				));
				move.type = this.sample(types).name;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			const boostedMoves = [
				'silverwind', 'mysticalfire', 'dragonpulse', 'triattack', 'sacredfire',
				'firepledge', 'waterpledge', 'grasspledge', 'aurorabeam', 'mirrorbeam',
				'judgment', 'relicsong', 'hiddenpower', 'secretpower', 'weatherball',
				'mistball', 'heartstamp', 'moonblast', 'zenheadbutt', 'sparklingaria',
				'fleurcannon', 'prismaticlaser', 'twinkletackle', 'oceanicoperetta',
				'solarbeam', 'solarblade', 'dazzlinggleam', 'luminacrash',
			];
			if (boostedMoves.includes(move.id)) {
				this.add('-message', 'The attack was rainbow-charged!');
				modifier *= 1.5;
			}
			if (['darkpulse', 'shadowball', 'nightdaze', 'neverendingnightmare'].includes(move.id)) {
				this.add('-message', 'The rainbow softened the attack...');
				modifier *= 0.5;
			}
			if ((move as any).rainbowNormal) {
				this.add('-message', 'The rainbow energized the attack!');
				modifier *= 1.5;
			}
			if (modifier !== 1) return this.chainModify(modifier);
		},
		onModifySecondaries(secondaries, target, source) {
			for (const secondary of secondaries) {
				if (!secondary.chance) continue;
				if (secondary.volatileStatus === 'flinch' && source.hasAbility('serenegrace')) continue;
				secondary.chance = Math.min(100, secondary.chance * 2);
			}
		},
		onFieldResidualOrder: 28,
		onFieldResidual() {
			for (const pokemon of this.getAllActive()) {
				if (!pokemon?.hp) continue;
				if (pokemon.hasAbility('cloudnine')) {
					const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe', 'accuracy', 'evasion'];
					const available = stats.filter(stat => pokemon.boosts[stat] < 6);
					if (available.length) {
						const boost: SparseBoostsTable = {};
						boost[this.sample(available)] = 1;
						this.boost(boost, pokemon, pokemon, this.dex.abilities.get('cloudnine'));
					}
				}
				if (pokemon.status === 'slp' || pokemon.hasAbility('comatose')) {
					if (this.heal(pokemon.baseMaxhp / 16, pokemon)) {
						this.add('-message', `${pokemon.name} recovered health in its peaceful sleep!`);
					}
				}
			}
		},
		onWeatherChange() {
			if (!this.field.isWeather(['sandstorm', 'hail', 'snow'])) return;
			this.add('-message', 'The weather blocked out the rainbow!');
			this.field.clearField();
		},
		onAfterMove(source, target, move) {
			if (move.id === 'lightthatburnsthesky') {
				this.add('-message', 'The rainbow was consumed!');
				this.field.clearField();
			} else if (move.id === 'sandsearstorm') {
				this.add('-message', 'The sandstorm blocked out the rainbow!');
				this.field.clearField();
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Rainbow Field');
		},
	},
	rainbowterrain: {
		name: "Rainbow Terrain",
		effectType: 'Terrain',
		duration: 4,
		onFieldStart() {
			this.add('-fieldstart', 'Rainbow Terrain', `[duration] ${this.field.terrainState.duration || 0}`);
		},
		onModifyMove(move) {
			if (move.category === 'Special' && move.type === 'Normal') {
				(move as any).rainbowNormal = true;
				const types = this.dex.types.all().filter(type => (
					type.exists && !['Normal', 'Stellar'].includes(type.name)
				));
				move.type = this.sample(types).name;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			const boostedMoves = [
				'silverwind', 'mysticalfire', 'dragonpulse', 'triattack', 'sacredfire',
				'firepledge', 'waterpledge', 'grasspledge', 'aurorabeam', 'mirrorbeam',
				'judgment', 'relicsong', 'hiddenpower', 'secretpower', 'weatherball',
				'mistball', 'heartstamp', 'moonblast', 'zenheadbutt', 'sparklingaria',
				'fleurcannon', 'prismaticlaser', 'twinkletackle', 'oceanicoperetta',
				'solarbeam', 'solarblade', 'dazzlinggleam', 'luminacrash',
			];
			if (boostedMoves.includes(move.id)) {
				this.add('-message', 'The attack was rainbow-charged!');
				modifier *= 1.5;
			}
			if ((move as any).rainbowNormal) {
				this.add('-message', 'The rainbow energized the attack!');
				modifier *= 1.3;
			}
			if (modifier !== 1) return this.chainModify(modifier);
		},
		onModifySecondaries(secondaries, target, source) {
			for (const secondary of secondaries) {
				if (!secondary.chance) continue;
				if (secondary.volatileStatus === 'flinch' && source.hasAbility('serenegrace')) continue;
				secondary.chance = Math.min(100, secondary.chance * 2);
			}
		},
		onFieldEnd() {
			this.add('-fieldend', 'Rainbow Terrain');
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
		onEffectiveness(typeMod, target, type, move) {
			if (move.additionalTypes?.includes('Poison')) {
				return typeMod + this.dex.getEffectiveness('Poison', type);
			}
		},
		onModifyCritRatio(critRatio, source) {
			if (source.hasAbility('merciless')) return 5;
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
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
		onAfterMove(source, target, move) {
			if (!['purify', 'seedflare'].includes(move.id)) return;
			this.field.clearField();
			this.field.setTerrain('grassyterrain', source, move);
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
	icyfield: {
		name: "Icy Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Icy Field', `[duration] ${this.field.fieldState.duration || 0}`);
			this.add('-message', 'The field is covered in ice.');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Icy Field');
		},
	},
	murkwatersurfacefield: {
		name: "Murkwater Surface Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Murkwater Surface Field', `[duration] ${this.field.fieldState.duration || 0}`);
			this.add('-message', 'The water is tainted...');
		},
		onFieldEnd() {
			this.add('-fieldend', 'Murkwater Surface Field');
		},
	},
	watersurfacefield: {
		name: "Water Surface Field",
		effectType: 'Field',
		duration: 0,
		onResidualOrder: 28,
		onResidual(pokemon) {
			if (pokemon.removeVolatile('tarshot')) {
				this.add('-message', `The tar washed off ${pokemon.name} in the water!`);
			}
		},
		onFieldStart() {
			this.field.fieldState.pollutionCounter = 0;
			const duration = this.field.fieldState.duration;
			this.add('-fieldstart', 'Water Surface Field', `[duration] ${duration}`);
			this.add('-message', 'The water\'s surface is calm.');

			let removedSpikes = false;
			for (const side of this.sides) {
				if (side.removeSideCondition('spikes')) removedSpikes = true;
				if (side.removeSideCondition('toxicspikes')) removedSpikes = true;
			}
			if (removedSpikes) {
				this.add('-message', '...The spikes sank into the water and vanished!');
			}

			for (const pokemon of this.getAllActive()) {
				if (pokemon?.hasItem('elementalseed') && !pokemon.ignoringItem()) {
					pokemon.useItem();
				}
			}
		},
		onModifyMove(move) {
			if (move.id === 'shoreup') move.type = 'Water';
		},
		onTryHit(target, source, move) {
			if (moveHasType(move, 'Ground')) {
				this.add('-message', '...But there was no solid ground to attack from!');
				return null;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			let modifier = 1;
			if ([
				'whirlpool', 'surf', 'muddywater', 'dive', 'sludgewave',
				'octazooka', 'originpulse', 'hydrovortex', 'tripledive',
			].includes(move.id)) {
				modifier *= 1.2;
				this.add('-message', move.id === 'sludgewave' ?
					'Poison spread through the water!' : 'The attack rode the current!');
			}
			if (moveHasType(move, 'Water')) {
				modifier *= 1.5;
				this.add('-message', 'The water strengthened the attack!');
			}
			if (defender.isGrounded() && moveHasType(move, 'Electric')) {
				modifier *= 1.5;
				this.add('-message', 'The water conducted the attack!');
			}
			if (defender.isGrounded() && moveHasType(move, 'Fire')) {
				modifier *= 0.5;
				this.add('-message', 'The water deluged the attack...');
			}
			if (attacker.hasAbility('propellertail') && move.priority > 0) {
				modifier *= 1.5;
			}

			if (modifier !== 1) return this.chainModify(modifier);
		},
		onAfterMove(source, target, move) {
			if (['gravity', 'dive', 'anchorshot', 'gravapple', 'tripledive'].includes(move.id)) {
				if (['gravity', 'gravapple'].includes(move.id)) {
					this.add('-message', 'The battle sank into the depths!');
				} else {
					this.add('-message', 'The battle was pulled underwater!');
				}
				this.field.setField('underwaterfield', source, move);
				return;
			}
			if (['blizzard', 'glaciate', 'subzeroslammer'].includes(move.id)) {
				this.add('-message', 'The water froze over!');
				this.field.setField('icyfield', source, move);
				return;
			}
			if (!['sludgewave', 'acidownpour'].includes(move.id)) return;

			const state = this.field.fieldState as any;
			state.pollutionCounter = (state.pollutionCounter || 0) + (move.id === 'acidownpour' ? 2 : 1);
			if (state.pollutionCounter >= 2) {
				this.add('-message', 'The water was polluted!');
				this.field.setField('murkwatersurfacefield', source, move);
			} else {
				this.add('-message', 'Poison spread through the water!');
			}
		},
		onModifySpe(spe, pokemon) {
			if (
				!pokemon.isGrounded() ||
				pokemon.hasType('Water') ||
				pokemon.hasAbility(['surgesurfer', 'swiftswim'])
			) {
				return;
			}

			this.debug('Water Surface Field Speed reduction (0.75x)');
			return this.chainModify(0.75);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Water Surface Field', '[message] The water\'s surface calms down.');
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
			if (this.effectState.sourceEffect.id === 'whirlpool' && this.field.isField('watersurfacefield')) {
				divisor = this.effectState.boundDivisor === 6 ? 4 : 6;
			}
			if (this.effectState.sourceEffect.id === 'firespin' && this.field.isField('hauntedfield')) {
				divisor = this.effectState.boundDivisor === 6 ? 4 : 6;
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
			if (move.type === 'Electric' || move.additionalTypes?.includes('Electric')) {
				this.debug('Shelter reducing damage from Electric-type move');
				return this.chainModify(0.5);
			}
		},
	},
	shelterforest: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug' || move.additionalTypes?.includes('Bug')) {
				return this.chainModify(0.5);
			}
		},
	},
	desertfield: {
		name: "Desert Field",
		effectType: 'Field',
		duration: 0,
		onFieldStart() {
			this.add('-fieldstart', 'Desert Field', `[duration] ${this.field.fieldState.duration || 0}`);
		},
		onFieldEnd() {
			this.add('-fieldend', 'Desert Field');
		},
	},
	sheltergrassy: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass' || move.additionalTypes?.includes('Grass')) return this.chainModify(0.5);
		},
	},
	sheltermisty: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Fairy' || move.additionalTypes?.includes('Fairy')) {
				return this.chainModify(0.5);
			}
		},
	},
	shelterpsychic: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Psychic' || move.additionalTypes?.includes('Psychic')) return this.chainModify(0.5);
		},
	},
	shelterhaunted: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (moveHasType(move, 'Ghost')) return this.chainModify(0.5);
		},
	},
	shelterrainbow: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (moveHasType(move, 'Dragon')) return this.chainModify(0.5);
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
			if (move.type === 'Water' || move.additionalTypes?.includes('Water')) {
				return this.chainModify(0.5);
			}
		},
	},
	shelterwatersurface: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water' || move.additionalTypes?.includes('Water')) {
				return this.chainModify(0.5);
			}
		},
	},
};
