export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	bulbasaur: {
		inherit: true,
		num: -6902,
		name: "Bulbasaur",
		types: ["Grass", "Poison"],
		baseStats: {hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45},
		abilities: {0: "Overgrow", H: "Chlorophyll"},
	},
	ivysaur: {
		inherit: true,
		num: -6901,
		name: "Ivysaur",
		types: ["Grass", "Poison"],
		baseStats: {hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60},
		abilities: {0: "Overgrow", H: "Chlorophyll"},
	},
	venusaur: {
		inherit: true,
		num: -6900,
		name: "Venusaur",
		types: ["Grass", "Poison"],
		baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
		abilities: {0: "Overgrow", H: "Chlorophyll"},
	},
};
