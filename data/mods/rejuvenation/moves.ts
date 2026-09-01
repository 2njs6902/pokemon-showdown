export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	acidarmor: {
		inherit: true,
		onModifyMove(move) {
			move.boosts = { def: this.field.isField('corrosivemistfield') ? 3 : 2 };
		},
	},
    // ================ Info ===================
    // Up to date as of V14.0.20
    // ================ New Fields ===================


    // ================ Rejuvenation Moves ===================
	irritation: {
		num: 6902,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Irritation",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Bug",
		zMove: { basePower: 160 },
		contestType: "Clever",
	},	
	slashandburn: {
		num: 6903,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Slash and Burn",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Cute",
	},
	wakeupshock: {
		num: 6904,
		accuracy: 100,
		basePower: 80,
		basePowerCallback(pokemon, target, move) {
		if (target.status === 'slp' || target.hasAbility('comatose')) {
			this.debug('BP doubled on sleeping target');
			return move.basePower * 2;
		}
		return move.basePower;
		},
		category: "Physical",
		name: "Wake-Up Shock",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onHit(target) {
			if (target.status === 'slp') target.cureStatus();
		},
		target: "normal",
		type: "Electric",
		contestType: "Tough",

	},
	vileassault: {
		num: 6905,
		accuracy: 100,
		basePower: 90,
		basePowerCallback(pokemon, target, move) {
			// You can't get here unless the pursuit succeeds
			if (target.beingCalledBack || target.switchFlag) {
				this.debug('Pursuit damage boost');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Vile Assault",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		beforeTurnCallback(pokemon) {
			for (const target of pokemon.foes()) {
				target.addVolatile('pursuit');
				const data = target.volatiles['pursuit'];
				if (!data.sources) {
					data.sources = [];
				}
				data.sources.push(pokemon);
			}
		},
		onModifyMove(move, source, target) {
			if (target?.beingCalledBack || target?.switchFlag) move.accuracy = true;
		},
		condition: {
			duration: 1,
			onBeforeSwitchOut(pokemon) {
				this.debug('Pursuit start');
				let alreadyAdded = false;
				pokemon.removeVolatile('destinybond');
				for (const source of this.effectState.sources) {
					if (!source.isAdjacent(pokemon) || !this.queue.cancelMove(source) || !source.hp) continue;
					if (!alreadyAdded) {
						this.add('-activate', pokemon, 'move: Pursuit');
						alreadyAdded = true;
					}
					// Run through each action in queue to check if the Pursuit user is supposed to Mega Evolve this turn.
					// If it is, then Mega Evolve before moving.
					if (source.canMegaEvo || source.canUltraBurst || source.canTerastallize) {
						for (const [actionIndex, action] of this.queue.entries()) {
							if (action.pokemon === source) {
								if (action.choice === 'megaEvo') {
									this.actions.runMegaEvo(source);
								} else if (action.choice === 'terastallize') {
									// Also a "forme" change that happens before moves, though only possible in NatDex
									this.actions.terastallize(source);
								} else {
									continue;
								}
								this.queue.list.splice(actionIndex, 1);
								break;
							}
						}
					}
					this.actions.runMove('pursuit', source, source.getLocOf(pokemon));
				}
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",

	},
	stackingshot: {
		num: 6906,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			pokemon.addVolatile('furycutter');
			const bp = this.clampIntRange(move.basePower * pokemon.volatiles['furycutter'].multiplier, 1, 160);
			this.debug(`BP: ${bp}`);
			return bp;
		},
		category: "Physical",
		name: "Stacking Shot",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Fighting",
		contestType: "Cool",
	},
	etherealtempest: {
		num: 6907,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Ethereal Tempest",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "Flying",
		contestType: "Tough",
	},
	deluge: {
		num: 6908,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(pokemon, target, move) {
			const damagedByTarget = pokemon.attackedBy.some(
				p => p.source === target && p.damage > 0 && p.thisTurn
			);
			if (damagedByTarget) {
				this.debug(`BP doubled for getting hit by ${target}`);
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		name: "Deluge",
		pp: 10,
		priority: -4,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		target: "normal",
		type: "Water",
		contestType: "Tough",
	},
	arenitewall: {
		num: 6909,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Arenite Wall",
		pp: 20,
		priority: 0,
		flags: { snatch: 1, metronome: 1 },
		sideCondition: 'arenitewall',
		onTry() {
			return this.field.isWeather(['sandstorm']);
		},
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && this.effectState.target.hasAlly(target)) {
					if (target.getMoveHitData(move).typeMod > 0) {
						this.debug('Arenite Wall weaken');
						if (this.activePerHalf > 1) return this.chainModify([2732, 4096]);
						return this.chainModify(0.5);
					}
				}
			},
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Arenite Wall');
			},
			onSideResidualOrder: 26,
			onSideResidualSubOrder: 11,
			onSideEnd(side) {
				this.add('-sideend', side, 'move: Arenite Wall');
			},
		},
		target: "allySide",
		type: "Ground",
		zMove: { boost: { def: 1 } },
		contestType: "Beautiful",
	},
    // Not Available in Rejuvenation (Yet?)

	// quicksilverspear: {
	// 	num: 6910,
	// 	accuracy: 75,
	// 	basePower: 80,
	// 	category: "Physical",
	// 	name: "Quicksilver Spear",
	// 	pp: 5,
	// 	priority: 0,
	// 	flags: { protect: 1, mirror: 1, metronome: 1 },
	// 	onHit(target, source, move) {
	// 		return target.addVolatile('trapped', source, move, 'trapper');
	// 	},
	// 	secondary: {
	// 		chance: 100,
	// 		boosts: {
	// 			spe: -1,
	// 		},
	// 	},
	// 	target: "normal",
	// 	type: "Steel",
	// 	contestType: "Beautiful",
	// },
	poisonsweep: {
		num: 6911,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Poison Sweep",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 30,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "Poison",
		contestType: "Clever",
	},
	mudbarrage: {
		num: 6912,
		accuracy: 95,
		basePower: 25,
		category: "Special",
		name: "Mud Barrage",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1},
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
		multihit: [2, 5],
		target: "normal",
		type: "Ground",
		zMove: { basePower: 140 },
		contestType: "Tough",
	},
	mirrorbeam: {
		num: 6913,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Mirror Beam",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		onModifyType(move, pokemon) {
			const types = pokemon.getTypes();
			let type = types[1];
			if (type === 'Bird') type = '???';
			if (type === '???' && types[0]) type = types[0];
			move.type = type;
		},
		target: "normal",
		type: "Steel",
		contestType: "Beautiful",
	},
	magmadrift: {
		num: 6914,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Magma Drift",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1 },
		target: "allAdjacent",
		type: "Fire",
		contestType: "Beautiful",
	},
	hexingslash: {
		num: 6915,
		accuracy: 100,
		basePower: 90,
		category: "Physical",
		name: "Hexing Slash",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1, slicing: 1 },
		drain: [1, 2],
		secondary: {
			chance: 30,
			status: 'psn',
		},
		target: "normal",
		type: "Ghost",
	},
	hoarfrostmoon: {
		num: 6916,
		accuracy: 90,
		basePower: 90,
		category: "Special",
		name: "Hoarfrost Moon",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
		contestType: "Beautiful",
	},
	solarflare: {
		num: 6917,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		name: "Solar Flare",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	injection: {
		num: 6918,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Injection",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
		drain: [1, 2],
		target: "normal",
		type: "Steel",
		contestType: "Clever",
	},
	cauterize: {
		num: 6919,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Cauterize",
		pp: 15,
		priority: 0,
		flags: { protect: 1, mirror: 1, allyanim: 1, metronome: 1, bullet: 1 },
		onTryHit(target, source, move) {
			if (source.isAlly(target)) {
				move.basePower = 0;
				move.infiltrates = true;
			}
		},
		onTryMove(source, target, move) {
			if (source.isAlly(target) && source.volatiles['healblock']) {
				this.attrLastMove('[still]');
				this.add('cant', source, 'move: Heal Block', move);
				return false;
			}
		},
		onHit(target, source, move) {
			if (source.isAlly(target)) {
				if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
					return this.NOT_FAIL;
				}
			}
		},
		target: "normal",
		type: "Fire",
		contestType: "Cute",
	},
	radiantclaw: {
		num: 6920,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Radiant Claw",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1, distance: 1, metronome: 1 },
		recoil: [33, 100],
		target: "any",
		type: "Fairy",
		contestType: "Cool",
	},

    // ================ Changed Moves ===================
    aircutter: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
		onBasePower() {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
				return this.chainModify(1.5);
			}
		},
    },
    airslash: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    aquaring: {
        inherit: true,
        condition: {
			onStart(pokemon) {
				this.add('-start', pokemon, 'Aqua Ring');
			},
			onResidualOrder: 6,
			onResidual(pokemon) {
				if (this.field.isField('corrosivemistfield')) {
					if (pokemon.hasType(['Poison', 'Steel'])) {
						this.heal(pokemon.baseMaxhp / 16);
					} else {
						this.add('-message', `${pokemon.name}'s Aqua Ring absorbed the poison!`);
						this.damage(pokemon.baseMaxhp / 16, pokemon);
					}
					return;
				}
                const boosted = this.field.isField('swampfield') || this.field.isUnlayeredTerrain('mistyterrain');
				this.heal(pokemon.baseMaxhp / (boosted ? 8 : 16));
			},
		},
    },
    aromatherapy: {
        inherit: true,
        isNonstandard: null,
    },
    aromaticmist: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                move.boosts = { spd: 2 };
            }
        },
    },
    attackorder: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'They\'re coming out of the woodwork!');
                return this.chainModify(1.5);
            }
        },
        onHit(target, source) {
            if (this.field.isField('swampfield')) {
                const stat = this.sample(['atk', 'def', 'spa', 'spd', 'spe'] as const);
                this.boost({ [stat]: -1 }, target, source);
            }
        },
    },
    aurasphere: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    autotomize: {
        inherit: true,
        isNonstandard: null,
    },
    barbbarrage: {
        inherit: true,
		zMove: {basePower: 160},
		onBasePower(basePower, pokemon, target) {
			if (this.field.isField('corrosivemistfield') || target.status === 'psn' || target.status === 'tox') {
				return this.chainModify(2);
			}
		},
    },
    barrier: {
        inherit: true,
        isNonstandard: null,
    },
    bestow: {
        inherit: true,
        isNonstandard: null,
    },
    branchpoke: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'Straight from the tree!');
                return this.chainModify(1.5);
            }
        },
    },
    breakingswipe: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    brickbreak: {
        inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('arenitewall');
		},
    },
    brine: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        }
    },
    bulldoze: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The attack dissipated in the soggy ground...');
                return this.chainModify(0.25);
            }
        },
    },
    burningbulwark: {
        inherit: true,
		zMove: { boost: { def: 1 } },
    },
    camouflage: {
        inherit: true,
        isNonstandard: null,
        onHit(target) {
            let newType = 'Normal';

            switch (this.field.field) {
			case 'corrosivemistfield':
				newType = 'Poison';
				break;
            case 'forestfield':
                newType = 'Bug';
                break;
            case 'swampfield':
                newType = 'Water';
                break;

            default:
                if (this.field.isUnlayeredTerrain('electricterrain')) {
                    newType = 'Electric';
                } else if (this.field.isUnlayeredTerrain('grassyterrain')) {
                    newType = 'Grass';
                } else if (this.field.isUnlayeredTerrain('mistyterrain')) {
                    newType = 'Fairy';
                } else if (this.field.isUnlayeredTerrain('psychicterrain')) {
                    newType = 'Psychic';
                }
                break;
            }

            if (target.getTypes().join() === newType || !target.setType(newType)) return false;
            this.add('-start', target, 'typechange', newType);
        },
    },
    captivate: {
        inherit: true,
        isNonstandard: null,
    },
    charge: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                move.boosts = { spd: 2 };
            }
        },
    },
    chillyreception: {
        inherit: true,
		zMove: { effect: 'healreplacement' },
    },
    clangoroussoul: {
        inherit: true,
		zMove: { effect: 'clearnegativeboost' },
    },
    clearsmog: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    coaching: {
        inherit: true,
		zMove: { boost: { atk: 1 } },
    },
    corrosivegas: {
        inherit: true,
        isNonstandard: null,
		zMove: { boost: { spd: 1 } },
		onHit(target, source) {
			const item = target.takeItem(source);
			if (item) {
				this.add('-enditem', target, item.name, '[from] move: Corrosive Gas', `[of] ${source}`);
				if (this.field.isField('corrosivemistfield')) {
					this.boost({ atk: -1, def: -1, spa: -1, spd: -1, spe: -1 }, target, source);
				}
			} else {
				this.add('-fail', target, 'move: Corrosive Gas');
			}
		},
    },
    cosmicpower: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                move.self = { boosts: { def: 2, spd: 2 } };
            }
        },
    },
    courtchange: {
        inherit: true,
		onHitField(target, source) {
			const sideConditions = [
				'mist', 'lightscreen', 'reflect', 'spikes', 'safeguard', 'tailwind', 'toxicspikes', 'stealthrock', 'waterpledge', 'firepledge', 'grasspledge', 'stickyweb', 'auroraveil', 'arenitewall', 'luckychant', 'gmaxsteelsurge', 'gmaxcannonade', 'gmaxvinelash', 'gmaxwildfire', 'gmaxvolcalith',
			];
			let success = false;
			if (this.gameType === 'freeforall') {
				// the list of all sides in clockwise order
				const sides = [this.sides[0], this.sides[3]!, this.sides[1], this.sides[2]!];
				const temp: { [k: number]: typeof source.side.sideConditions } = { 0: {}, 1: {}, 2: {}, 3: {} };
				for (const side of sides) {
					for (const id in side.sideConditions) {
						if (!sideConditions.includes(id)) continue;
						temp[side.n][id] = side.sideConditions[id];
						delete side.sideConditions[id];
						success = true;
					}
				}
				for (let i = 0; i < 4; i++) {
					const sourceSideConditions = temp[sides[i].n];
					const targetSide = sides[(i + 1) % 4]; // the next side in rotation
					for (const id in sourceSideConditions) {
						targetSide.sideConditions[id] = sourceSideConditions[id];
						targetSide.sideConditions[id].target = targetSide;
					}
				}
			} else {
				const sourceSideConditions = source.side.sideConditions;
				const targetSideConditions = source.side.foe.sideConditions;
				const sourceTemp: typeof sourceSideConditions = {};
				const targetTemp: typeof targetSideConditions = {};
				for (const id in sourceSideConditions) {
					if (!sideConditions.includes(id)) continue;
					sourceTemp[id] = sourceSideConditions[id];
					delete sourceSideConditions[id];
					success = true;
				}
				for (const id in targetSideConditions) {
					if (!sideConditions.includes(id)) continue;
					targetTemp[id] = targetSideConditions[id];
					delete targetSideConditions[id];
					success = true;
				}
				for (const id in sourceTemp) {
					targetSideConditions[id] = sourceTemp[id];
					targetSideConditions[id].target = source.side.foe;
				}
				for (const id in targetTemp) {
					sourceSideConditions[id] = targetTemp[id];
					sourceSideConditions[id].target = source.side;
				}
			}
			if (!success) return false;
			this.add('-swapsideconditions');
			this.add('-activate', source, 'move: Court Change');
		},
		zMove: { effect: 'clearnegativeboost' },
    },
    craftyshield: {
        inherit: true,
        isNonstandard: null,
    },
    cut: {
        inherit: true,
        isNonstandard: null,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
		onBasePower() {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
				return this.chainModify(2.0);
			}
		},

	},
    darkpulse: {
        inherit: true,
        onBasePower() {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                this.add('-message', 'The mist softened the attack...');
                return this.chainModify(0.5);
            }
        },
    },
    decorate: {
        inherit: true,
		zMove: { effect: 'heal' },
    },
	defendorder: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isField('forestfield')) {
                move.self = { boosts: { def: 2, spd: 2 } };
            }
        },
    },
    defog: {
        inherit: true,
		onHit(target, source, move) {
			let success = false;
			if (!target.volatiles['substitute'] || move.infiltrates) success = !!this.boost({ evasion: -1 });
			const removeAll = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			const removeTarget = ['reflect', 'lightscreen', 'auroraveil', 'arenitewall', 'safeguard', 'mist', ...removeAll];
			for (const targetCondition of removeTarget) {
				if (target.side.removeSideCondition(targetCondition)) {
					if (!removeAll.includes(targetCondition)) continue;
					this.add('-sideend', target.side, this.dex.conditions.get(targetCondition).name, '[from] move: Defog', `[of] ${source}`);
					success = true;
				}
			}
			for (const sideCondition of removeAll) {
				if (source.side.removeSideCondition(sideCondition)) {
					this.add('-sideend', source.side, this.dex.conditions.get(sideCondition).name, '[from] move: Defog', `[of] ${source}`);
					success = true;
				}
			}
			this.field.clearTerrain();
			return success;
		},
    },
    dive: {
        inherit: true,
        onTryMove(attacker, defender, move) {
            if (attacker.removeVolatile(move.id)) {
                return;
            }
            if (attacker.hasAbility('gulpmissile') && attacker.species.name === 'Cramorant' && !attacker.transformed) {
                let forme;
                if (!this.field.isField('')) {
                    forme = this.field.isField('swampfield') ? 'cramorantgulping' : attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
                } else if (this.field.isTerrain('electricterrain')) {
                    forme = 'cramorantgorging';
                } else {
                    forme = attacker.hp <= attacker.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
                }
                attacker.formeChange(forme, move);
            }
            this.add('-prepare', attacker, move.name);
            if (!this.runEvent('ChargeMove', attacker, defender, move)) {
                return;
            }
            attacker.addVolatile('twoturnmove', defender);
            return null;
        },
    },
    doodle: {
        inherit: true,
		zMove: { effect: 'clearnegativeboost' },
    },
    doomdesire: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    doubleironbash: {
        inherit: true,
        zMove: {basePower: 190},
    },
    dragoncheer: {
        inherit: true,
        isNonstandard: null,
		zMove: { boost: { accuracy: 1 } },
    },
    dragondarts: {
        inherit: true,
        zMove: {basePower: 180},
    },
    dragonenergy: {
        inherit: true,
        zMove: {basePower: 200},
    },
    dualwingbeat: {
        inherit: true,
        zMove: {basePower: 160},
    },
    earthquake: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The attack dissipated in the soggy ground...');
                return this.chainModify(0.25);
            }
        },
    },
    eerieimpulse: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                move.boosts = { spa: -3 };
            }
        },
    },
    electricterrain: {
        inherit: true,
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, source2, effect) {
				if (['iondeluge', 'plasmafists'].includes(effect?.id || '')) {
					return source?.hasItem('amplifiedrock') ? 6 : 3;
				}
				if (effect?.id === 'stokedsparksurfer') return 3;
				if (source?.hasItem('amplifiedrock')) {
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
                    this.add('-message', 'The Electric Terrain strengthened the attack!');
					return this.chainModify(this.field.isUnlayeredTerrain('electricterrain') ? 1.5 : 1.3);
				}
			},
			onFieldStart(field, source, effect) {
			    if (this.field.isField('frozendimensionalfield')) return;
				const duration = `[duration] ${this.field.terrainState.duration || 0}`;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Electric Terrain', '[from] ability: ' + effect.name, `[of] ${source}`, duration);
				} else {
					this.add('-fieldstart', 'move: Electric Terrain', duration);
				}
				this.add('-message', 'The field is hyper-charged!');
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'move: Electric Terrain');
			},
		},
	},
    embargo: {
        inherit: true,
        isNonstandard: null,
    },
    electrify: {
        inherit: true,
        isNonstandard: null,
        onHit(target) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                if(target.getTypes().join() === 'Electric' || !target.setType('Electric')) {
                    // Electrify should animate even when it fails.
                    // Returning false would suppress the animation.
                    this.add('-fail', target);
                    return null;
                }
                this.add('-start', target, 'typechange', 'Electric');
            }
        },
    },
    electroweb: {
        inherit: true,
		onBasePower() {
			if (this.field.isField('forestfield')) {
                this.add('-message', 'Gossamer and arbor strengthened the attack!');
				return this.chainModify(1.5);
			}
		},
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                move.secondaries = [{
                    chance: 100,
                    boosts: {
                        spe: -2,
                    },
                }];
            }
        },
    },
    electroshot: {
        inherit: true,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			this.boost({ spa: 1 }, attacker, attacker, move);
            if (['raindance', 'primordialsea'].includes(attacker.effectiveWeather()) || this.field.isUnlayeredTerrain('electricterrain')) {
                this.attrLastMove('[still]');
                this.addMove('-anim', attacker, move.name, defender);
                return;
            }
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
    },
    eruption: {
        inherit: true,
        zMove: {basePower: 200},
    },
	explosion: {
		inherit: true,
		onTryMove(pokemon, target, move) {
			if (this.field.isField('swampfield') || this.field.isUnlayeredTerrain('mistyterrain')) {
				this.attrLastMove('[still]');
                if (this.field.isUnlayeredTerrain('mistyterrain')) this.add('-message', 'The damp mist prevents the explosion...');
				else if (this.field.isField('swampfield')) this.add('-message', 'The dampness prevents the explosion!');
				return false;
			}
		},
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
			}
		},
		onBasePower() {
			if (this.field.isTerrain('electricterrain')) {
				this.add('-message', 'The explosion became hyper-charged!');
				return this.chainModify(1.5);
			}
		},
		onEffectiveness(typeMod, target, type) {
			if (this.field.isTerrain('electricterrain')) {
				return typeMod + this.dex.getEffectiveness('Electric', type);
			}
		},
	},
    filletaway: {
        inherit: true,
        zMove: {effect: 'heal'},
    },
    flash: {
        inherit: true,
        isNonstandard: null,
    },
    flowershield: {
        inherit: true,
        isNonstandard: null,
    },
    focuspunch: {
        inherit: true,
		priorityChargeCallback(pokemon) {
			if (this.field.isUnlayeredTerrain('electricterrain')) return;
			pokemon.addVolatile('focuspunch');
		},
        onTryMove(source) {
            if (this.field.isUnlayeredTerrain('electricterrain')){
                this.add('-message', `${source.name} lost its focus and couldn't move!`);
                return false;
            }
        },
    },
    foresight: {
        inherit: true,
        isNonstandard: null,
    },
    forestscurse: {
        inherit: true,
        onHit(target, source) {
            if (target.hasType('Grass')) return false;
			if (!target.addType('Grass')) return false;
			this.add('-start', target, 'typeadd', 'Grass', '[from] move: Forest\'s Curse');

            if (this.field.isField('forestfield')) {
                this.add('-message', `${source.name} put a curse on ${target.name}!`);
                target.addVolatile('curse', source);
		    }
        },
    },
    frustration: {
        inherit: true,
        isNonstandard: null,
    },
    furycutter: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    gearup: {
        inherit: true,
        isNonstandard: null,
    },
    geomancy: {
        inherit: true,
        isNonstandard: null,
    },
	grasspledge: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (this.field.isField('frozendimensionalfield')) return;

			if (this.field.fieldState.lastPledge === 'waterpledge') {
				const duration = source.hasItem('amplifiedrock') ? 7 : 4;

				if (this.field.isField('swampfield')) {
					this.field.setTemporaryField('swampfield', duration, source, move);
					// this.add('-message', `The pledges combined and reinforced the swamp!`);
				} else {
					this.field.setTemporaryField('swampfield', duration, source, move);
					this.add('-message', `The pledges combined and formed a swamp!`);
				}

				this.field.fieldState.lastPledge = '';
			} else {
				this.field.fieldState.lastPledge = 'grasspledge';
			}
		},
	},
    grasswhistle: {
        inherit: true,
        isNonstandard: null,
    },
    gravapple: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The apple did not fall far from the tree!');
                return this.chainModify(1.5);
            }
        },
    },
    growth: {
        inherit: true,
        onModifyMove(move, pokemon) {
            if (this.field.isField('forestfield') || ['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
                move.boosts = { spa: 2, atk: 2 };
            }
        },
    },
    gunkshot: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    hardpress: {
        inherit: true,
        zMove: {basePower: 180},
    },
    healblock: {
        inherit: true,
        isNonstandard: null,
    },
    healorder: {
        inherit: true,
        isNonstandard: null,
        onModifyMove(move) {
            if (this.field.isField('forestfield')) {
                move.heal = [2, 3];
            }
        },
    },
    hiddenpower: {
        inherit: true,
        isNonstandard: null,
    },
    hurricane: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('electricterrain')){
                this.add('-message', 'The attack became hyper-charged!');
                return this.chainModify(1.5);
            }
        },
        onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.accuracy = true;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.accuracy = 50;
				break;
			}
			move.additionalTypes ??= [];

			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
            }
        },
        onEffectiveness(typeMod, target, type) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
		},
    },
    hydrosteam: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    hydrovortex: {
        inherit: true,
        onEffectiveness(typeMod, target, type) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isUnlayeredTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
			}
		},
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    icywind: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    infernalparade: {
        inherit: true,
        zMove: {basePower: 160},
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
	iondeluge: {
        inherit: true,
        isNonstandard: null,
		onHitField(target, source, move) {
            if (source.hasItem('everstone')) return;
			const duration = source.hasItem('amplifiedrock') ? 6 : 3;
			if (this.field.isTerrain('electricterrain')) {
				this.field.terrainState.duration = duration;
			} else if (this.field.setTerrain('electricterrain', source, move)) {
				this.field.terrainState.duration = duration;
			}
		},
	},
    junglehealing: {
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
		zMove: { effect: 'clearnegativeboost' },
    },
    kinesis: {
        inherit: true,
        isNonstandard: null,
    },
    kingsshield: {
        inherit: true,
        isNonstandard: null,
    },
	floralhealing: {
		inherit: true,
		onHit(target, source) {
			const success = !!this.heal(
				target.baseMaxhp * (this.field.isTerrain('grassyterrain') ? 2 / 3 : 1 / 2),
				target, source
			);
			if (success && this.field.isField('corrosivemistfield')) {
				target.trySetStatus('psn', source);
			}
			return success;
		},
	},
    leechseed: {
        inherit: true,
        condition: {
            inherit: true,
            onResidualOrder: 8,
            onResidual(pokemon) {
                const target = this.getAtSlot(pokemon.volatiles['leechseed'].sourceSlot);
                if (!target || target.fainted || target.hp <= 0) return;

                const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);

                if (damage) {
                    const healed = this.heal(damage, target, pokemon);

                    if (healed && this.field.isField('swampfield')) {
                        const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
                        const stat = this.sample(stats);
                        const boost: SparseBoostsTable = {};
                        boost[stat] = -1;

                        this.boost(boost, pokemon, target);
                    }
                }
            },
        },
    },
    lifedew: {
        inherit: true,
		zMove: { effect: 'heal' },
		heal: undefined,
		onHit(target, source) {
			const success = !!this.heal(target.baseMaxhp / 4, target, source);
			if (success && this.field.isField('corrosivemistfield')) {
				target.trySetStatus('psn', source);
			}
			return success;
		},
    },
    lovelykiss: {
        inherit: true,
        isNonstandard: null,
    },
    luckychant: {
        inherit: true,
        isNonstandard: null,
    },
    lunarblessing: {
        inherit: true,
		zMove: { effect: 'heal' },
    },
    magiccoat: {
        inherit: true,
        isNonstandard: null,
    },
    magicalleaf: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    magicpower: {
        inherit: true,
        zMove: { boost: { spa: 1 } },
    },
    magneticflux: {
        inherit: true,
        onHitSide(side, source, move) {
            let electricTerrain = this.field.isTerrain('electricterrain') && this.field.isField('');
            let targets;
            if (electricTerrain) {
                targets = side.allies().filter(ally =>  this.runEvent('TryHit', ally, source, move));
            } else {
                targets = side.allies().filter(ally => (
                    ally.hasAbility(['plus', 'minus']) &&
                    (!ally.volatiles['maxguard'] || this.runEvent('TryHit', ally, source, move))
                ));
            }
			if (!targets.length) return false;

			let didSomething = false;
			for (const target of targets) {
                if (electricTerrain && target.hasAbility(['plus', 'minus'])) {
                    didSomething = this.boost({ def: 2, spd: 2 }, target, source, move, false, true) || didSomething;
                } else {
				    didSomething = this.boost({ def: 1, spd: 1 }, target, source, move, false, true) || didSomething;
                }
            }
			return didSomething;
        }
    },
    magnetbomb: {
        inherit: true,
        isNonstandard: null,
        onBasePower() {
            if (this.field.isTerrain('electricterrain') && this.field.isField('')) {
                this.add('-message', 'The attack powered-up!');
                return this.chainModify(1.5);
            }
        },
    },
    magnetrise: {
        inherit: true,
		condition: {
			duration: 5,
            durationCallback() {
                if (this.field.isTerrain('electricterrain')) {
                    return 8;
                }
                return 5;
            },
			onStart(target) {
				this.add('-start', target, 'Magnet Rise');
			},
			onImmunity(type) {
				if (type === 'Ground') return false;
			},
			onResidualOrder: 18,
			onEnd(target) {
				this.add('-end', target, 'Magnet Rise');
			},
		},
    },
    magnitude: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The attack dissipated in the soggy ground...');
                return this.chainModify(0.25);
            }
        },
    },
    matblock: {
        inherit: true,
        isNonstandard: null,
    },
    mefirst: {
        inherit: true,
        isNonstandard: null,
    },
    mindblown: {
        inherit: true,
		onTryMove(pokemon, target, move) {
			if (this.field.isField('swampfield')) {
				this.attrLastMove('[still]');
				this.add('-message', 'The dampness prevents the explosion!');
				return false;
			}
		},
    },
    miracleeye: {
        inherit: true,
        isNonstandard: null,
    },
    mist: {
        inherit: true,
        onAfterMoveSecondarySelf(source, target, move) {
            if (source.hasItem('everstone')) return;
            if (this.field.setTerrain('mistyterrain', source, move)) {
                this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 6 : 3;
            }
        },
    },
    mistball: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
	mistyterrain: {
        inherit: true,
		condition: {
			effectType: 'Terrain',
			duration: 5,
			durationCallback(source, source2, effect) {
				if (effect?.id === 'mist') {
					return source?.hasItem('amplifiedrock') ? 6 : 3;
				}
				if (source?.hasItem('amplifiedrock')) {
					return 8;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (effect && ((effect as Move).status || effect.id === 'yawn')) {
					this.add('-activate', target, 'move: Misty Terrain');
                    this.add('-message', `${target.name} is protected by the Misty Terrain!`);
				}
				return false;
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!target.isGrounded() || target.isSemiInvulnerable()) return;
				if (status.id === 'confusion') {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Misty Terrain');
                    this.add('-message', `${target.name} is protected by the Misty Terrain!`);
					return null;
				}
			},
			onBasePowerPriority: 6,
			onBasePower(basePower, attacker, defender, move) {
				const windMoves = [
					'bleakwindstorm', 'defog', 'gust', 'hurricane', 'razorwind',
					'supersonicskystrike', 'tailwind', 'twister', 'whirlwind',
				];
				const corrosiveMoves = ['clearsmog', 'corrosivegas', 'poisongas', 'smog'];
				const corrosion = (this.field.terrainState as any).corrosionCounter || 0;
				if (
					windMoves.includes(move.id) || move.id === 'acidownpour' ||
					(corrosiveMoves.includes(move.id) && corrosion + 1 >= 2)
				) {
					return this.chainModify(1.3);
				}
				if (move.type === 'Dragon') {
					this.debug('misty terrain weaken');
                    this.add('-message', 'The Misty Terrain weakened the attack!');
					return this.chainModify(0.5);
				}
                if (move.type === 'Fairy') {
                    this.debug('misty terrain strengthen');
                    this.add('-message', 'The Misty Terrain strengthened the attack!');
                    return this.chainModify(this.field.isUnlayeredTerrain('mistyterrain') ? 1.5 : 1.3);
                }
			},
			onModifySpDPriority: 6,
            onModifySpD(spd, pokemon) {
                if (this.field.isUnlayeredTerrain('mistyterrain') && pokemon.types.includes('Fairy')) {
                    this.debug('misty terrain spd boost');
                    return this.chainModify(1.5);
                }
            },
			onFieldStart(field, source, effect) {
				if (this.field.isField([
					'corrosivemistfield', 'frozendimensionalfield', 'underwaterfield',
				])) {
					return false;
				}
				const duration = `[duration] ${this.field.terrainState.duration || 0}`;
				if (effect?.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Misty Terrain', '[from] ability: ' + effect.name, `[of] ${source}`, duration);
				} else {
					this.add('-fieldstart', 'move: Misty Terrain', duration);
				}
				(this.field.terrainState as any).corrosionCounter = 0;
				this.add('-message', 'Mist settles on the field');
			},
			onAfterMove(source, target, move) {
				if (!this.field.isTerrain('mistyterrain')) return;
				const windMoves = [
					'bleakwindstorm', 'defog', 'gust', 'hurricane', 'razorwind',
					'supersonicskystrike', 'tailwind', 'twister', 'whirlwind',
				];
				if (windMoves.includes(move.id)) {
					this.field.clearTerrain();
					this.add('-message', 'The mist was blown away!');
					return;
				}

				const corrosiveMoves = ['clearsmog', 'corrosivegas', 'poisongas', 'smog'];
				const state = this.field.terrainState as any;
				if (move.id === 'acidownpour') {
					state.corrosionCounter = 2;
				} else if (corrosiveMoves.includes(move.id)) {
					state.corrosionCounter = (state.corrosionCounter || 0) + 1;
				} else {
					return;
				}
				if (state.corrosionCounter < 2) return;

				this.field.clearTerrain();
				this.add('-message', 'The mist was corroded!');
				this.field.setField('corrosivemistfield', source, move);
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 7,
			onFieldEnd() {
				this.add('-fieldend', 'Misty Terrain');
			},
		},
	},
    moongeistbeam: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    mudbomb: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    muddywater: {
        inherit: true,
        onEffectiveness(typeMod, target, type) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
			}
		},
        onBasePower() {
            let modifier = 1;
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The forest softened the attack...');
                modifier *= 0.5;
            } else if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                 modifier *= 1.5;
            }
            if (this.field.isTerrain('electricterrain')){
                this.add('-message', 'The attack became hyper-charged!');
                modifier *= 1.5;
            }
            return this.chainModify(modifier);
        },
    }, 
	mudshot: {
		inherit: true,
		onBasePower() {
			if (this.field.isField('swampfield')) {
				this.add('-message', 'The murk strengthened the attack!');
				return this.chainModify(1.5);
			}
		},
		onModifyMove(move) {
			if (this.field.isField('swampfield')) {
				move.secondaries = [{
					chance: 100,
					boosts: {
						spe: -2,
					},
				}];
			}
		},
	},
    mudslap: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    mudsport: {
        inherit: true,
        isNonstandard: null,
    },
    mysticalfire: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    naturepower: {
        inherit: true,
        isNonstandard: null,
        onTryHit(target, pokemon) {
            let move = 'triattack';
            switch (this.field.field) {
			case 'corrosivemistfield':
				move = 'corrosivegas';
				break;
            case 'forestfield':
                move = 'woodhammer';
                break;
            case 'swampfield':
                move = 'muddywater';
                break;
            default:
                if (this.field.isUnlayeredTerrain('electricterrain')) {
                    move = 'thunderbolt';
                } else if (this.field.isUnlayeredTerrain('grassyterrain')) {
                    move = 'energyball';
                } else if (this.field.isUnlayeredTerrain('mistyterrain')) {
                    move = 'mistball';
                } else if (this.field.isUnlayeredTerrain('psychicterrain')) {
                    move = 'psychic';
                }
                break;
            }

            this.actions.useMove(move, pokemon, { target });
            return null;
        },
    },
	naturesmadness: {
        inherit: true,
        isNonstandard: null,
		damageCallback(target) {
            if (this.field.isField('forestfield')) {
			    return this.clampIntRange(Math.floor(target.getUndynamaxedHP() * 3 / 4), 1);
            }
            return this.clampIntRange(Math.floor(target.getUndynamaxedHP() / 2), 1);
		},
    },
    nightdaze: {
        inherit: true,
        onBasePower() {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                this.add('-message', 'The mist softened the attack...');
                return this.chainModify(0.5);
            }
        },
    },
    noretreat: {
        inherit: true,
		zMove: { effect: 'clearnegativeboost' },
    },
    obstruct: {
        inherit: true,
        isNonstandard: null,
		zMove: { effect: 'clearnegativeboost' },
    },
    octolock: {
        inherit: true,
        zMove: { boost: { atk: 2 } },
    },
	paraboliccharge: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                move.drain = [3, 4];
            }
        },
	},
    plasmafists: {
        inherit: true,
        isNonstandard: null,
        onAfterMoveSecondarySelf(source, target, move) {
            if (source.hasItem('everstone')) return;
            if (this.field.setTerrain('electricterrain', source, move)) {
                this.field.terrainState.duration = source.hasItem('amplifiedrock') ? 6 : 3;
            }
        },
    },
    poisonpowder: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isField('swampfield')) {
                move.accuracy = 100;
            }
        },
    },
    populationbomb: {
        inherit: true,
        zMove: {basePower: 200},
    },
    powder: {
        inherit: true,
        isNonstandard: null,
    },
    powershift: {
        inherit: true,
        zMove: { boost: { atk: 1 } },
    },
    psychicfangs: {
        inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('arenitewall');
		},
    },
    psychocut: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    psycoshift: {
        inherit: true,
        isNonstandard: null,
    },
    purify: {
        inherit: true,
        isNonstandard: null,
    },
    ragingbull: {
        inherit: true,
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			pokemon.side.removeSideCondition('reflect');
			pokemon.side.removeSideCondition('lightscreen');
			pokemon.side.removeSideCondition('auroraveil');
			pokemon.side.removeSideCondition('arenitewall');
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
    refresh: {
        inherit: true,
        isNonstandard: null,
    },
    return: {
        inherit: true,
        isNonstandard: null,
    },
    revivalblessing: {
        inherit: true,
		zMove: { effect: 'heal' },
    },
    roar: {
        inherit: true,
        onHit() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'What are ya doin\' in my swamp?!');
            }
        },
    },
    savagespinout: {
        inherit: true,
        isNonstandard: null,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'There are bugs EVERYWHERE!');
                return this.chainModify(1.5);
            }
        },
    },
    secretpower: {
        inherit: true,
        isNonstandard: null,
        onModifyMove(move) {
            if (!this.field.field && this.field.isTerrain('')) return;

            move.secondaries = [];

            switch (this.field.field) {
			case 'corrosivemistfield':
				move.secondaries.push({ chance: 30, status: 'psn' });
				break;
            case 'forestfield':
                move.secondaries.push({
                    chance: 100,
                    status: 'slp',
                });
                break;

            case 'swampfield':
                move.secondaries.push({
                    chance: 30,
                    boosts: {
                        spe: -1,
                    },
                });
                break;

            default:
                if (this.field.isUnlayeredTerrain('electricterrain')) {
                    move.secondaries.push({
                        chance: 30,
                        status: 'par',
                    });
                } else if (this.field.isUnlayeredTerrain('grassyterrain')) {
                    move.secondaries.push({
                        chance: 30,
                        status: 'slp',
                    });
                } else if (this.field.isUnlayeredTerrain('mistyterrain')) {
                    move.secondaries.push({
                        chance: 30,
                        boosts: {
                            spa: -1,
                        },
                    });
                } else if (this.field.isUnlayeredTerrain('psychicterrain')) {
                    move.secondaries.push({
                        chance: 30,
                        boosts: {
                            spe: -1,
                        },
                    });
                }
                break;
            }
        },
    },
    selfdestruct: {
        inherit: true,
		onTryMove(pokemon, target, move) {
			if (this.field.isField('swampfield')) {
				this.attrLastMove('[still]');
				this.add('-message', 'The dampness prevents the explosion!');
				return false;
			}
		},
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
        onBasePower() {
            if (this.field.isTerrain('electricterrain')){
                this.add('-message', 'The explosion became hyper-charged!');
                return this.chainModify(1.5);
            }
        },
    },
    shadowball: {
        inherit: true,
        onBasePower() {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                this.add('-message', 'The mist softened the attack...');
                return this.chainModify(0.5);
            }
        },
    },
	smokescreen: {
		inherit: true,
		onModifyMove(move) {
			move.boosts = { accuracy: this.field.isField('corrosivemistfield') ? -2 : -1 };
		},
	},
    shedtail: {
        inherit: true,
		zMove: { effect: 'heal' },
    },
    shelter: {
        inherit: true,
        onHit(pokemon) {
            switch (this.field.field) {
			case 'corrosivemistfield':
				pokemon.addVolatile('sheltercorrosivemist');
				break;
            case 'forestfield':
                pokemon.addVolatile('shelterforest');
                break;
            case 'swampfield':
                pokemon.addVolatile('shelterswamp');
                break;
            default:
                if (this.field.isTerrain('electricterrain')) {
                    pokemon.addVolatile('shelterelectric');
                }
                // } else if (this.field.isTerrain('grassyterrain')) {
                //     move = 'energyball';
                else if (this.field.isTerrain('mistyterrain')) {
                    pokemon.addVolatile('sheltermisty');
                }
                // else if (this.field.isTerrain('psychicterrain')) {
                //     move = 'psychic';
                // }
                break;
            }

        },
        onModifyMove(move, pokemon) {
            switch (this.field.field) {
            case 'swampfield':
                move.self = { boosts: { def: 3 } };
                break;
            }
        },
		zMove: { boost: { spd: 1 } },
    },
    silktrap: {
        inherit: true,
        condition: {
            inherit: true,
            onTryHitPriority: 3,
            onTryHit(target, source, move) {
				if (this.checkMoveBypassesProtect(move, source, target, false)) return;
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
		zMove: { boost: { def: 1 } },
    },
    silverwind: {
        inherit: true,
        isNonstandard: null,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    slash: {
        inherit: true,
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isField('forestfield')) {
				move.additionalTypes.push('Grass');
			} else {
				move.additionalTypes = [];
			}
		},
        onEffectiveness(typeMod, target, type) {
            if (this.field.isField('forestfield')){
                return typeMod + this.dex.getEffectiveness('Grass', type);
            }
        },
        onBasePower() {
            if (this.field.isField('forestfield')) {
                this.add('-message', 'A tree slammed down!');
                return this.chainModify(1.5);
            }
        },
    },
    sleeppowder: {
        inherit: true,
        onModifyMove(move, pokemon) {
            if (this.field.isField('swampfield')) {
                move.accuracy = 100;
            }
        },
    },
    sludgewave: {
        inherit: true,
        onBasePower() {
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    smackdown: {
        inherit: true,
		onEffectiveness(typeMod, target, type) {
			if (this.field.isField('swampfield')) {
				typeMod += this.dex.getEffectiveness('Water', type);
			}
			if (this.field.isTerrain('electricterrain')) {
				typeMod += this.dex.getEffectiveness('Electric', type);
			}
			return typeMod;
		},
		onModifyMove(move) {
			move.additionalTypes = [];

			if (this.field.isField('swampfield')) {
				move.additionalTypes.push('Water');
			}
			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			}
		},
        onBasePower() {
            let modifier = 1;
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                modifier *= 1.5;
            }
            if (this.field.isTerrain('electricterrain')) {
                this.add('-message', 'The attack became hyper-charged!');
                modifier *= 1.5;
            }
            return this.chainModify(modifier);
        },
    },
    smog: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    snaptrap: {
        inherit: true,
        isNonstandard: null,
    },
    snatch: {
        inherit: true,
        isNonstandard: null,
    },
    snowscape: {
        inherit: true,
        isNonstandard: null,
    },
    spicyextract: {
        inherit: true,
		zMove: { boost: { atk: 1 } },
    },
    spiderweb: {
        inherit: true,
        isNonstandard: null,
    },
	spikes: {
		inherit: true,
		condition: {
			inherit: true,
			onSideStart(side, target) {
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers = 1;
			},
			onSideRestart(side, target) {
				if (this.effectState.layers >= 3) return false;
				this.add('-sidestart', side, 'Spikes');
				this.effectState.layers++;
			},
			onSwitchIn(pokemon) {
				if (!pokemon.isGrounded() || pokemon.hasItem('heavydutyboots')) return;
				const damageAmounts = [0, 3, 4, 6];
				if (this.field.isTerrain('electricterrain')) {
					this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24, pokemon, null, this.dex.conditions.get('electrifiedspikes'));
				} else {
					this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
				}
			},
		},
	},
    springtidestorm: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    steameruption: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
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
    stokedsparksurfer: {
        inherit: true,
        onAfterMoveSecondarySelf(source, target, move) {
            if (this.field.setTerrain('electricterrain', source, move)) {
                this.field.terrainState.duration = 3;
            }
        },
	},
    strangesteam: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('mistyterrain')) {
                this.add('-message', 'The mist\'s energy strengthened the attack!');
                return this.chainModify(1.5);
            }
        },
    },
    strengthsap: {
        inherit: true,
        onHit(target, source) {
            if (target.boosts.atk === -6) return false;

            const atk = target.getStat('atk', false, true);
            const healAmount = this.field.isField('forestfield') ? this.modify(atk, 1.3) : atk;

            const healed = this.heal(healAmount, source, target);
            const success = this.boost({ atk: -1 }, target, source, null, false, true);

            if (healed && this.field.isField('swampfield')) {
                const stat = this.sample(['atk', 'def', 'spa', 'spd', 'spe'] as const);
                this.boost({ [stat]: -1 }, target, source);
            }

            return !!(healed || success);
        },
    },
    stringshot: {
        inherit: true,
        onHit(target, source) {
            if (this.field.isField('swampfield')) {
                const stat = this.sample(['atk', 'def', 'spa', 'spd', 'spe'] as const);
                this.boost({ [stat]: -1 }, target, source);
            }
        },
    },
	strugglebug: {
		inherit: true,
		onModifyMove(move) {
			if (this.field.isField('swampfield')) {
				move.secondaries = [{
					chance: 100,
					boosts: {
						spa: -2,
					},
				}];
			}
		},
	},
    stuffcheeks: {
        inherit: true,
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    },
    stunspore: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isField('swampfield')) {
                move.accuracy = 100;
            }
        },
    },
    surf: {
        inherit: true,
        onEffectiveness(typeMod, target, type) {
            if (this.field.isTerrain('electricterrain')){
                return typeMod + this.dex.getEffectiveness('Electric', type);
            }
        },
		onModifyMove(move) {
			move.additionalTypes ??= [];

			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			} else {
				move.additionalTypes = [];
			}
		},
        onBasePower() {
            let modifier = 1;
            if (this.field.isField('forestfield')) {
                this.add('-message', 'The forest softened the attack...');
                modifier *= 0.5;
            }
            if (this.field.isTerrain('electricterrain')){
                this.add('-message', 'The attack became hyper-charged!');
                modifier *= 1.5;
            }
            return this.chainModify(modifier);
        },
    },
    sweetkiss: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                move.accuracy = 100;
            }
        },
    },
    sweetscent: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('mistyterrain')) {
                move.boosts = { evasion: -2, def: -1, spd: -1};
            }
        },
    },
    tarshot: {
        inherit: true,
        zMove: { boost: { spa: 2 } },
    },
    teatime: {
        inherit: true,
		zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    },
	tectonicrage: {
		inherit: true,
		isNonstandard: null,
		onBasePower() {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(1.3);
			}
		},
		onAfterHit(target, source) {
			if (source.hp && this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain();
			}
		},
		onAfterSubDamage(damage, target, source) {
			if (source.hp && this.field.isTerrain('electricterrain')) {
				this.field.clearTerrain();
			}
		},
	},
    telekinesis: {
        inherit: true,
        isNonstandard: null,
    },
	terrainpulse: {
        inherit: true,
		onModifyType(move, pokemon) {
            switch (this.field.field) {
				case 'corrosivemistfield':
					move.type = 'Poison';
					break;
                case 'forestfield':
                    move.type = 'Bug';
                    break;

                case 'swampfield':
                    move.type = 'Water';
                    break;

                default: {
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
        isNonstandard: null,
		onModifyMove(move) {
			move.additionalTypes = [];

			if (this.field.isField('swampfield')) {
				move.additionalTypes.push('Water');
			}
			if (this.field.isTerrain('electricterrain')) {
				move.additionalTypes.push('Electric');
			}
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return;

			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) typeMod = 0;
			}

			if (this.field.isField('swampfield')) {
				typeMod += this.dex.getEffectiveness('Water', type);
			}
			if (this.field.isTerrain('electricterrain')) {
				typeMod += this.dex.getEffectiveness('Electric', type);
			}

			return typeMod;
		},
        onBasePower() {
            let modifier = 1;
            if (this.field.isField('swampfield')) {
                this.add('-message', 'The murk strengthened the attack!');
                modifier *= 1.5;
            }
            if (this.field.isTerrain('electricterrain')){
                this.add('-message', 'The attack became hyper-charged!');
                modifier *= 1.5;
            }
            return this.chainModify(modifier);
        },
    },
    thundercage: {
        inherit: true,
		volatileStatus: 'partiallytrapped',
	},
	toxic: {
		inherit: true,
		onModifyMove(move, pokemon) {
			if (pokemon.hasType('Poison')) {
				move.accuracy = true;
			} else if (this.field.isField('corrosivemistfield')) {
				move.accuracy = 100;
			}
		},
	},
    trickortreat: {
        inherit: true,
        isNonstandard: null,
    },
    tidyup: {
        inherit: true,
		zMove: { effect: 'clearnegativeboost' },
    },
    tripleaxel: {
        inherit: true,
        zMove: {basePower: 190},
    },
    tripledive: {
        inherit: true,
        zMove: {basePower: 175},
    },
    twinbeam: {
        inherit: true,
        zMove: {basePower: 160},
    },
    venomdrench: {
        inherit: true,
        isNonstandard: null,
		onHit(target, source, move) {
			if (
				this.field.isField('corrosivemistfield') ||
				target.status === 'psn' || target.status === 'tox'
			) {
				return !!this.boost({ atk: -1, spa: -1, spe: -1 }, target, source, move);
			}
			return false;
		},
    },
	venoshock: {
		inherit: true,
		onBasePower(basePower, source, target) {
			if (
				this.field.isField('corrosivemistfield') ||
				target.status === 'psn' || target.status === 'tox'
			) {
				return this.chainModify(2);
			}
		},
	},
    victorydance: {
        inherit: true,
		zMove: { effect: 'clearnegativeboost' },
    },
	waterpledge: {
		inherit: true,
		onAfterMoveSecondarySelf(source, target, move) {
			if (this.field.isField('frozendimensionalfield')) return;

			if (this.field.fieldState.lastPledge === 'grasspledge') {
				const duration = source.hasItem('amplifiedrock') ? 7 : 4;

				if (this.field.isField('swampfield')) {
					this.field.setTemporaryField('swampfield', duration, source, move);
					// this.add('-message', `The pledges combined and reinforced the swamp!`);
				} else {
					this.field.setTemporaryField('swampfield', duration, source, move);
					this.add('-message', `The pledges combined and formed a swamp!`);
				}

				this.field.fieldState.lastPledge = '';
			} else {
				this.field.fieldState.lastPledge = 'waterpledge';
			}
		},
	},
    watersport: {
        inherit: true,
        isNonstandard: null,
    },
    waterspout: {
        inherit: true,
        zMove: {basePower: 200},
    },
    wildboltstorm: {
        inherit: true,
        onBasePower() {
            if (this.field.isTerrain('electricterrain')) {
                this.add('-message', 'The attack became hyper-charged!');
                return this.chainModify(1.5);
            }
        },
    },
    wildcharge: {
        inherit: true,
        onModifyMove(move) {
            if (this.field.isUnlayeredTerrain('electricterrain')) {
                move.recoil = [0, 1];
            }
        },
    },
    wish: {
        inherit: true,
		condition: {
			onStart(pokemon, source) {
				this.effectState.hp = (this.field.isUnlayeredTerrain('mistyterrain') ? source.maxhp*0.75 : source.maxhp / 2);
				this.effectState.startingTurn = this.getOverflowedTurnCount();
				if (this.effectState.startingTurn === 255) {
					this.hint(`In Gen 8+, Wish will never resolve when used on the ${this.turn}th turn.`);
				}
			},
			onResidualOrder: 4,
			onResidual(target: Pokemon) {
				if (this.getOverflowedTurnCount() <= this.effectState.startingTurn) return;
				target.side.removeSlotCondition(this.getAtSlot(this.effectState.sourceSlot), 'wish');
			},
			onEnd(target) {
				if (target && !target.fainted) {
					const damage = this.heal(this.effectState.hp, target, target);
					if (damage) {
						this.add('-heal', target, target.getHealth, '[from] move: Wish', '[wisher] ' + this.effectState.source.name);
					}
				}
			},
		},
    },
};
