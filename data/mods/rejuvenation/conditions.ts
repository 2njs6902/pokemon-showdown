export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	partiallytrapped: {
		inherit: true,
		name: 'partiallytrapped',
		duration: 5,
		onStart(pokemon, source) {
			this.add('-activate', pokemon, 'move: ' + this.effectState.sourceEffect, `[of] ${source}`);

			if (this.effectState.sourceEffect.id === 'infestation' && this.field.isField('forestfield')) {
				this.effectState.boundDivisor = 6;
			} else {
				this.effectState.boundDivisor = source.hasItem('bindingband') ? 6 : 8;
			}
		},
	},
};
