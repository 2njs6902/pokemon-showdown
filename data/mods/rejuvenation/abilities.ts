function moveHasType(move: ActiveMove, type: string) {
	return move.type === type || !!move.additionalTypes?.includes(type);
}

export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	//New Abilities
	souleater: {
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Ghost')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Soul Eater');
				}
				return null;
			}
		},
		onResidualOrder: 8,
		onResidual(pokemon) {
			if (this.field.isField('hauntedfield')) {
				this.heal(pokemon.baseMaxhp / 16, pokemon);
			}
		},
		flags: { breakable: 1 },
		name: "Soul Eater",
		rating: 3.5,
		num: 6913,
	},
	resuscitation: {
		onBeforeFaint(pokemon) {
			const zombieFormes: Partial<Record<string, string>> = {
				parasaevium: 'Paras-Aevium-Zombie',
				parasectaevium: 'Parasect-Aevium-Zombie',
			};
			const zombieForme = zombieFormes[pokemon.species.id];
			if (!zombieForme) return;

			this.add('-ability', pokemon, 'Resuscitation');
			pokemon.formeChange(zombieForme, this.effect, true);
			pokemon.hp = pokemon.maxhp;
			this.add('-heal', pokemon, pokemon.getHealth, '[from] ability: Resuscitation');
			this.add('-message', `${pokemon.name} was resuscitated!`);

			if (this.field.isField('hauntedfield')) {
				const restoredBoosts: SparseBoostsTable = {};
				let stat: BoostID;
				for (stat in pokemon.boosts) {
					if (pokemon.boosts[stat] < 0) restoredBoosts[stat] = -pokemon.boosts[stat];
				}
				if (Object.keys(restoredBoosts).length) {
					this.boost(restoredBoosts, pokemon, pokemon, this.effect);
				}
			}
			return false;
		},
		flags: { cantsuppress: 1, notransform: 1 },
		name: "Resuscitation",
		rating: 4,
		num: 6914,
	},
	baddreams: {
		inherit: true,
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp || this.field.isField('rainbowfield')) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
	},
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

				this.boost({ def: (this.field.isField(['swampfield', 'watersurfacefield', 'murkwatersurfacefield']) ? -2 : -1) }, pokemon, target, null, true);
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
				return this.chainModify(1.3);
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

			const resistedType = gainedTypes?.find(type => moveHasType(move, type));

			if (resistedType) {
			this.debug(`Reflector resisted mirrored ${resistedType} typing`);
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
				if (this.field.isField('forestfield') || this.field.isUnlayeredTerrain('grassyterrain')) {
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
	cottondown: {
		inherit: true,
		onDamagingHit(damage, target) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;
				if (!activated) {
					this.add('-ability', target, 'Cotton Down');
					activated = true;
				}
				this.boost({ spe: this.field.isUnlayeredTerrain('grassyterrain') ? -2 : -1 }, pokemon, target, null, true);
			}
		},
	},
	cursedbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (move.isMax || move.flags['futuremove'] || move.id === 'struggle') return;
			if ((!target.hp && this.field.isField('hauntedfield')) || this.randomChance(3, 10)) {
				source.addVolatile('disable', target);
			}
		},
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
	anticipation: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('psychicterrain')) {
				this.boost({ spa: 2 }, pokemon);
			}
			else if (this.field.isTerrain('psychicterrain')) {
				this.boost({ spa: 1 }, pokemon);
			}
		},
	},
	battery: {
		inherit: true,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost ' + (this.field.isUnlayeredTerrain('electricterrain') ? '(1.5x)' : '(1.3x)'));
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.5 : 1.3));
			}
		},
	},
	comatose: {
			inherit: true,
			onStart(pokemon) {
				if (!this.field.isUnlayeredTerrain('electricterrain')) {
					this.add('-ability', pokemon, 'Comatose');
				}
			},
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
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Water')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Skin');
				}
				return null;
			}
		},
		onResidual(target) {
			if (this.field.isField(['swampfield', 'watersurfacefield', 'underwaterfield'])) {
				if (this.heal(target.baseMaxhp / 16, target)) {
					if (this.field.isField('swampfield')) {
						this.add('-message', `${target.name}'s Dry Skin was healed by the murk!`);
					} else {
						this.add('-message', `${target.name} absorbed some of the water!`);
					}
				}
			}
			if (this.field.isTerrain('mistyterrain')) {
				this.add('-message', `${target.name} was healed a little by the mist!`);
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
	eartheater: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Ground')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
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
	flashfire: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Fire')) {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
	},
	forewarn: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('psychicterrain')) {
				this.boost({ spa: 2 }, pokemon);
			}
			else if (this.field.isTerrain('psychicterrain')) {
				this.boost({ spa: 1 }, pokemon);
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
				this.debug('Galvanize boost by ' + (this.field.isUnlayeredTerrain('electricterrain') ? '1.5x' : '1.3x'));
				return this.chainModify(1.5);
			}
		},
	},
	gooey: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				this.boost({ spe: (this.field.isField(['swampfield', 'murkwatersurfacefield']) ? -2 : -1) }, source, target, null, true);
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
	grassysurge: {
		inherit: true,
		onStart(source) {
			if (this.field.setTerrain('grassyterrain', source, this.effect)) {
				this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 8 : 5;
			}
		},
	},
	harvest: {
		inherit: true,
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isUnlayeredTerrain('grassyterrain') ||
				this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
	},
	heatproof: {
		inherit: true,
		onDamage(damage, target, source, effect) {
			if (effect?.id === 'brn' && !this.field.isField('icyfield')) return damage / 2;
		},
	},
	hydration: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.status && (
				['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()) ||
				this.field.isField('underwaterfield') ||
				(this.field.isField('watersurfacefield') && pokemon.isGrounded())
			)) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Hydration",
		rating: 1.5,
		num: 93,
	},
	gulpmissile: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.isSemiInvulnerable()) return;
			if (!['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) return;
			let missileDamage = source.baseMaxhp / 4;
			if (this.field.isField('underwaterfield')) {
				let typeMod = 0;
				for (const type of source.getTypes()) typeMod += this.dex.getEffectiveness('Water', type);
				if (!this.dex.getImmunity('Water', source)) missileDamage = 0;
				else missileDamage *= 2 ** typeMod;
			}
			if (missileDamage) this.damage(missileDamage, source, target);
			if (target.species.id === 'cramorantgulping') {
				this.boost({ def: -1 }, source, target, null, true);
			} else {
				source.trySetStatus('par', target, move);
			}
			target.formeChange('cramorant', move);
		},
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'surf' && source.hasAbility('gulpmissile') && source.species.name === 'Cramorant') {
				let forme;
				if (!this.field.isField('')) {
					forme = this.field.isField('swampfield') || this.field.isField('watersurfacefield') || this.field.isField('underwaterfield') ? 'cramorantgulping' : source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
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
	justified: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (moveHasType(move, 'Dark')) {
				this.boost({ atk: 1 });
			}
		},
	},
	leafguard: {
		inherit: true,
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather()) ||
				this.field.isField('forestfield') || this.field.isUnlayeredTerrain('grassyterrain')) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && (['sunnyday', 'desolateland'].includes(target.effectiveWeather()) ||
				this.field.isField('forestfield') || this.field.isUnlayeredTerrain('grassyterrain'))) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
	},
	lightningrod: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Electric')) {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (!moveHasType(move, 'Electric') || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Lightning Rod');
				}
				return this.effectState.target;
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
			if (
				pokemon.status || this.field.isTerrain('mistyterrain') ||
				this.field.isField('rainbowfield')
			) {
				return this.chainModify(1.5);
			}
		},
	},
	mimicry: {
		inherit: true,
			onTerrainChange(pokemon) {
			let types;
			if (this.field.isTerrain('rainbowterrain')) {
				types = ['Dragon'];
			} else {

			switch (this.field.field) {
			case 'rainbowfield':
				types = ['Dragon'];
				break;
			case 'hauntedfield':
			case 'narcissafield':
				types = ['Ghost'];
				break;
			case 'corrosivemistfield':
				types = ['Poison'];
				break;
			case 'forestfield':
				types = ['Bug'];
				break;
			case 'swampfield':
				types = ['Water'];
				break;
			case 'watersurfacefield':
			case 'underwaterfield':
				types = ['Water'];
				break;
			case 'icyfield':
				types = ['Ice'];
				break;
			case 'murkwatersurfacefield':
				types = ['Poison'];
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
	schooling: {
		inherit: true,
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.transformed) return;

			const waterSurfaceSchooling = this.field.isField('underwaterfield') ||
				(this.field.isField(['watersurfacefield', 'murkwatersurfacefield']) && pokemon.isGrounded());

			const shouldSchool = waterSurfaceSchooling || (pokemon.level >= 20 && pokemon.hp > pokemon.maxhp / 4);

			if (shouldSchool) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else if (pokemon.species.id === 'wishiwashischool') {
				pokemon.formeChange('Wishiwashi');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.transformed || !pokemon.hp) return;

			const waterSurfaceSchooling = this.field.isField('underwaterfield') ||
				(this.field.isField(['watersurfacefield', 'murkwatersurfacefield']) && pokemon.isGrounded());

			const shouldSchool = waterSurfaceSchooling || (pokemon.level >= 20 && pokemon.hp > pokemon.maxhp / 4);

			if (shouldSchool) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else if (pokemon.species.id === 'wishiwashischool') {
				pokemon.formeChange('Wishiwashi');
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
			if (this.field.isTerrain('electricterrain') || (pokemon.hasItem('minuncrest') && pokemon.baseSpecies.baseSpecies === 'Minun')) {
				this.field.isTerrain('electricterrain') ? this.debug('Minus Electric Terrain Boost (1.5x)') : this.debug('Minus Crest Boost (1.5x)');
				return this.chainModify(1.5);
			}
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus']) || allyActive.hasItem('minuncrest')) {
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
			if (target !== source && moveHasType(move, 'Electric')) {
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
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 ||
				this.field.isField('forestfield') || this.field.isUnlayeredTerrain('grassyterrain'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && (attacker.hp <= attacker.maxhp / 3 ||
				this.field.isField('forestfield') || this.field.isUnlayeredTerrain('grassyterrain'))) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
	},
	perishbody: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target) || source.volatiles['perishsong']) return;
			this.add('-ability', target, 'Perish Body');
			source.addVolatile('perishsong');
			target.addVolatile('perishsong');
			if (this.field.isField('hauntedfield')) {
				source.addVolatile('trapped', target, this.effect, 'trapper');
			}
		},
	},
	powerspot: {
		inherit: true,
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker) {
			if (attacker !== this.effectState.target) {
				const boosted = this.field.isField('hauntedfield') ||
					this.field.isUnlayeredTerrain('psychicterrain');
				return this.chainModify(boosted ? 1.5 : [5325, 4096]);
			}
		},
	},
	psychicsurge: {
		inherit: true,
		onStart(source) {
			if (this.field.setTerrain('psychicterrain', source, this.effect)) {
				this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 8 : 5;
			}
		},
	},
	purepower: {
		inherit: true,
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			if (!this.field.isTerrain('psychicterrain')) return this.chainModify(2);
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
			if (this.field.isTerrain('electricterrain') || (pokemon.hasItem('pluslecrest') && pokemon.baseSpecies.baseSpecies === 'Plusle')) {
				return this.chainModify(1.5);
			}
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus']) || allyActive.hasItem('pluslecrest')) {
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
				this.debug('Quick Feet Speed Boost (1.5x)');
				return this.chainModify(1.5);
			}
		},
	},
	pastelveil: {
		inherit: true,
		onAnyModifyDamage(damage, source, target, move) {
			const holder = this.effectState.target;
			if (
				moveHasType(move, 'Poison') &&
				(this.field.isTerrain('mistyterrain', target) || this.field.isField('rainbowfield')) &&
				(target === holder || target.isAlly(holder))
			) {
				this.debug('Pastel Veil weakened a Poison-type attack in the mist');
				return this.chainModify(0.5);
			}
		},
	},
	prismarmor: {
		inherit: true,
		onSourceModifyDamage(damage, source, target, move) {
			if (this.field.isField('rainbowfield') || target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify(0.75);
			}
		},
	},
	rattled: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isField('hauntedfield')) {
				this.boost({ spe: 1 }, pokemon);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].some(type => moveHasType(move, type))) {
				this.boost({ spe: 1 });
			}
		},
		onSwitchIn() {
			if (this.field.isField('swampfield')) {
				this.boost({ spe: 1 });
			}
		},
	},
	sapsipper: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Grass')) {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (moveHasType(move, 'Grass')) {
				this.boost({ atk: 1 }, this.effectState.target);
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
	seedsower: {
		inherit: true,
		onDamagingHit(damage, target) {
			if (this.field.setTerrain('grassyterrain', target, this.effect)) {
				this.field.terrainState.duration = target.hasItem('amplifiedrock') ? 8 : 5;
			}
		},
	},
	shadowtag: {
		inherit: true,
		onStart(pokemon) {
			if (!this.field.isField('hauntedfield')) return;

			for (const target of pokemon.foes()) {
				if (!target.hp || !target.item) continue;
				this.add('-item', target, target.getItem(), '[from] ability: Shadow Tag', `[of] ${pokemon}`);
			}
		},
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
	},
	zenmode: {
		inherit: true,
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('psychicterrain') &&
				pokemon.baseSpecies.baseSpecies === 'Darmanitan' && !pokemon.transformed) {
				pokemon.addVolatile('zenmode');
			}
		},
		onTerrainChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) return;
			if (this.field.isUnlayeredTerrain('psychicterrain')) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && pokemon.volatiles['zenmode']) {
				pokemon.removeVolatile('zenmode');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) return;
			if ((this.field.isUnlayeredTerrain('psychicterrain') || pokemon.hp <= pokemon.maxhp / 2) &&
				!['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (!this.field.isUnlayeredTerrain('psychicterrain') && pokemon.hp > pokemon.maxhp / 2 &&
				['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
				pokemon.removeVolatile('zenmode');
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
			if (this.field.isUnlayeredTerrain('mistyterrain') || this.field.isField('rainbowfield')) {
				this.boost({ spa: 1, spd: 1 }, this.effectState.target);
			}
			else this.boost({ spa: 1 }, this.effectState.target);
		},
	},
	wonderskin: {
		inherit: true,
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				return this.field.isField('rainbowfield') ? 0 : 50;
			}
		},
	},
	static: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.field.isUnlayeredTerrain('electricterrain') ? this.randomChance(6, 10) : this.randomChance(3, 10)) {
					this.debug('Static ability triggered by contact in ' + (this.field.isUnlayeredTerrain('electricterrain') ? 'Electric Terrain (6/10 chance)' : 'normal conditions (3/10 chance)'));
					source.trySetStatus('par', target);
				}
			}
		},
	},
	steamengine: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].some(type => moveHasType(move, type))) {
				this.boost({ spe: 6 });
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.activeTurns && this.field.isField(['watersurfacefield', 'underwaterfield'])) {
				this.boost({ spe: 1 }, pokemon);
			}
		},
	},
	wanderingspirit: {
		inherit: true,
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.activeTurns && this.field.isField('hauntedfield')) {
				this.boost({ spe: -1 }, pokemon);
			}
		},
	},
	steadfast: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Steadfast Electric Terrain Boost (1.5x)');
				return this.chainModify(1.5);
			}
		},
	},
	surgesurfer: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isTerrain('electricterrain') || (this.field.isField(['watersurfacefield', 'murkwatersurfacefield']) && pokemon.isGrounded())) {
				return this.chainModify(2);
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
	swiftswim: {
		onModifySpe(spe, pokemon) {
			if (
				['raindance', 'primordialsea'].includes(pokemon.effectiveWeather()) ||
				this.field.isField('underwaterfield') ||
				(this.field.isField(['watersurfacefield', 'murkwatersurfacefield']) && pokemon.isGrounded())
			) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Swift Swim",
		rating: 3,
		num: 33,
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
	torrent: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (moveHasType(move, 'Water') && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('underwaterfield') || (this.field.isField('watersurfacefield') && attacker.isGrounded()))) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (moveHasType(move, 'Water') && (attacker.hp <= attacker.maxhp / 3 || this.field.isField('underwaterfield') || (this.field.isField('watersurfacefield') && attacker.isGrounded()))) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	transistor: {
		inherit: true,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost by ' + (this.field.isUnlayeredTerrain('electricterrain') ? '1.6x' : '1.3x'));
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : 1.3));
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost by ' + (this.field.isUnlayeredTerrain('electricterrain') ? '1.6x' : '1.3x'));
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : 1.3));
			}
		},
	},
	stormdrain: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Water')) {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (!moveHasType(move, 'Water') || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
	},
	thermalexchange: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (moveHasType(move, 'Fire')) {
				this.boost({ atk: 1 });
			}
		},
	},
	voltabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Electric')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isTerrain('electricterrain') && this.heal(pokemon.baseMaxhp / 16)) {
				this.add('-message', `${pokemon.name} absorbed stray electricity!`);
			}
		},
	},
	watercompaction: {
		inherit: true,
		onDamagingHit(damage, target, source, move) {
			if (moveHasType(move, 'Water')) {
				this.boost({ def: 2 });
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isField('underwaterfield') || (this.field.isField(['swampfield', 'watersurfacefield', 'murkwatersurfacefield']) && pokemon.isGrounded())) {
				this.boost({def: 2});
			}
		},
		onSwitchIn(pokemon) {
			if (this.field.isTerrain('mistyterrain') || this.field.isField('corrosivemistfield')) {
				this.boost({def: 2});
			}
		},
	},
	waterabsorb: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Water')) {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isField(['watersurfacefield', 'underwaterfield'])) {
				if (this.heal(pokemon.baseMaxhp / 16)) {
					this.add('-message', `${pokemon.name} absorbed some of the water!`);
				}
			}
		},
	},
	icebody: {
		inherit: true,
		onResidual(pokemon) {
			if (this.field.isField('icyfield') && this.heal(pokemon.baseMaxhp / 16)) {
				this.add('-message', `${pokemon.name} was healed a little by the ice!`);
			}
		},
	},
	icescales: {
		inherit: true,
		onEffectiveness(typeMod, target, type) {
			if (this.field.isField('icyfield') && type === 'Ice' && target?.hasType('Ice') && typeMod > 0) return 0;
		},
	},
	liquidvoice: {
		inherit: true,
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags.sound && !pokemon.volatiles['dynamax']) {
				move.type = this.field.isField('icyfield') ? 'Ice' : 'Water';
			}
		},
	},
	refrigerate: {
		inherit: true,
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) {
				return this.chainModify(this.field.isField('icyfield') ? 1.5 : [4915, 4096]);
			}
		},
	},
	slushrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isField('icyfield') || this.field.isWeather(['hail', 'snowscape'])) return this.chainModify(2);
		},
	},
	snowcloak: {
		inherit: true,
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isField('icyfield') || this.field.isWeather(['hail', 'snowscape'])) {
				return this.chainModify([3277, 4096]);
			}
		},
	},
	liquidooze: {
		inherit: true,
		onSourceTryHeal(damage, target, source, effect) {
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (!canOoze.includes(effect.id)) return;
			this.damage(this.field.isField('murkwatersurfacefield') ? damage * 2 : damage);
			return 0;
		},
	},
	stench: {
		inherit: true,
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category === 'Status') return;
			if (!move.secondaries) move.secondaries = [];
			for (const secondary of move.secondaries) {
				if (secondary.volatileStatus === 'flinch') return;
			}
			move.secondaries.push({
				chance: this.field.isField('murkwatersurfacefield') ? 20 : 10,
				volatileStatus: 'flinch',
			});
		},
	},
	waterveil: {
		inherit: true,
		onUpdate(pokemon) {
			// Water Veil's normal effect: immediately cure burn.
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			// Water Veil's normal effect: prevent burn.
			if (status.id !== 'brn') return;

			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			// Rejuvenation: cure regular status at the end of each turn.
			if (
				pokemon.status &&
				(
					this.field.isField('watersurfacefield') ||
					this.field.isField('underwaterfield')
				)
			) {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
	},
	wellbakedbody: {
		inherit: true,
		onTryHit(target, source, move) {
			if (target !== source && moveHasType(move, 'Fire')) {
				if (!this.boost({ def: 2 })) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
	},
};
