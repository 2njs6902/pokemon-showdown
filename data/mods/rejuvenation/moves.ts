export const Moves: {[moveid: string]: ModdedMoveData} = {
	irritation: {
		num: -6902,
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
		secondary: null,
		target: "normal",
		type: "Bug",
		zMove: { basePower: 160 },
		contestType: "Clever",
	},	
	slashandburn: {
		num: -6901,
		accuracy: 90,
		basePower: 90,
		category: "Physical",
		name: "Slash And Burn",
		pp: 10,
		priority: 0,
		flags: { protect: 1, mirror: 1, metronome: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "Grass",
		contestType: "Cute",
	},
};
