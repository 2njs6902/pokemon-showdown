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
    cut: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
		onBasePower(basePower, pokemon, target) {
			if (this.field.isField('forestfield')) {
				return this.chainModify(2.0);
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
    healorder: {
        inherit: true,

        onModifyMove(move, pokemon, target) {
            if (this.field.isField('forestfield')) {
                move.heal = [2, 3];
            }
        },
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
    muddywater: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
    }, 
	paraboliccharge: {
        inherit: true,
		drain: [3, 4],
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
    selfdestruct: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
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
    surf: {
        inherit: true,
        onEffectiveness(typeMod, target, type, move) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
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
