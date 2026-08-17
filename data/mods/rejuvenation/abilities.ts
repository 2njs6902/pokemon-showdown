export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
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
	grasspelt: {
		inherit: true,
		onModifyDef(def, pokemon) {
			if (this.field.isField('forestfield') || this.field.isTerrain('grassyterrain')) {
				return this.chainModify(1.5);
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
			if (this.field.isField('forestfield')) {
				types = ['Bug'];
			} else {
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
			if (this.field.terrain || this.field.isField('forestfield') || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain && !this.field.isField('forestfield')) {
					this.hint("Transform Mimicry changes you to your original un-transformed types.");
				}
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
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
	sapsipper: {
		inherit: true,
		onResidual(pokemon) {
			if (this.field.isField('forestfield')) {
				this.add('-message', `${pokemon.name} drank tree sap to recover!`);
				this.heal(pokemon.baseMaxhp / 16);
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
};
