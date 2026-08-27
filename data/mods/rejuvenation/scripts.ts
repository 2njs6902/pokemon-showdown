export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	inherit: 'gen9',
	
	actions: {
		applyRecoilDamage(damageDealt, move, pokemon) {
			let recoilDamage = null;

			if (move.struggleRecoil) {
				recoilDamage = this.battle.clampIntRange(
					Math.round(pokemon.baseMaxhp / 4),
					1
				);
			} else if (move.mindBlownRecoil || move.chloroblastRecoil) {
				if (
					move.chloroblastRecoil &&
					this.battle.field.isField('forestfield')
				) {
					recoilDamage = Math.round(pokemon.maxhp / 4);
				} else {
					recoilDamage = Math.round(pokemon.maxhp / 2);
				}
			} else if (move.recoil) {
				recoilDamage = this.battle.clampIntRange(
					Math.round(damageDealt * move.recoil[0] / move.recoil[1]),
					1
				);
			} else {
				return null;
			}

			const hpBeforeRecoil = pokemon.hp;

			if (move.struggleRecoil) {
				this.battle.directDamage(
					recoilDamage,
					pokemon,
					pokemon,
					{ id: 'strugglerecoil' } as Condition
				);
			} else {
				const effect = move.mindBlownRecoil ?
					this.dex.conditions.get(move.name) :
					'recoil';

				this.battle.damage(recoilDamage, pokemon, pokemon, effect);
			}

			if (
				pokemon.hp <= pokemon.maxhp / 2 &&
				hpBeforeRecoil > pokemon.maxhp / 2
			) {
				this.battle.runEvent('EmergencyExit', pokemon, pokemon);
			}

			return recoilDamage;
		},
	},
};
