export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
				}
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Comatose');
				}
				return false;
			},
	},
	dryskin: {
		inherit: true,
		onWeather(target, source, effect) {
			if (this.field.isField('swampfield')) {
				this.add('-message', `${target.name}'s Dry Skin was healed by the murk!`);
				this.heal(target.baseMaxhp / 16);
			}
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
	foamspray: {
		inherit: true,
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
	},
	galvanize: {
		inherit: true,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.field.isUnlayeredTerrain('electricterrain') ? this.chainModify(1.5) : this.chainModify(1.2);
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
	junglebeat: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Jungle Beat sound boost');
				return this.chainModify(this.field.isField('forestfield') ? 1.5 : [5325, 4096]);
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
		onStart(pokemon) {
			if (this.field.isUnlayeredTerrain('electricterrain')) {
				this.boost({ spa: 1 }, pokemon);
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
	mimicry: {
		inherit: true,
		onTerrainChange(pokemon) {
			let types;

			switch (this.field.field) {
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
	motordrive: {
		inherit: true,
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
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : [5325, 4096]));
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify((this.field.isUnlayeredTerrain('electricterrain') ? 1.6 : [5325, 4096]));
			}
		},
	},
	voltabsorb: {
		inherit: true,
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
	},
	wildfire: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			if (pokemon.hasType('Fire')) return;
			if (this.field.isField('forestfield')) {
				this.damage(pokemon.baseMaxhp / 6, pokemon, null);
			} else {
				this.damage(pokemon.baseMaxhp / (pokemon.status === 'brn' ? 8 : 16), pokemon, null);
			}
		},
	},
};
