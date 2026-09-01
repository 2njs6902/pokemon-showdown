export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	//New Abilities
	pollenflight: {
		onResidualOrder: 8,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp) return;

			let totalDamage = 0;
			let activated = false;

			for (const target of this.getAllActive()) {
				if (
					target === pokemon ||
					!target.hp ||
					target.hasType('Grass') ||
					target.volatiles['leechseed']
				) {
					continue;
				}

				if (!activated) {
					this.add('-ability', pokemon, 'Pollenflight');
					activated = true;
				}

				const damage = this.damage(
					target.baseMaxhp / 16,
					target,
					pokemon,
					this.dex.abilities.get('pollenflight')
				);

				if (damage) {
					totalDamage += damage;
				}
			}

			if (totalDamage && pokemon.hp) {
				this.heal(totalDamage, pokemon, pokemon);
			}
		},
		flags: {},
		name: "Pollenflight",
		rating: 3,
		num: 6906,
	},
	swornduty: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				this.heal(ally.baseMaxhp / 4, ally, pokemon);
			}
		},
		flags: {},
		name: "Sworn Duty",
		rating: 0,
		num: 6907,
	},
	memoryleak: {
		onAfterEachBoost(boost, target, source, effect) {
			// Only trigger when the Pokémon WITH Memory Leak got boosted.
			if (target !== this.effectState.target) return;

			const ally = target.allies()[0];
			if (!ally || ally.fainted) return;

			const copiedBoosts: SparseBoostsTable = {};

			let stat: BoostID;
			for (stat in boost) {
				// Only copy positive stat changes.
				if (boost[stat]! > 0) {
					copiedBoosts[stat] = boost[stat];
				}
			}

			if (!Object.keys(copiedBoosts).length) return;

			this.add('-activate', target, 'ability: Memory Leak');

			this.boost(
				copiedBoosts,
				ally,
				target,
				this.effect
			);
		},
		flags: {},
		name: "Memory Leak",
		rating: 3,
		num: 6908,
	},
	foamspray: {
		onDamagingHit(damage, target, source, move) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;

				if (!activated) {
					this.add('-ability', target, 'Foam Spray');
					activated = true;
				}

				this.boost({ def: (this.field.isField('swampfield') ? -2 : -1) }, pokemon, target, null, true);
			}
		},
		flags: {},
		name: "Foam Spray",
		rating: 3,
		num: 6909,
	},
	inexorable: {
		onBasePowerPriority: 21, //Same as analytic (for now)
		onBasePower(basePower, pokemon, target, move) {
			if (move.type !== 'Dragon') return;

			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				// If the target pokemon moves BEFORE us, then you arent the first pokemon and therefore break
				if (this.queue.willMove(target) && !this.queue.willMove(pokemon)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Inexorable boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Inexorable",
		rating: 4, //Fealt it was fitting
		num: 6902,
	},
	invigorate: {
		onAnyTryHeal(damage, target, source, effect) {
			const holder = this.effectState.target;

			// Only boost healing received by the holder's allies.
			if (!target.isAlly(holder) || target === holder) return;

			return this.chainModify([6, 5]);
		},
		flags: {},
		name: "Invigorate",
		rating: 3,
		num: 6910,
	},
	lunaridol: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice') {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			let mod = 1;

			// Weather boost
			if (this.field.isWeather(['hail', 'snowscape'])) {
				mod *= 1.5;
			}

			// Ice move boost
			if (move.type === 'Ice') {
				mod *= 1.5;
			}

			if (mod !== 1) {
				return this.chainModify(mod);
			}
		},
		flags: {},
		name: "Lunar Idol",
		rating: 5,
		num: 6903,
	},
	reflector: {
		onStart(pokemon) {
			let target = pokemon.foes()[0];

			if (this.gameType === 'doubles') {
			target =
				pokemon.foes().find(foe => foe.position === pokemon.position) ||
				pokemon.foes()[0];
			}

			if (!target) return;

			const originalTypes = [...pokemon.getTypes()];
			const finalTypes = [...originalTypes];
			const gainedTypes: string[] = [];

			for (const type of target.getTypes()) {
			if (!originalTypes.includes(type)) {
				finalTypes.push(type);
				gainedTypes.push(type);
			}
			}

			pokemon.m.reflectorTypes = gainedTypes;

			this.add('-ability', pokemon, 'Reflector', '[of] ' + target);
			pokemon.setType(finalTypes);
			if (gainedTypes.length) {
				this.add('-start', pokemon, 'typechange', finalTypes.join('/'));
				this.add('-message', `${pokemon.name} gained the ${gainedTypes.join('/')} type${gainedTypes.length > 1 ? 's' : ''}!`);
			}
		},
		onSourceModifyDamage(damage, attacker, defender, move) {
			const gainedTypes =
			defender.m.reflectorTypes as string[] | undefined;

			if (gainedTypes?.includes(move.type)) {
			this.debug(`Reflector resisted mirrored ${move.type} typing`);
			return this.chainModify(0.5);
			}
		},
		onEnd(pokemon) {
			delete pokemon.m.reflectorTypes;
		},
		onSwitchOut(pokemon) {
			delete pokemon.m.reflectorTypes;
		},
		flags: {},
		name: "Reflector",
		rating: 3,
		num: 6905,
	},
	solaridol: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon, defender, move) {
			let mod = 1;

			// Weather boost
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				mod *= 1.5;
			}

			// Ice move boost
			if (move.type === 'Fire') {
				mod *= 1.5;
			}

			if (mod !== 1) {
				return this.chainModify(mod);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Solar Idol",
		rating: 5,
		num: 6904,
	},
	wildfire: {
		onResidualOrder: 8,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (!target.hp || target.hasType('Fire')) continue;
				if (this.field.isField('forestfield')) {
					this.damage(target.baseMaxhp / 6, target, pokemon);
				} else {
					this.damage(target.baseMaxhp / (target.status === 'brn' ? 8 : 16), target, pokemon);
				}
			}
		},
		flags: {},
		name: "Wildfire",
		rating: 3,
		num: 6911,
	},
	junglebeat: {
		onModifyMove(move, pokemon) {
			if (move.type === 'Grass') {
				move.flags['sound'] = 1;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Jungle Beat sound boost');
				return this.chainModify(this.field.isField('forestfield') ? 1.5 : [5325, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Jungle Beat sound resistance');
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Jungle Beat",
		rating: 4,
		num: 6912,
	},

	//Edited Abillities
	aftermath: {
		inherit: true,
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(
					source.baseMaxhp * (this.field.isField('corrosivemistfield') ? 0.5 : 0.25),
					source,
					target
				);
			}
		},
	},
	battery: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost');
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.5 : 1.3));
			}
		},
	},
	comatose: {
			inherit: true,
			onSetStatus(status, target, source, effect) {
				if (this.field.isUnlayeredTerrain('electricterrain')) {
					return;
				} else if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Comatose');
				}
				return false;
			},
	},
	dryskin: {
		inherit: true,
		onResidual(target) {
			if (this.field.isField('swampfield') || this.field.isTerrain('mistyterrain')) {
				if (this.field.isField('swampfield')) this.add('-message', `${target.name}'s Dry Skin was healed by the murk!`);
				else if (this.field.isTerrain('mistyterrain')) this.add('-message', `${target.name} was healed a little by the mist!`);
				this.heal(target.baseMaxhp / 16, target);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
	},
	effectspore: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (this.field.isField('forestfield')) {
					if (r < 21) {
						source.setStatus('slp', target);
					} else if (r < 41) {
						source.setStatus('par', target);
					} else if (r < 60) {
						source.setStatus('psn', target);
					}
				}
				else {
					if (r < 11) {
						source.setStatus('slp', target);
					} else if (r < 21) {
						source.setStatus('par', target);
					} else if (r < 30) {
						source.setStatus('psn', target);
					}
				}
			}
		},
	},
	electricsurge: {
		inherit: true,
		onStart(source) {
			if (this.field.setTerrain('electricterrain')) {
				this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 8 : 5;
			}
		},
	},
	electromorphosis: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('electricterrain')) {
				this.boost({ spa: 1 }, pokemon);
			}
		},
	},
	galvanize: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (this.field.isUnlayeredTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	gooey: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				this.boost({ spe: (this.field.isField('swampfield') ? -2 : -1) }, source, target, null, true);
			}
		},
	},
	grasspelt: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (this.field.isField('forestfield') || this.field.isTerrain('grassyterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	gulpmissile: {
		inherit: true,
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'surf' && source.hasAbility('gulpmissile') && source.species.name === 'Cramorant') {
				let forme;
				if (!this.field.isField('')) {
					forme = this.field.isField('swampfield') ? 'cramorantgulping' : source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				} else if (this.field.isTerrain('electricterrain')) {
					forme = 'cramorantgorging';
				} else {
					forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				}
				source.formeChange(forme, effect);
			}
		},
	},
	hadronengine: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.setTerrain('electricterrain')) {
				this.field.terrainState.duration = pokemon.hasItem('amplifiedrock') ? 8 : 5;
			} else if (this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Hadron Engine boost');
				this.add('-message', `${attacker.name} used the Electric Terrain to energize its futuristic engine!`);
				return this.chainModify([5461, 4096]);
			}
		},
	},
	leafguard: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather()) || this.field.isField('forestfield')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
	},
	longreach: {
		inherit: true,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (this.field.isField('forestfield')) {
				if (typeof accuracy !== 'number') return;
				this.debug('longreach in forestfield - hindering accuracy');
				return this.chainModify(0.9);
			}
		},
	},
	lightningrod: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source  && (move.type === 'Electric' || move.additionalTypes?.includes('Electric'))) {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('electricterrain')) {
				this.boost({ spa: 1 }, pokemon);
			}
		},
	},
	marvelscale: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (pokemon.status || this.field.isTerrain('mistyterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	mimicry: {
		inherit: true,
			onTerrainChange(pokemon) {
			let types;

			switch (this.field.field) {
			case 'corrosivemistfield':
				types = ['Poison'];
				break;
			case 'forestfield':
				types = ['Bug'];
				break;
			case 'swampfield':
				types = ['Water'];
				break;
			default:
				switch (this.field.terrain) {
				case 'electricterrain':
					types = ['Electric'];
					break;
				case 'grassyterrain':
					types = ['Grass'];
					break;
				case 'mistyterrain':
					types = ['Fairy'];
					break;
				case 'psychicterrain':
					types = ['Psychic'];
					break;
				default:
					types = pokemon.baseSpecies.types;
				}
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;

			if (this.field.field || this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');

				if (!this.field.field && !this.field.terrain) {
					this.hint("Transform Mimicry changes you to your original un-transformed types.");
				}
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
	},
	toxicchain: {
		inherit: true,
		onSourceDamagingHit(damage, target, source, move) {
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (!this.randomChance(3, 10)) return;
			if (this.field.isField('corrosivemistfield')) {
				target.setStatus('tox', source, this.effect, true);
			} else {
				target.trySetStatus('tox', source);
			}
		},
	},
	minus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	mistysurge: {
		inherit: true,
		onStart(source) {
			if (this.field.setTerrain('mistyterrain')) {
				this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 8 : 5;
			}
		},
	},
	motordrive: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source  && (move.type === 'Electric' || move.additionalTypes?.includes('Electric'))) {
				if (!this.boost({ spe: 1 })) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isUnlayeredTerrain('electricterrain')) {
				this.add('-message', `${pokemon.name} drank tree sap to recover!`);
				this.boost({ spe: 1 });
			}
		},
	},	
	overgrow: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('forestfield'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('forestfield'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
	},
	pixilate: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify(this.field.isTerrain('mistyterrain') ? 1.5 : 1.2);
		},
	},
	plus: {
		inherit: true,
		onModifySpA(spa, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
	},
	quarkdrive: {
		inherit: true,
		condition: {
			inherit: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.effectState.bestStat = pokemon.getBestStat(false, true);
					const statName = {
						atk: 'Attack',
						def: 'Defense',
						spa: 'Special Attack',
						spd: 'Special Defense',
						spe: 'Speed',
					}[this.effectState.bestStat as 'atk' | 'def' | 'spa' | 'spd' | 'spe'];
					this.add('-message', `The Electric Terrain activated ${pokemon.name}'s Quark Drive, heightening its ${statName}!`);
				}
				if (!this.effectState.bestStat) {
					this.effectState.bestStat = pokemon.getBestStat(false, true);
				}
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
		},
	},
	quickfeet: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (pokemon.status || this.field.isUnlayeredTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	pastelveil: {
		inherit: true,
		onAnyModifyDamage(damage, source, target, move) {
			const holder = this.effectState.target;
			if (
				move.type === 'Poison' && this.field.isTerrain('mistyterrain', target) &&
				(target === holder || target.isAlly(holder))
			) {
				this.debug('Pastel Veil weakened a Poison-type attack in the mist');
				return this.chainModify(0.5);
			}
		},
	},
	rattled: {
		inherit: true,
		onSwitchIn() {
			if (this.field.isField('swampfield')) {
				this.boost({ spe: 1 });
			}
		}
	},
	sapsipper: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Grass' || move.additionalTypes?.includes('Grass'))) {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isField('forestfield')) {
				this.add('-message', `${pokemon.name} drank tree sap to recover!`);
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
	},
	slowstart: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.activeTurns && this.effectState.counter) {
				this.effectState.counter -= this.field.isUnlayeredTerrain('electricterrain') ? 2 : 1;
				if (this.effectState.counter <= 0) {
					this.add('-end', pokemon, 'Slow Start');
					delete this.effectState.counter;
				}
			}
		},
	},
	soulheart: {
		inherit: true,
		onAnyFaint() {
			if (this.field.isUnlayeredTerrain('mistyterrain')) {
				this.boost({ spa: 1, spd: 1 }, this.effectState.target);
			}
			else this.boost({ spa: 1 }, this.effectState.target);
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.field.isUnlayeredTerrain('electricterrain') ? this.randomChance(6, 10) : this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
	},
	steadfast: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.5);
			}
		},
	},
	swarm: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('forestfield'))) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('forestfield'))) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
	},
	teravolt: {
		inherit: true,
		onModifyMove(move) {
			move.ignoreAbility = true;
			if (this.field.isUnlayeredTerrain('electricterrain') && move.type === 'Electric') {
				move.ignoreImmunity = { Electric: true };
			}
		},
	},
	transistor: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : 1.3));
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : 1.3));
			}
		},
	},
	voltabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Electric' || move.additionalTypes?.includes('Electric'))) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.add('-message', `${pokemon.name} absorbed stray electricity!`);
				this.heal(pokemon.baseMaxhp / 16);
			}
		},
	},
	watercompaction: {
		inherit: true,
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isField('swampfield')  && pokemon.isGrounded()) {
				this.boost({def: 2});
			}
		},
		onSwitchIn(pokemon) {
			if (this.field.isTerrain('mistyterrain') || this.field.isField('corrosivemistfield')) {
				this.boost({def: 2});
			}
		},
	},
};
