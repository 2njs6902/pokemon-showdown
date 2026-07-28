export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	absorbbulb: {
		inherit: true,
	},
	adamancrystal: {
		inherit: true,
	},
	adamantorb: {
		inherit: true,
	},
	venusaurite: {
		name: "Venusaurite",
		spritenum: 608,
		megaStone: { "Venusaur": "Venusaur-Mega" },
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: 659,
		gen: 9,
		isNonstandard: null,
	},
	venusauriteg: {
		name: "Venusaurite G",
		spritenum: 608,
		megaStone: { "Venusaur": "Venusaur-Giga" },
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: -1000,
		gen: 9,
		isNonstandard: null,
	},
}