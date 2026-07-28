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
		inherit: true,
	},
	venusauriteg: {
		inherit: true,
		name: "Venusaurite G",
		spritenum: 608,
		megaStone: { "Venusaur": "Venusaur-Giga" },
		itemUser: ["Venusaur"],
		onTakeItem(item, source) {
			return !item.megaStone?.[source.baseSpecies.baseSpecies];
		},
		num: -1000,
		gen: 9,
	},
}