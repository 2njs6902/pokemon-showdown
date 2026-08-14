const REJUV_FIELDS = [
	'junglefield',
	'ancientruins',
	'electricterrainfield',
	'cavefield',
] as const;

export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
    // chloroblast: {
    //     inherit: true,
	// 	num: 835,
	// 	accuracy: 95,
	// 	basePower: 150,
	// 	category: "Special",
	// 	name: "Chloroblast",
	// 	pp: 5,
	// 	priority: 0,
	// 	flags: { protect: 1, mirror: 1, metronome: 1 },
	// 	// Recoil implemented in battle-actions.ts
	// 	secondary: null,
	// 	target: "normal",
	// 	type: "Grass",
	// },
    aircutter: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
		onBasePower(basePower, pokemon, target) {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
				return this.chainModify(1.5);
			}
		},
    },
    airslash: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    attackorder: {
        inherit: true,
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'They\'re coming out of the woodwork!');
                return this.chainModify(1.5);
            }
        },
    },
    branchpoke: {
        inherit: true,
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'Straight from the tree!');
                return this.chainModify(1.5);
            }
        },
    },
    breakingswipe: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
	camouflage: {
        inherit: true,
		onHit(target) {
			let newType = 'Normal';
            if (this.field.isField('forestfield')) {
                newType = 'Bug';
            } else if (this.field.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.field.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.field.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.field.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			}

			if (target.getTypes().join() === newType || !target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
    cut: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
		onBasePower(basePower, pokemon, target) {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
				return this.chainModify(2.0);
			}
		},

	},
	defendorder: {
        inherit: true,
        onModifyMove(move, pokemon, target) {
            if (this.field.isField('forestfield')) {
                move.self = { boosts: { def: 2, spd: 2 } };
            }
        },
    },
    electroweb: {
        inherit: true,
		onBasePower(basePower, pokemon, target) {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'Gossamer and arbor strengthened the attack!');
				return this.chainModify(1.5);
			}
		},
    },
	explosion: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
		},
	},
    electricterrain: {
        inherit: true,
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (status.id === 'slp' && target.isGrounded() && !target.isSemiInvulnerable()) {
					if (effect.id === 'yawn' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Electric Terrain');
					}
					return false;
				}
			},
			onTryAddVolatile(status, target) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'yawn') {
					this.add('-activate', target, 'move: Electric Terrain');
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				if (move.type === 'Electric' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('electric terrain boost');
					return this.chainModify([5325, 4096]);
				}
			},
			onFieldStart(field, source, effect) {
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, `[of] ${source}`);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain');
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
    forestscurse: {
        inherit: true,
        onHit(target, source, move) {
            if (target.hasType('Grass')) return false;
			if (!target.addType('Grass')) return false;
			this.add('-start', target, 'typeadd', 'Grass', '[from] move: Forest\'s Curse');

            if (this.field.isField('forestfield')) {
                target.addVolatile('curse', source);
		    }
        },
    },
    furcutter: {
        inherit: true,
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    gravapple: {
        inherit: true,
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The apple did not fall far from the tree!');
                return this.chainModify(1.5);
            }
        },
    },
    growth: {
        inherit: true,
        onModifyMove(move, pokemon, target) {
            if (this.field.isField('forestfield')) {
                move.boosts = { spa: 2, atk: 2 };
            }
        },
    },
    healorder: {
        inherit: true,
        onModifyMove(move, pokemon, target) {
            if (this.field.isField('forestfield')) {
                move.heal = [2, 3];
            }
        },
        gen: 9,
    },
    hurricane: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
		},
    },
    hydrovortex: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
    },
	ingrain: {
        inherit: true,
		condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'move: Ingrain');
			},
			onResidualOrder: 7,
			onResidual(pokemon) {
                if(this.field.isField('forestfield')) {
                    this.heal(pokemon.baseMaxhp / 8);
                }
                else {
                    this.heal(pokemon.baseMaxhp / 16);
                }
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			// groundedness implemented in battle.engine.js:BattlePokemon#isGrounded
			onDragOut(pokemon) {
				this.add('-activate', pokemon, 'move: Ingrain');
				return null;
			},
		},
	},
    jugglehealing: {
        inherit: true,
        onHit(pokemon) {
            let success;
            if (this.field.isField('forestfield')) {
                success = !!this.heal(this.modify(pokemon.maxhp, 0.33));
            }
            else {
                success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
            }
			return pokemon.cureStatus() || success;
		},
        gen: 9,
    },
    muddywater: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The forest softened the attack...');
                return this.chainModify(0.5);
            }
        },
    }, 
    naturepower: {
        inherit: true,
        onTryHit(target, pokemon) {
			let move = 'triattack';
            if (this.field.isField('forestfield')) {
                move = 'woodhammer';
            } else if (this.field.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.field.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.field.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.field.isTerrain('psychicterrain')) {
				move = 'psychic';
			}
			this.actions.useMove(move, pokemon, { target });
			return null;
		},
    },
	naturesmadness: {
        inherit: true,
		damageCallback(pokemon, target) {
            if (this.field.isField('forestfield')) {
			    return this.clampIntRange(Math.floor(target.getUndynamaxedHP() * 3 / 4), 1);
            }
            return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
        gen: 9,
    },
	paraboliccharge: {
        inherit: true,
		drain: [3, 4],
	},
    psychocut: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    reflecttype: {
        inherit: true,
        onHit(target, source) {
            if (source.species && (source.species.num === 493 || source.species.num === 773)) {
                return false;
            }

            if (source.terastallized) return false;

            const oldApparentType = source.apparentType;

            let targetTypes = target.getTypes(true).filter(type => type !== '???');

            if (!targetTypes.length) {
                if (target.addedType) {
                    targetTypes = ['Normal'];
                } else {
                    return false;
                }
            }

            /*
            * Preserve the original move's handling of a separately added type,
            * such as Forest's Curse or Trick-or-Treat.
            */
            if (target.addedType && target.addedType !== '???' && !targetTypes.includes(target.addedType)) {
                targetTypes.push(target.addedType);
            }

            this.add('-start', source, 'typechange', '[from] move: Reflect Type', `[of] ${target}`);

            if (source.hasAbility('reflector')) {
            /*
            * Reflector users preserve their original typing.
            *
            * Do not use source.getTypes() here because it contains the old
            * mirrored types. Use the stored pre-Reflector typing instead.
            */
            const baseTypes = source.m.reflectorBaseTypes as string[] | undefined;

            /*
            * This fallback matters if Reflector was obtained after switching
            * in, such as through Skill Swap.
            */
            const preservedTypes = baseTypes ? [...baseTypes]: [...source.getTypes()].filter(type => {
                const oldReflectedTypes = source.m.reflectorTypes as string[] | undefined;
                return !oldReflectedTypes?.includes(type);
            });

            /*
            * Replace the previous reflected types completely.
            *
            * Only target types absent from the user's preserved typing count
            * as newly reflected types.
            */
            const newReflectedTypes: string[] = [];

            for (const type of targetTypes) {
                if (!preservedTypes.includes(type) && !newReflectedTypes.includes(type)) {
                    newReflectedTypes.push(type);
                }
            }

            source.m.reflectorBaseTypes = preservedTypes;
            source.m.reflectorTypes = newReflectedTypes;

            source.setType([...preservedTypes,...newReflectedTypes,]);

            /*
            * All copied types are already represented directly in the types
            * array, so do not also retain one as addedType.
            */
            source.addedType = '';
            } else {
            /*
            * Pokémon without Reflector retain normal Reflect Type behavior:
            * their typing is replaced with the target's typing.
            */
            const copiedBaseTypes = target
                .getTypes(true)
                .filter(type => type !== '???');

            source.setType(copiedBaseTypes);
            source.addedType = target.addedType;
            }

            source.knownType =
            target.isAlly(source) && target.knownType;

            if (!source.knownType) {
            source.apparentType = oldApparentType;
            }
        },
    },
	secretpower: {
        inherit: true,
		onModifyMove(move, pokemon) {
			if (this.field.isTerrain('') || this.field.isField('')) return;
			move.secondaries = [];
            if (this.field.isField('forestfield')) {
                move.secondaries.push({
                    chance: 100,
                    status: 'slp',
                });
            }
			if (this.field.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.field.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.field.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.field.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			}
		},
        gen: 9,
	},
    selfdestruct: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
    },
    shelter: {
        inherit: true,
        onHit(pokemon) {
            if (this.field.isField('forestfield')) {
                pokemon.addVolatile('shelterforest');
            }
        },
    },
    silktrap: {
        inherit: true,
        condition: {
            inherit: true,
            onTryHitPriority: 3,
            onTryHit(target, source, move) {
                if (!move.flags['protect'] || (move.category === 'Status' && !this.field.isField('forestfield'))) {
                    if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
                    return;
                }
                if (move.smartTarget) {
                    move.smartTarget = false;
                } else {
                    this.add('-activate', target, 'move: Protect');
                }
                const lockedmove = source.getVolatile('lockedmove');
                if (lockedmove) {
                    if (source.volatiles['lockedmove'].duration === 2) {
                        delete source.volatiles['lockedmove'];
                    }
                }
                if (this.checkMoveMakesContact(move, source, target)) {
                    this.boost({ spe: -1 }, source, target, this.dex.getActiveMove('Silk Trap'));
                }
                return this.NOT_FAIL;
            },
        },
    },
    slash: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    smackdown: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
    },
    stickyweb: {
        inherit: true,
        condition: {
            onSideStart(side) {
                this.add('-sidestart', side, 'move: Sticky Web');
            },
            onSwitchIn(pokemon) {
                if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
                this.add('-activate', pokemon, 'move: Sticky Web');
                const speedDrop = this.field.isField('forestfield') ? -2 : -1;
                this.boost({ spe: speedDrop }, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove('stickyweb'));
            },
        },
    },
    strengthsap: {
        inherit: true,
        onHit(target, source) {
            if (target.boosts.atk === -6) return false;
            const atk = target.getStat('atk', false, true);
            const healAmount = this.field.isField('forestfield') ? this.modify(atk, 1.3) : atk;
            const success = this.boost({ atk: -1 }, target, source, null, false, true);
            return !!(this.heal(healAmount, source, target) || success);
        },
    },
    surf: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
        onBasePower(basePower, pokemon, target) {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The forest softened the attack...');
                return this.chainModify(0.5);
            }
        },
    },
	terrainpulse: {
        inherit: true,
		onModifyType(move, pokemon) {
            if (this.field.isField('forestfield')) {
                move.type = 'Grass';
            }
            else {
                if (!pokemon.isGrounded()) return;
                switch (this.field.terrain) {
                case 'electricterrain':
                    move.type = 'Electric';
                    break;
                case 'grassyterrain':
                    move.type = 'Grass';
                    break;
                case 'mistyterrain':
                    move.type = 'Fairy';
                    break;
                case 'psychicterrain':
                    move.type = 'Psychic';
                    break;
                }
            }
		},
		onModifyMove(move, pokemon) {
			if ((this.field.terrain && pokemon.isGrounded()) || this.field.isField('forestfield')) {
				move.basePower *= 2;
				this.debug('BP doubled in Terrain or Field');
			}
		},
	},
    thousandarrows: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
    },
    thundercage: {
        inherit: true,
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "normal",
		type: "Electric",
	},
};
