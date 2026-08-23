export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	partiallytrapped: {
		inherit: true,
		name: 'partiallytrapped',
		duration: 5,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);
			if (this.effectState.sourceEffect.id === 'thundercage' && this.field.isUnlayeredTerrain('electricterrain')) {
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 4 : 6;
			} else {
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			}
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			const source = this.effectState.source;
			const gmaxEffect = ['gmaxcentiferno', 'gmaxsandblast'].includes(this.effectState.sourceEffect.id);
			if (source && (!source.isActive || source.hp <= 0 || !source.activeTurns) && !gmaxEffect) {
				delete pokemon.volatiles['partiallytrapped'];
				this.add('-end', pokemon, this.effectState.sourceEffect, '[partiallytrapped]', '[silent]');
				return;
			}

			let divisor = this.effectState.boundDivisor;
			if (this.effectState.sourceEffect.id === 'infestation' && this.field.isField('forestfield')) {
				divisor = 6;
			}

			this.damage(pokemon.baseMaxhp / divisor);

			if (
				this.field.isField('swampfield') &&
				['infestation', 'snaptrap'].includes(this.effectState.sourceEffect.id)
			) {
				const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
				const stat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[stat] = -1;
				this.boost(boost, pokemon, source);
			}
		},
	},
	trapped: {
		inherit: true,
		onStart(target, source, effect) {
			this.effectState.source = source;
			this.effectState.sourceEffect = effect;
			this.add('-activate', target, 'trapped');
		},
		onResidualOrder: 13,
		onResidual(pokemon) {
			if (
				this.field.isField('swampfield') &&
				this.effectState.sourceEffect?.id === 'spiderweb'
			) {
				const stats: BoostID[] = ['atk', 'def', 'spa', 'spd', 'spe'];
				const stat = this.sample(stats);
				const boost: SparseBoostsTable = {};
				boost[stat] = -1;
				this.boost(boost, pokemon, this.effectState.source);
			}
		},
	},
	shelterelectric: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Electric') {
				return this.chainModify(0.5);
			}
		},
	},
	shelterforest: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Bug') {
				return this.chainModify(0.5);
			}
		},
	},
	shelterswamp: {
		duration: 1,
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
	},
};
