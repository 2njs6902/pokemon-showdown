export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	absorbbulb: {
		inherit: true,
	},
	adamantcrystal: {
		inherit: true,
	},
	adamantorb: {
		inherit: true,
	},
	aloraichiumz: {
		inherit: true,
		isNonstandard: null,
	},
	berry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	berryjuice: {
		inherit: true,
	},
	berrysweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	berserkgene: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	bitterberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	bottlecap: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	buggem: {
		inherit: true,
		isNonstandard: null,
	},
	buginiumz: {
		inherit: true,
		isNonstandard: null,
	},
	bugmemory: {
		inherit: true,
		isNonstandard: null,
	},
	burntberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	cellbattery: {
		inherit: true,
		onStart(pokemon) {
			if (!pokemon.ignoringItem() && this.field.isUnlayeredTerrain(['electricterrain'])) {
				pokemon.useItem();
			}
		},
		onTerrainChange(pokemon) {
			if (this.field.isUnlayeredTerrain(['electricterrain'])) {
				pokemon.useItem();
			}
		},
	},
	cloversweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	crucibellite: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	darkgem: {
		inherit: true,
		isNonstandard: null,
	},
	darkiniumz: {
		inherit: true,
		isNonstandard: null,
	},
	decidiumz: {
		inherit: true,
		isNonstandard: null,
	},
	darkmemory: {
		inherit: true,
		isNonstandard: null,
	},
	dragongem: {
		inherit: true,
		isNonstandard: null,
	},
	dragoniumz: {
		inherit: true,
		isNonstandard: null,
	},
	dragonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	eeviumz: {
		inherit: true,
		isNonstandard: null,
	},
	electricgem: {
		inherit: true,
		isNonstandard: null,
	},
	electricmemory: {
		inherit: true,
		isNonstandard: null,
	},
	electricseed: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	electriumz: {
		inherit: true,
		isNonstandard: null,
	},
	fairiumz: {
		inherit: true,
		isNonstandard: null,
	},
	fairygem: {
		inherit: true,
		isNonstandard: null,
	},
	fairymemory: {
		inherit: true,
		isNonstandard: null,
	},
	fightinggem: {
		inherit: true,
		isNonstandard: null,
	},
	fightingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	fightiniumz: {
		inherit: true,
		isNonstandard: null,
	},
	firegem: {
		inherit: true,
		isNonstandard: null,
	},
	firememory: {
		inherit: true,
		isNonstandard: null,
	},
	firiumz: {
		inherit: true,
		isNonstandard: null,
	},
	flowersweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	flyinggem: {
		inherit: true,
		isNonstandard: null,
	},
	flyingmemory: {
		inherit: true,
		isNonstandard: null,
	},
	flyiniumz: {
		inherit: true,
		isNonstandard: null,
	},
	ghostgem: {
		inherit: true,
		isNonstandard: null,
	},
	ghostiumz: {
		inherit: true,
		isNonstandard: null,
	},
	ghostmemory: {
		inherit: true,
		isNonstandard: null,
	},
	grassgem: {
		inherit: true,
		isNonstandard: null,
	},
	grassiumz: {
		inherit: true,
		isNonstandard: null,
	},
	grassmemory: {
		inherit: true,
		isNonstandard: null,
	},
	groundgem: {
		inherit: true,
		isNonstandard: null,
	},
	groundiumz: {
		inherit: true,
		isNonstandard: null,
	},
	groundmemory: {
		inherit: true,
		isNonstandard: null,
	},
	goldberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	goldbottlecap: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	grassyseed: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	iceberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	icegem: {
		inherit: true,
		isNonstandard: null,
	},
	icememory: {
		inherit: true,
		isNonstandard: null,
	},
	iciumz: {
		inherit: true,
		isNonstandard: null,
	},
	inciniumz: {
		inherit: true,
		isNonstandard: null,
	},
	kommoniumz: {
		inherit: true,
		isNonstandard: null,
	},
	loveberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	lovesweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	lunaliumz: {
		inherit: true,
		isNonstandard: null,
	},
	lycaniumz: {
		inherit: true,
		isNonstandard: null,
	},
	mail: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	marshadiumz: {
		inherit: true,
		isNonstandard: null,
	},
	mewniumz: {
		inherit: true,
		isNonstandard: null,
	},
	mimikiumz: {
		inherit: true,
		isNonstandard: null,
	},
	mintberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	miracleberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	mistyseed: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	mysteryberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	normalgem: {
		inherit: true,
		isNonstandard: null,
	},
	normaliumz: {
		inherit: true,
		isNonstandard: null,
	},
	parkball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	pikaniumz: {
		inherit: true,
		isNonstandard: null,
	},
	pikashuniumz: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	pinkbow: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	poisongem: {
		inherit: true,
		isNonstandard: null,
	},
	poisoniumz: {
		inherit: true,
		isNonstandard: null,
	},
	poisonmemory: {
		inherit: true,
		isNonstandard: null,
	},
	polkadotbow: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	primariumz: {
		inherit: true,
		isNonstandard: null,
	},
	przcureberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	psncureberry: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	psychicgem: {
		inherit: true,
		isNonstandard: null,
	},
	psychicmemory: {
		inherit: true,
		isNonstandard: null,
	},
	psychicseed: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	psychiumz: {
		inherit: true,
		isNonstandard: null,
	},
	ribbonsweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	rockgem: {
		inherit: true,
		isNonstandard: null,
	},
	rockiumz: {
		inherit: true,
		isNonstandard: null,
	},
	rockmemory: {
		inherit: true,
		isNonstandard: null,
	},
	snorliumz: {
		inherit: true,
		isNonstandard: null,
	},
	solganiumz: {
		inherit: true,
		isNonstandard: null,
	},
	starsweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	steelgem: {
		inherit: true,
		isNonstandard: null,
	},
	steeliumz: {
		inherit: true,
		isNonstandard: null,
	},
	steelmemory: {
		inherit: true,
		isNonstandard: null,
	},
	strangeball: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	strawberrysweet: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	terrainextender: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tapuniumz: {
		inherit: true,
		isNonstandard: null,
	},
	tr00: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr01: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr02: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr03: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr04: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr05: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr06: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr07: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr08: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr09: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr10: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr11: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr12: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr13: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr14: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr15: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr16: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr17: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr18: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr19: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr20: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr21: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr22: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr23: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr24: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr25: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr26: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr27: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr28: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr29: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr30: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr31: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr32: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr33: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr34: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr35: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr36: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr37: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr38: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr39: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr40: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr41: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr42: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr43: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr44: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr45: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr46: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr47: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr48: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr49: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr50: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr51: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr52: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr53: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr54: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr55: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr56: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr57: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr58: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr59: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr60: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr61: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr62: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr63: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr64: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr65: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr66: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr67: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr68: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr69: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr70: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr71: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr72: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr73: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr74: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr75: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr76: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr77: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr78: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr79: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr80: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr81: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr82: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr83: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr84: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr85: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr86: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr87: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr88: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr89: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr90: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr91: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr92: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr93: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr94: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr95: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr96: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr97: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr98: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	tr99: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	ultranecroziumz: {
		inherit: true,
		isNonstandard: null,
	},
	vilevial: {
		inherit: true,
		isNonstandard: "Unobtainable",
	},
	swampertite: {
		inherit: true,
		gen: 9,
		isNonstandard: null,
	},
	telluricseed: {
		inherit: true,
	},
	venusaurite: {
		inherit: true,
		gen: 9,
		isNonstandard: null,
	},
	venusauriteg: {
		inherit: true,
		isNonstandard: null,
	},
	watergem: {
		inherit: true,
		isNonstandard: null,
	},
	wateriumz: {
		inherit: true,
		isNonstandard: null,
	},
	watermemory: {
		inherit: true,
		isNonstandard: null,
	},
}