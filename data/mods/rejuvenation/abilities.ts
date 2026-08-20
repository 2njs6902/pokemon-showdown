export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
	rattled: {
		inherit: true,
		onSwitchIn(pokemon) {
			if (this.field.isField('swampfield')) {
				this.boost({ spe: 1 });
			}
		}
	},
	sapsipper: {
		inherit: true,
		onField(target, source, effect) {
			if (this.field.isField('forestfield')) {
				this.add('-message', `${target.name} drank tree sap to recover!`);
				this.heal(target.baseMaxhp / 16);
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
	watercompaction: {
		inherit: true,
		onField(target) {
			if (this.field.isField('swampfield')  && target.isGrounded()) {
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
