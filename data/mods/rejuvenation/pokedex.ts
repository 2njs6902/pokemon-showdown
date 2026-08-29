export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	bulbasaur: {
		inherit: true,
	},
	ivysaur: {
		inherit: true,
	},
	venusaur: {
		inherit: true,
		otherFormes: ["Venusaur-Mega", "Venusaur-Giga"],
		formeOrder: ["Venusaur", "Venusaur-Mega", "Venusaur-Giga"],
		canGigantamax: undefined,
	},
	venusaurmega: {
		inherit: true,
	},
	venusaurgiga: {
		num: 3,
		name: "Venusaur-Giga",
		baseSpecies: "Venusaur",
		forme: "Giga",
		types: ["Grass", "Poison"],
		genderRatio: { M: 0.875, F: 0.125 },
		baseStats: { hp: 80, atk: 92, def: 93, spa: 140, spd: 140, spe: 80 },
		abilities: { 0: "Pollenflight"},
		heightm: 24,
		weightkg: 221.6,
		color: "Green",
		eggGroups: ["Monster", "Grass"],
		requiredItem: "Venusaurite G",
	},
	charmander: {
		inherit: true,
	},
	charmeleon: {
		inherit: true,
	},
	charizard: {
		inherit: true,
		otherFormes: ["Charizard-Mega-X", "Charizard-Mega-Y", "Charizard-Giga"],
		formeOrder: ["Charizard", "Charizard-Mega-X", "Charizard-Mega-Y", "Charizard-Giga"],
		canGigantamax: undefined,
	},
	charizardmegax: {
		inherit: true,
	},
	charizardmegay: {
		inherit: true,
	},
	charizardgiga: {
		num: 6,
		name: "Charizard-Giga",
		baseSpecies: "Charizard",
		forme: "Giga",
		types: ["Fire", "Flying"],
		genderRatio: { M: 0.875, F: 0.125 },
		baseStats: { hp: 78, atk: 92, def: 94, spa: 144, spd: 96, spe: 130 },
		abilities: { 0: "Wildfire" },
		heightm: 28,
		weightkg: 221.6,
		color: "Red",
		eggGroups: ["Monster", "Dragon"],
		requiredItem: "Charizardite G",
	},
	squirtle: {
		inherit: true,
	},
	wartortle: {
		inherit: true,
	},
	blastoise: {
		inherit: true,
		otherFormes: ["Blastoise-Mega", "Blastoise-Giga"],
		formeOrder: ["Blastoise", "Blastoise-Mega", "Blastoise-Giga"],
		canGigantamax: undefined,
	},
	blastoisemega: {
		inherit: true,
	},
	// blastoisegiga: {
	// },
	caterpie: {
		inherit: true,
	},
	metapod: {
		inherit: true,
	},
	butterfree: {
		inherit: true,
		otherFormes: ["Butterfree-Giga"],
		formeOrder: ["Butterfree", "Butterfree-Giga"],
		canGigantamax: undefined,
	},
	// butterfreegiga: {
	// },
	weedle: {
		inherit: true,
	},
	kakuna: {
		inherit: true,
	},
	beedrill: {
		inherit: true,
	},
	beedrillmega: {
		inherit: true,
	},
	pidgey: {
		inherit: true,
	},
	pidgeotto: {
		inherit: true,
	},
	pidgeot: {
		inherit: true,
	},
	pidgeotmega: {
		inherit: true,
	},
	rattata: {
		inherit: true,
	},
	rattataalola: {
		inherit: true,
	},
	raticate: {
		inherit: true,
		otherFormes: ["Raticate-Alola"],
		formeOrder: ["Raticate", "Raticate-Alola"],
	},
	raticatealola: {
		inherit: true,
	},
	spearow: {
		inherit: true,
	},
	fearow: {
		inherit: true,
	},
	ekans: {
		inherit: true,
	},
	arbok: {
		inherit: true,
	},
	pikachu: {
		inherit: true,
		otherFormes: ["Pikachu-Giga"],
		formeOrder: ["Pikachu", "Pikachu-Giga"],
		canGigantamax: undefined,
	},
	// pikachugiga: {
	// },
	raichu: {
		inherit: true,
	},
	raichualola: {
		inherit: true,
	},
	raichumegax: {
		inherit: true,
	},
	raichumegay: {
		inherit: true,
	},
	sandshrew: {
		inherit: true,
	},
	sandshrewalola: {
		inherit: true,
	},
	sandslash: {
		inherit: true,
	},
	sandslashalola: {
		inherit: true,
	},
	nidoranf: {
		inherit: true,
	},
	nidorina: {
		inherit: true,
	},
	nidoqueen: {
		inherit: true,
	},
	nidoranm: {
		inherit: true,
	},
	nidorino: {
		inherit: true,
	},
	nidoking: {
		inherit: true,
	},
	clefairy: {
		inherit: true,
	},
	clefable: {
		inherit: true,
	},
	clefablemega: {
		inherit: true,
	},
	vulpix: {
		inherit: true,
	},
	vulpixalola: {
		inherit: true,
	},
	ninetales: {
		inherit: true,
	},
	ninetalesalola: {
		inherit: true,
	},
	jigglypuff: {
		inherit: true,
	},
	wigglytuff: {
		inherit: true,
	},
	zubat: {
		inherit: true,
	},
	golbat: {
		inherit: true,
	},
	oddish: {
		inherit: true,
	},
	gloom: {
		inherit: true,
	},
	vileplume: {
		inherit: true,
	},
	paras: {
		inherit: true,
		otherFormes: ["Paras-Aevium", "Paras-Aevium-Zombie"],
		formeOrder: ["Paras", "Paras-Aevium", "Paras-Aevium-Zombie"],
	},
	parasaevium: {
		num: 46,
		name: "Paras-Aevium",
		baseSpecies: "Paras",
		forme: "Aevium",
		types: ["Bug", "Poison"],
		baseStats: { hp: 35, atk: 70, def: 55, spa: 45, spd: 55, spe: 25 },
		abilities: { 0: "Resuscitation" },
		heightm: 0.3,
		weightkg: 5.4,
		color: "White",
		evos: ["Parasect-Aevium"],
		eggGroups: ["Bug", "Grass"],
	},
	parasaeviumzombie: {
		num: 46,
		name: "Paras-Aevium-Zombie",
		baseSpecies: "Paras",
		forme: "Aevium-Zombie",
		types: ["Ghost", "Poison"],
		baseStats: { hp: 15, atk: 100, def: 25, spa: 45, spd: 25, spe: 75 },
		abilities: { 0: "Resuscitation" },
		heightm: 0.3,
		weightkg: 5.4,
		color: "White",
		eggGroups: ["Bug", "Grass"],
		requiredAbility: "Resuscitation",
		battleOnly: "Paras-Aevium",
	},
	parasect: {
		inherit: true,
		otherFormes: ["Parasect-Aevium", "Parasect-Aevium-Zombie"],
		formeOrder: ["Parasect", "Parasect-Aevium", "Parasect-Aevium-Zombie"],
	},
	parasectaevium: {
		num: 47,
		name: "Parasect-Aevium",
		baseSpecies: "Parasect",
		forme: "Aevium",
		types: ["Bug", "Poison"],
		baseStats: { hp: 60, atk: 90, def: 80, spa: 60, spd: 80, spe: 30 },
		abilities: { 0: "Resuscitation" },
		heightm: 1,
		weightkg: 29.5,
		color: "White",
		prevo: "Paras-Aevium",
		evoType: "useItem",
		evoItem: "Xen Waste",
		eggGroups: ["Bug", "Grass"],
		otherFormes: ["Parasect-Aevium-Zombie"],
		formeOrder: ["Parasect-Aevium", "Parasect-Aevium-Zombie"],
	},
	parasectaeviumzombie: {
		num: 47,
		name: "Parasect-Aevium-Zombie",
		baseSpecies: "Parasect",
		forme: "Aevium-Zombie",
		types: ["Ghost", "Poison"],
		baseStats: { hp: 40, atk: 130, def: 40, spa: 50, spd: 40, spe: 105 },
		abilities: { 0: "Resuscitation" },
		heightm: 1,
		weightkg: 29.5,
		color: "White",
		eggGroups: ["Bug", "Grass"],
		requiredAbility: "Resuscitation",
		battleOnly: "Parasect-Aevium",
	},
	venonat: {
		inherit: true,
	},
	venomoth: {
		inherit: true,
	},
	diglett: {
		inherit: true,
	},
	diglettalola: {
		inherit: true,
	},
	dugtrio: {
		inherit: true,
	},
	dugtrioalola: {
		inherit: true,
	},
	meowth: {
		inherit: true,
		otherFormes: ["Meowth-Alola", "Meowth-Galar", "Meowth-Giga"],
		formeOrder: ["Meowth", "Meowth-Alola", "Meowth-Galar", "Meowth-Giga"],
		canGigantamax: undefined,
	},
	meowthalola: {
		inherit: true,
	},
	meowthgalar: {
		inherit: true,
	},
	// meowthgiga: {
	// },
	persian: {
		inherit: true,
	},
	persianalola: {
		inherit: true,
	},
	psyduck: {
		inherit: true,
	},
	golduck: {
		inherit: true,
	},
	mankey: {
		inherit: true,
	},
	primeape: {
		inherit: true,
	},
	growlithe: {
		inherit: true,
	},
	growlithehisui: {
		inherit: true,
	},
	arcanine: {
		inherit: true,
	},
	arcaninehisui: {
		inherit: true,
	},
	poliwag: {
		inherit: true,
	},
	poliwhirl: {
		inherit: true,
	},
	poliwrath: {
		inherit: true,
	},
	abra: {
		inherit: true,
	},
	kadabra: {
		inherit: true,
	},
	alakazam: {
		inherit: true,
	},
	alakazammega: {
		inherit: true,
	},
	machop: {
		inherit: true,
	},
	machoke: {
		inherit: true,
	},
	machamp: {
		inherit: true,
		otherFormes: ["Machamp-Giga"],
		formeOrder: ["Machamp", "Machamp-Giga"],
		canGigantamax: undefined,
	},
	// machampgiga: {
	// },
	bellsprout: {
		inherit: true,
	},
	weepinbell: {
		inherit: true,
	},
	victreebel: {
		inherit: true,
	},
	victreebelmega: {
		inherit: true,
	},
	tentacool: {
		inherit: true,
	},
	tentacruel: {
		inherit: true,
	},
	geodude: {
		inherit: true,
	},
	geodudealola: {
		inherit: true,
	},
	graveler: {
		inherit: true,
	},
	graveleralola: {
		inherit: true,
	},
	golem: {
		inherit: true,
	},
	golemalola: {
		inherit: true,
	},
	ponyta: {
		inherit: true,
	},
	ponytagalar: {
		inherit: true,
	},
	rapidash: {
		inherit: true,
	},
	rapidashgalar: {
		inherit: true,
	},
	slowpoke: {
		inherit: true,
	},
	slowpokegalar: {
		inherit: true,
	},
	slowbro: {
		inherit: true,
	},
	slowbromega: {
		inherit: true,
	},
	slowbrogalar: {
		inherit: true,
	},
	magnemite: {
		inherit: true,
	},
	magneton: {
		inherit: true,
	},
	farfetchd: {
		inherit: true,
	},
	farfetchdgalar: {
		inherit: true,
	},
	doduo: {
		inherit: true,
	},
	dodrio: {
		inherit: true,
	},
	seel: {
		inherit: true,
	},
	dewgong: {
		inherit: true,
	},
	grimer: {
		inherit: true,
	},
	grimeralola: {
		inherit: true,
	},
	muk: {
		inherit: true,
	},
	mukalola: {
		inherit: true,
	},
	shellder: {
		inherit: true,
	},
	cloyster: {
		inherit: true,
	},
	gastly: {
		inherit: true,
	},
	haunter: {
		inherit: true,
	},
	gengar: {
		inherit: true,
		otherFormes: ["Gengar-Mega", "Gengar-Giga"],
		formeOrder: ["Gengar", "Gengar-Mega", "Gengar-Giga"],
		canGigantamax: undefined,
	},
	gengarmega: {
		inherit: true,
	},
	// gengargiga: {
	// },
	onix: {
		inherit: true,
	},
	drowzee: {
		inherit: true,
	},
	hypno: {
		inherit: true,
	},
	krabby: {
		inherit: true,
	},
	kingler: {
		inherit: true,
		otherFormes: ["Kingler-Giga"],
		formeOrder: ["Kingler", "Kingler-Giga"],
		canGigantamax: undefined,
	},
	kinglergiga: {
		num: 99,
		name: "Kingler-Giga",
		baseSpecies: "Kingler",
		forme: "Giga",
		types: ["Water"],
		baseStats: { hp: 55, atk: 169, def: 135, spa: 60, spd: 60, spe: 96 },
		abilities: { 0: "Foam Spray"},
		heightm: 19,
		weightkg: 133.2,
		color: "Red",
		eggGroups: ["Water 3"],
		requiredItem: "Kinglerite",
	},
	voltorb: {
		inherit: true,
	},
	voltorbhisui: {
		inherit: true,
	},
	electrode: {
		inherit: true,
	},
	electrodehisui: {
		inherit: true,
	},
	exeggcute: {
		inherit: true,
	},
	exeggutor: {
		inherit: true,
	},
	exeggutoralola: {
		inherit: true,
	},
	cubone: {
		inherit: true,
	},
	marowak: {
		inherit: true,
		otherFormes: ["Marowak-Alola"],
		formeOrder: ["Marowak", "Marowak-Alola"],
	},
	marowakalola: {
		inherit: true,
	},
	hitmonlee: {
		inherit: true,
	},
	hitmonchan: {
		inherit: true,
	},
	lickitung: {
		inherit: true,
	},
	koffing: {
		inherit: true,
	},
	weezing: {
		inherit: true,
	},
	weezinggalar: {
		inherit: true,
	},
	rhyhorn: {
		inherit: true,
	},
	rhydon: {
		inherit: true,
	},
	chansey: {
		inherit: true,
	},
	tangela: {
		inherit: true,
	},
	kangaskhan: {
		inherit: true,
	},
	kangaskhanmega: {
		inherit: true,
	},
	horsea: {
		inherit: true,
	},
	seadra: {
		inherit: true,
	},
	goldeen: {
		inherit: true,
	},
	seaking: {
		inherit: true,
	},
	staryu: {
		inherit: true,
	},
	starmie: {
		inherit: true,
	},
	starmiemega: {
		inherit: true,
	},
	mrmime: {
		inherit: true,
	},
	mrmimegalar: {
		inherit: true,
	},
	scyther: {
		inherit: true,
	},
	jynx: {
		inherit: true,
	},
	electabuzz: {
		inherit: true,
	},
	magmar: {
		inherit: true,
	},
	pinsir: {
		inherit: true,
	},
	pinsirmega: {
		inherit: true,
	},
	tauros: {
		inherit: true,
	},
	taurospaldeacombat: {
		inherit: true,
	},
	taurospaldeablaze: {
		inherit: true,
	},
	taurospaldeaaqua: {
		inherit: true,
	},
	magikarp: {
		inherit: true,
		otherFormes: ["Magikarp-Aevium"],
		formeOrder: ["Magikarp", "Magikarp-Aevium"],
	},
	magikarpaevium: {
		num: 129,
		name: "Magikarp-Aevium",
		baseSpecies: "Magikarp",
		forme: "Aevium",
		types: ["Fire"],
		baseStats: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 },
		abilities: { 0: "Rattled", H: "Magma Armor" },
		heightm: 0.9,
		weightkg: 10,
		color: "Red",
		evos: ["Gyarados-Aevium"],
		eggGroups: ["Water 2", "Dragon"],
	},
	gyarados: {
		inherit: true,
		otherFormes: ["Gyarados-Aevium", "Gyarados-Mega"],
		formeOrder: ["Gyarados", "Gyarados-Aevium", "Gyarados-Mega"],
	},
	gyaradosaevium: {
		num: 130,
		name: "Gyarados-Aevium",
		baseSpecies: "Gyarados",
		forme: "Aevium",
		types: ["Fire", "Dragon"],
		baseStats: { hp: 95, atk: 60, def: 79, spa: 125, spd: 100, spe: 81 },
		abilities: { 0: "Intimidate", H: "Multiscale" },
		heightm: 6.5,
		weightkg: 235,
		color: "Blue",
		prevo: "Magikarp-Aevium",
		evoLevel: 20,
		eggGroups: ["Water 2", "Dragon"],
	},
	gyaradosmega: {
		inherit: true,
	},
	lapras: {
		inherit: true,
		otherFormes: ["Lapras-Aevium", "Lapras-Giga"],
		formeOrder: ["Lapras", "Lapras-Aevium", "Lapras-Giga"],
		canGigantamax: undefined,
	},
	laprasaevium: {
		num: 131,
		name: "Lapras-Aevium",
		baseSpecies: "Lapras",
		forme: "Aevium",
		types: ["Rock", "Psychic"],
		baseStats: { hp: 135, atk: 95, def: 80, spa: 85, spd: 85, spe: 60 },
		abilities: { 0: "Solid Rock", 1: "Forewarn", H: "No Gaurd" },
		heightm: 2.5,
		weightkg: 220,
		color: "Purple",
		eggGroups: ["Monster", "Water 1"],
	},
	// laprasgiga: {
	// },
	ditto: {
		inherit: true,
	},
	eevee: {
		inherit: true,
		otherFormes: ["Eevee-Giga"],
		formeOrder: ["Eevee", "Eevee-Giga"],
		canGigantamax: undefined,
	},
	// eevegiga: {
	// },
	vaporeon: {
		inherit: true,
	},
	jolteon: {
		inherit: true,
	},
	flareon: {
		inherit: true,
	},
	porygon: {
		inherit: true,
	},
	omanyte: {
		inherit: true,
	},
	omastar: {
		inherit: true,
	},
	kabuto: {
		inherit: true,
	},
	kabutops: {
		inherit: true,
	},
	aerodactyl: {
		inherit: true,
	},
	aerodactylmega: {
		inherit: true,
	},
	snorlax: {
		inherit: true,
		otherFormes: ["Snorlax-Giga"],
		formeOrder: ["Snorlax", "Snorlax-Giga"],
		canGigantamax: undefined,
	},
	// snorlaxgiga: {
	// },
	articuno: {
		inherit: true,
	},
	articunogalar: {
		inherit: true,
	},
	zapdos: {
		inherit: true,
	},
	zapdosgalar: {
		inherit: true,
	},
	moltres: {
		inherit: true,
	},
	moltresgalar: {
		inherit: true,
	},
	dratini: {
		inherit: true,
	},
	dragonair: {
		inherit: true,
	},
	dragonite: {
		inherit: true,
	},
	dragonitemega: {
		inherit: true,
	},
	mewtwo: {
		inherit: true,
	},
	mewtwomegax: {
		inherit: true,
	},
	mewtwomegay: {
		inherit: true,
	},
	mew: {
		inherit: true,
	},
	chikorita: {
		inherit: true,
	},
	bayleef: {
		inherit: true,
	},
	meganium: {
		inherit: true,
	},
	meganiummega: {
		inherit: true,
	},
	cyndaquil: {
		inherit: true,
	},
	quilava: {
		inherit: true,
	},
	typhlosion: {
		inherit: true,
	},
	typhlosionhisui: {
		inherit: true,
	},
	totodile: {
		inherit: true,
	},
	croconaw: {
		inherit: true,
	},
	feraligatr: {
		inherit: true,
	},
	feraligatrmega: {
		inherit: true,
	},
	sentret: {
		inherit: true,
	},
	furret: {
		inherit: true,
	},
	hoothoot: {
		inherit: true,
	},
	noctowl: {
		inherit: true,
	},
	ledyba: {
		inherit: true,
	},
	ledian: {
		inherit: true,
	},
	spinarak: {
		inherit: true,
	},
	ariados: {
		inherit: true,
	},
	crobat: {
		inherit: true,
	},
	chinchou: {
		inherit: true,
	},
	lanturn: {
		inherit: true,
	},
	pichu: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	cleffa: {
		inherit: true,
	},
	igglybuff: {
		inherit: true,
	},
	togepi: {
		inherit: true,
	},
	togetic: {
		inherit: true,
	},
	natu: {
		inherit: true,
	},
	xatu: {
		inherit: true,
	},
	mareep: {
		inherit: true,
		otherFormes: ["Mareep-Aevium"],
		formeOrder: ["Mareep", "Mareep-Aevium"],
	},
	mareepaevium: {
		num: 179,
		name: "Mareep-Aevium",
		baseSpecies: "Mareep",
		forme: "Aevium",
		types: ["Ice", "Electric"],
		baseStats: { hp: 55, atk: 40, def: 45, spa: 65, spd: 40, spe: 35 },
		abilities: { 0: "Filter", 1: "Cotton Down" },
		heightm: 0.6,
		weightkg: 7.8,
		color: "White",
		eggGroups: ["Monster", "Field"],
	},
	flaaffy: {
		inherit: true,
		otherFormes: ["Flaaffy-Aevium"],
		formeOrder: ["Flaaffy", "Flaaffy-Aevium"],
	},
	flaaffyaevium: {
		num: 180,
		name: "Flaaffy-Aevium",
		baseSpecies: "Flaaffy",
		forme: "Aevium",
		types: ["Ice", "Electric"],
		baseStats: { hp: 70, atk: 55, def: 60, spa: 80, spd: 50, spe: 45 },
		abilities: { 0: "Filter", 1: "Cotton Down" },
		heightm: 0.8,
		weightkg: 13.3,
		color: "White",
		prevo: "Mareep-Aevium",
		evoLevel: 15,
		evos: ["Ampharos-Aevium"],
		eggGroups: ["Monster", "Field"],
	},
	ampharos: {
		inherit: true,
		otherFormes: ["Ampharos-Aevium", "Ampharos-Mega"],
		formeOrder: ["Ampharos", "Ampharos-Aevium", "Ampharos-Mega"],
	},
	ampharosaevium: {
		num: 181,
		name: "Ampharos-Aevium",
		baseSpecies: "Ampharos",
		forme: "Aevium",
		types: ["Ice", "Electric"],
		baseStats: { hp: 90, atk: 75, def: 90, spa: 115, spd: 85, spe: 55 },
		abilities: { 0: "Filter", 1: "Cotton Down" },
		heightm: 1.4,
		weightkg: 61.5,
		color: "White",
		prevo: "Flaaffy-Aevium",
		evoLevel: 30,
		eggGroups: ["Monster", "Field"],
	},
	ampharosmega: {
		inherit: true,
	},
	bellossom: {
		inherit: true,
	},
	marill: {
		inherit: true,
	},
	azumarill: {
		inherit: true,
	},
	sudowoodo: {
		inherit: true,
	},
	politoed: {
		inherit: true,
	},
	hoppip: {
		inherit: true,
	},
	skiploom: {
		inherit: true,
	},
	jumpluff: {
		inherit: true,
	},
	aipom: {
		inherit: true,
	},
	sunkern: {
		inherit: true,
	},
	sunflora: {
		inherit: true,
	},
	yanma: {
		inherit: true,
	},
	wooper: {
		inherit: true,
	},
	wooperpaldea: {
		inherit: true,
	},
	quagsire: {
		inherit: true,
	},
	espeon: {
		inherit: true,
	},
	umbreon: {
		inherit: true,
	},
	murkrow: {
		inherit: true,
	},
	slowking: {
		inherit: true,
	},
	slowkinggalar: {
		inherit: true,
	},
	misdreavus: {
		inherit: true,
		otherFormes: ["Misdreavus-Aevium"],
		formeOrder: ["Misdreavus", "Misdreavus-Aevium"],
	},
	misdreavusaevium: {
		num: 200,
		name: "Misdreavus-Aevium",
		baseSpecies: "Misdreavus",
		forme: "Aevium",
		types: ["Grass", "Ghost"],
		baseStats: { hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 85 },
		abilities: { 0: "Magic Bounce", 1: "Poison Point", H: "Tangling Hair" },
		heightm: 0.7,
		weightkg: 1,
		color: "Green",
		evos: ["Mismagius-Aevium"],
		eggGroups: ["Amorphous"],
	},
	unown: {
		inherit: true,
	},
	wobbuffet: {
		inherit: true,
	},
	girafarig: {
		inherit: true,
	},
	pineco: {
		inherit: true,
	},
	forretress: {
		inherit: true,
	},
	dunsparce: {
		inherit: true,
	},
	gligar: {
		inherit: true,
	},
	steelix: {
		inherit: true,
	},
	steelixmega: {
		inherit: true,
	},
	snubbull: {
		inherit: true,
	},
	granbull: {
		inherit: true,
	},
	qwilfish: {
		inherit: true,
	},
	qwilfishhisui: {
		inherit: true,
	},
	scizor: {
		inherit: true,
	},
	scizormega: {
		inherit: true,
	},
	shuckle: {
		inherit: true,
	},
	heracross: {
		inherit: true,
	},
	heracrossmega: {
		inherit: true,
	},
	sneasel: {
		inherit: true,
		otherFormes: ["Sneasel-Hisui", "Sneasel-Aevium"],
		formeOrder: ["Sneasel", "Sneasel-Hisui", "Sneasel-Aevium"],
	},
	sneaselhisui: {
		inherit: true,
	},
	sneaselaevium: {
		num: 215,
		name: "Sneasel-Aevium",
		baseSpecies: "Sneasel",
		forme: "Aevium",
		types: ["Fighting", "Fairy"],
		baseStats: { hp: 55, atk: 95, def: 75, spa: 35, spd: 55, spe: 115 },
		abilities: { 0: "Battle Armor", 1: "Wind Rider", H: "Sworn Duty" },
		heightm: 1.0,
		weightkg: 17,
		color: "Gray",
		evos: ["Sneasler-Aevium"],
		eggGroups: ["Field"],
	},
	teddiursa: {
		inherit: true,
	},
	ursaring: {
		inherit: true,
	},
	slugma: {
		inherit: true,
	},
	magcargo: {
		inherit: true,
	},
	swinub: {
		inherit: true,
	},
	piloswine: {
		inherit: true,
	},
	corsola: {
		inherit: true,
	},
	corsolagalar: {
		inherit: true,
	},
	remoraid: {
		inherit: true,
	},
	octillery: {
		inherit: true,
	},
	delibird: {
		inherit: true,
	},
	mantine: {
		inherit: true,
	},
	skarmory: {
		inherit: true,
	},
	skarmorymega: {
		inherit: true,
	},
	houndour: {
		inherit: true,
	},
	houndoom: {
		inherit: true,
	},
	houndoommega: {
		inherit: true,
	},
	kingdra: {
		inherit: true,
	},
	phanpy: {
		inherit: true,
	},
	donphan: {
		inherit: true,
	},
	porygon2: {
		inherit: true,
	},
	stantler: {
		inherit: true,
	},
	smeargle: {
		inherit: true,
	},
	tyrogue: {
		inherit: true,
	},
	hitmontop: {
		inherit: true,
	},
	smoochum: {
		inherit: true,
	},
	elekid: {
		inherit: true,
	},
	magby: {
		inherit: true,
	},
	miltank: {
		inherit: true,
	},
	blissey: {
		inherit: true,
	},
	raikou: {
		inherit: true,
	},
	entei: {
		inherit: true,
	},
	suicune: {
		inherit: true,
	},
	larvitar: {
		inherit: true,
	},
	pupitar: {
		inherit: true,
	},
	tyranitar: {
		inherit: true,
	},
	tyranitarmega: {
		inherit: true,
	},
	lugia: {
		inherit: true,
	},
	hooh: {
		inherit: true,
	},
	celebi: {
		inherit: true,
	},
	treecko: {
		inherit: true,
	},
	grovyle: {
		inherit: true,
	},
	sceptile: {
		inherit: true,
	},
	sceptilemega: {
		inherit: true,
	},
	torchic: {
		inherit: true,
	},
	combusken: {
		inherit: true,
	},
	blaziken: {
		inherit: true,
	},
	mudkip: {
		inherit: true,
	},
	marshtomp: {
		inherit: true,
	},
	swampert: {
		inherit: true,
	},
	swampertmega: {
		inherit: true,
	},
	poochyena: {
		inherit: true,
	},
	mightyena: {
		inherit: true,
	},
	zigzagoon: {
		inherit: true,
	},
	zigzagoongalar: {
		inherit: true,
	},
	linoone: {
		inherit: true,
	},
	linoonegalar: {
		inherit: true,
	},
	wurmple: {
		inherit: true,
	},
	silcoon: {
		inherit: true,
	},
	beautifly: {
		inherit: true,
	},
	cascoon: {
		inherit: true,
	},
	dustox: {
		inherit: true,
	},
	lotad: {
		inherit: true,
	},
	lombre: {
		inherit: true,
	},
	ludicolo: {
		inherit: true,
	},
	seedot: {
		inherit: true,
	},
	nuzleaf: {
		inherit: true,
	},
	shiftry: {
		inherit: true,
	},
	taillow: {
		inherit: true,
	},
	swellow: {
		inherit: true,
	},
	wingull: {
		inherit: true,
	},
	pelipper: {
		inherit: true,
	},
	ralts: {
		inherit: true,
	},
	kirlia: {
		inherit: true,
	},
	gardevoir: {
		inherit: true,
	},
	gardevoirmega: {
		inherit: true,
	},
	surskit: {
		inherit: true,
	},
	masquerain: {
		inherit: true,
	},
	shroomish: {
		inherit: true,
		otherFormes: ["Shroomish-Aevium"],
		formeOrder: ["Shroomish", "Shroomish-Aevium"],
	},
	shroomishaevium: {
		num: 285,
		name: "Shroomish-Aevium",
		baseSpecies: "Shroomish",
		forme: "Aevium",
		types: ["Grass"],
		baseStats: { hp: 60, atk: 40, def: 60, spa: 40, spd: 60, spe: 35 },
		abilities: { 0: "Rattled", 1: "Technician", H: "Static" },
		heightm: 0.4,
		weightkg: 4.5,
		color: "Brown",
		evos: ["Breloom-Aevium"],
		eggGroups: ["Fairy", "Grass"],
	},
	breloom: {
		inherit: true,
		otherFormes: ["Breloom-Aevium"],
		formeOrder: ["Breloom", "Breloom-Aevium"],
	},
	breloomaevium: {
		num: 286,
		name: "Breloom-Aevium",
		baseSpecies: "Breloom",
		forme: "Aevium",
		types: ["Grass", "Electric"],
		baseStats: { hp: 60, atk: 130, def: 80, spa: 60, spd: 60, spe: 70 },
		abilities: { 0: "Tough Claws", 1: "Technician", H: "Static" },
		heightm: 1.2,
		weightkg: 39.2,
		color: "Green",
		prevo: "Shroomish-Aevium",
		evoLevel: 23,
		eggGroups: ["Fairy", "Grass"],
	},
	slakoth: {
		inherit: true,
	},
	vigoroth: {
		inherit: true,
	},
	slaking: {
		inherit: true,
	},
	nincada: {
		inherit: true,
	},
	ninjask: {
		inherit: true,
	},
	shedinja: {
		inherit: true,
	},
	whismur: {
		inherit: true,
	},
	loudred: {
		inherit: true,
	},
	exploud: {
		inherit: true,
	},
	makuhita: {
		inherit: true,
	},
	hariyama: {
		inherit: true,
	},
	azurill: {
		inherit: true,
	},
	nosepass: {
		inherit: true,
	},
	skitty: {
		inherit: true,
	},
	delcatty: {
		inherit: true,
	},
	sableye: {
		inherit: true,
	},
	sableyemega: {
		inherit: true,
	},
	mawile: {
		inherit: true,
	},
	mawilemega: {
		inherit: true,
	},
	aron: {
		inherit: true,
	},
	lairon: {
		inherit: true,
	},
	aggron: {
		inherit: true,
	},
	aggronmega: {
		inherit: true,
	},
	meditite: {
		inherit: true,
	},
	medicham: {
		inherit: true,
	},
	medichammega: {
		inherit: true,
	},
	electrike: {
		inherit: true,
	},
	manectric: {
		inherit: true,
	},
	manectricmega: {
		inherit: true,
	},
	plusle: {
		inherit: true,
	},
	minun: {
		inherit: true,
	},
	volbeat: {
		inherit: true,
	},
	illumise: {
		inherit: true,
	},
	roselia: {
		inherit: true,
		otherFormes: ["Roselia-Aevium"],
		formeOrder: ["Roselia", "Roselia-Aevium"],
	},
	roseliaaevium: {
		num: 315,
		name: "Roselia-Aevium",
		baseSpecies: "Roselia",
		forme: "Aevium",
		types: ["Ground", "Fighting"],
		baseStats: { hp: 50, atk: 60, def: 45, spa: 100, spd: 80, spe: 65 },
		abilities: { 0: "Dry Skin", 1: "Technician", H: "Sand Veil" },
		heightm: 0.3,
		weightkg: 2,
		color: "Brown",
		prevo: "Budew-Aevium",
		evoType: "levelFriendship",
		evoCondition: "during the day",
		evos: ["Roserade-Aevium"],
		eggGroups: ["Fairy", "Grass"],
		canHatch: true,
	},
	gulpin: {
		inherit: true,
	},
	swalot: {
		inherit: true,
	},
	carvanha: {
		inherit: true,
	},
	sharpedo: {
		inherit: true,
	},
	sharpedomega: {
		inherit: true,
	},
	wailmer: {
		inherit: true,
	},
	wailord: {
		inherit: true,
	},
	numel: {
		inherit: true,
	},
	camerupt: {
		inherit: true,
	},
	cameruptmega: {
		inherit: true,
	},
	torkoal: {
		inherit: true,
	},
	spoink: {
		inherit: true,
	},
	grumpig: {
		inherit: true,
	},
	spinda: {
		inherit: true,
	},
	trapinch: {
		inherit: true,
	},
	vibrava: {
		inherit: true,
	},
	flygon: {
		inherit: true,
	},
	cacnea: {
		inherit: true,
	},
	cacturne: {
		inherit: true,
	},
	swablu: {
		inherit: true,
	},
	altaria: {
		inherit: true,
	},
	altariamega: {
		inherit: true,
	},
	zangoose: {
		inherit: true,
	},
	seviper: {
		inherit: true,
	},
	lunatone: {
		inherit: true,
		otherFormes: ["Lunatone-Dominant-Fusion"],
		formeOrder: ["Lunatone", "Lunatone-Dominant-Fusion"],
	},
	lunatonedominantfusion: {
		num: 337,
		name: "Lunatone-Dominant-Fusion",
		baseSpecies: "Lunatone",
		forme: "Dominant-Fusion",
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: { hp: 90, atk: 44, def: 90, spa: 110, spd: 90, spe: 75 },
		abilities: { 0: "Lunar Idol" },
		heightm: 1,
		weightkg: 168,
		color: "Yellow",
		eggGroups: ["Mineral"],
	},
	solrock: {
		inherit: true,
		otherFormes: ["Solrock-Dominant-Fusion"],
		formeOrder: ["Solrock", "Solrock-Dominant-Fusion"],
	},
	solrockdominantfusion: {
		num: 338,
		name: "Solrock-Dominant-Fusion",
		baseSpecies: "Solrock",
		forme: "Dominant-Fusion",
		types: ["Rock", "Psychic"],
		gender: "N",
		baseStats: { hp: 90, atk: 110, def: 90, spa: 75, spd: 90, spe: 44 },
		abilities: { 0: "Solar Idol" },
		heightm: 1.2,
		weightkg: 154,
		color: "Red",
		eggGroups: ["Mineral"],
	},
	barboach: {
		inherit: true,
	},
	whiscash: {
		inherit: true,
	},
	corphish: {
		inherit: true,
	},
	crawdaunt: {
		inherit: true,
	},
	baltoy: {
		inherit: true,
	},
	claydol: {
		inherit: true,
	},
	lileep: {
		inherit: true,
	},
	cradily: {
		inherit: true,
	},
	anorith: {
		inherit: true,
	},
	armaldo: {
		inherit: true,
	},
	feebas: {
		inherit: true,
		otherFormes: ["Feebas-Aevium"],
		formeOrder: ["Feebas", "Feebas-Aevium"],
	},
	feebasaevium: {
		num: 349,
		name: "Feebas-Aevium",
		baseSpecies: "Feebas",
		forme: "Aevium",
		types: ["Poison", "Fairy"],
		baseStats: { hp: 20, atk: 15, def: 20, spa: 10, spd: 55, spe: 80 },
		abilities: { 0: "Poison Point", 1: "Stench", H: "Scrappy" },
		heightm: 0.6,
		weightkg: 7.4,
		color: "Purple",
		evos: ["Milotic-Aevium"],
		eggGroups: ["Water 1", "Dragon"],
	},
	milotic: {
		inherit: true,
		otherFormes: ["Milotic-Aevium"],
		formeOrder: ["Milotic", "Milotic-Aevium"],
	},
	miloticaevium: {
		num: 350,
		name: "Milotic-Aevium",
		baseSpecies: "Milotic",
		forme: "Aevium",
		types: ["Poison", "Fairy"],
		baseStats: { hp: 95, atk: 100, def: 79, spa: 60, spd: 125, spe: 81 },
		abilities: { 0: "Poison Point", 1: "Merciless", H: "Defiant" },
		heightm: 6.2,
		weightkg: 162,
		color: "Purple",
		prevo: "Feebas-Aevium",
		evoType: "trade",
		evoItem: "Prism Scale",
		eggGroups: ["Water 1", "Dragon"],
	},
	castform: {
		inherit: true,
	},
	castformsunny: {
		inherit: true,
	},
	castformrainy: {
		inherit: true,
	},
	castformsnowy: {
		inherit: true,
	},
	kecleon: {
		inherit: true,
	},
	shuppet: {
		inherit: true,
	},
	banette: {
		inherit: true,
	},
	banettemega: {
		inherit: true,
	},
	duskull: {
		inherit: true,
	},
	dusclops: {
		inherit: true,
	},
	tropius: {
		inherit: true,
	},
	chimecho: {
		inherit: true,
	},
	chimechomega: {
		inherit: true,
	},
	absol: {
		inherit: true,
	},
	absolmega: {
		inherit: true,
	},
	absolmegaz: {
		inherit: true,
	},
	wynaut: {
		inherit: true,
	},
	snorunt: {
		inherit: true,
		otherFormes: ["Snorunt-Aevium"],
		formeOrder: ["Snorunt", "Snorunt-Aevium"],
	},
	snoruntaevium: {
		num: 361,
		name: "Snorunt-Aevium",
		baseSpecies: "Snorunt",
		forme: "Aevium",
		types: ["Grass", "Rock"],
		baseStats: { hp: 50, atk: 50, def: 50, spa: 50, spd: 50, spe: 50 },
		abilities: { 0: "Grass Pelt", 1: "Rock Head", H: "Stamina" },
		heightm: 0.7,
		weightkg: 16.8,
		color: "Gray",
		evos: ["Glalie-Aevium", "Froslass-Aevium"],
		eggGroups: ["Fairy", "Mineral"],
	},
	glalie: {
		inherit: true,
		otherFormes: ["Glalie-Aevium", "Glalie-Mega"],
		formeOrder: ["Glalie", "Glalie-Aevium", "Glalie-Mega"],
	},
	glalieaevium: {
		num: 362,
		name: "Glalie-Aevium",
		baseSpecies: "Glalie",
		forme: "Aevium",
		types: ["Grass", "Rock"],
		baseStats: { hp: 110, atk: 100, def: 90, spa: 50, spd: 80, spe: 50 },
		abilities: { 0: "Grassy Surge", 1: "Rock Head", H: "Stamina" },
		heightm: 1.5,
		weightkg: 256.5,
		color: "Gray",
		prevo: "Snorunt-Aevium",
		evoLevel: 42,
		eggGroups: ["Fairy", "Mineral"],
	},
	glaliemega: {
		inherit: true,
	},
	spheal: {
		inherit: true,
	},
	sealeo: {
		inherit: true,
	},
	walrein: {
		inherit: true,
	},
	clamperl: {
		inherit: true,
	},
	huntail: {
		inherit: true,
	},
	gorebyss: {
		inherit: true,
	},
	relicanth: {
		inherit: true,
	},
	luvdisc: {
		inherit: true,
	},
	bagon: {
		inherit: true,
	},
	shelgon: {
		inherit: true,
	},
	salamence: {
		inherit: true,
	},
	salamencemega: {
		inherit: true,
	},
	beldum: {
		inherit: true,
	},
	metang: {
		inherit: true,
	},
	metagross: {
		inherit: true,
	},
	metagrossmega: {
		inherit: true,
	},
	regirock: {
		inherit: true,
	},
	regice: {
		inherit: true,
	},
	registeel: {
		inherit: true,
	},
	latias: {
		inherit: true,
	},
	latiasmega: {
		inherit: true,
	},
	latios: {
		inherit: true,
	},
	latiosmega: {
		inherit: true,
	},
	kyogre: {
		inherit: true,
	},
	kyogreprimal: {
		inherit: true,
	},
	groudon: {
		inherit: true,
	},
	groudonprimal: {
		inherit: true,
	},
	rayquaza: {
		inherit: true,
	},
	rayquazamega: {
		inherit: true,
	},
	jirachi: {
		inherit: true,
	},
	deoxys: {
		inherit: true,
	},
	deoxysattack: {
		inherit: true,
	},
	deoxysdefense: {
		inherit: true,
	},
	deoxysspeed: {
		inherit: true,
	},
	turtwig: {
		inherit: true,
	},
	grotle: {
		inherit: true,
	},
	torterra: {
		inherit: true,
	},
	chimchar: {
		inherit: true,
	},
	monferno: {
		inherit: true,
	},
	infernape: {
		inherit: true,
	},
	piplup: {
		inherit: true,
	},
	prinplup: {
		inherit: true,
	},
	empoleon: {
		inherit: true,
	},
	starly: {
		inherit: true,
	},
	staravia: {
		inherit: true,
	},
	staraptor: {
		inherit: true,
	},
	staraptormega: {
		inherit: true,
	},
	bidoof: {
		inherit: true,
	},
	bibarel: {
		inherit: true,
	},
	kricketot: {
		inherit: true,
	},
	kricketune: {
		inherit: true,
	},
	shinx: {
		inherit: true,
	},
	luxio: {
		inherit: true,
	},
	luxray: {
		inherit: true,
	},
	budew: {
		inherit: true,
		otherFormes: ["Budew-Aevium"],
		formeOrder: ["Budew", "Budew-Aevium"],
	},
	budewaevium: {
		num: 406,
		name: "Budew-Aevium",
		baseSpecies: "Budew",
		forme: "Aevium",
		types: ["Ground"],
		baseStats: { hp: 40, atk: 30, def: 35, spa: 50, spd: 70, spe: 55 },
		abilities: { 0: "Dry Skin", 1: "Technician", H: "Sand Veil" },
		heightm: 0.2,
		weightkg: 1.2,
		color: "Brown",
		evos: ["Roselia-Aevium"],
		eggGroups: ["Undiscovered"],
		canHatch: true,
	},
	roserade: {
		inherit: true,
		otherFormes: ["Roserade-Aevium"],
		formeOrder: ["Roserade", "Roserade-Aevium"],
	},
	roseradeaevium: {
		num: 407,
		name: "Roserade-Aevium",
		baseSpecies: "Roserade",
		forme: "Aevium",
		types: ["Ground", "Fighting"],
		baseStats: { hp: 60, atk: 70, def: 65, spa: 125, spd: 105, spe: 90 },
		abilities: { 0: "Dry Skin", 1: "Technician", H: "Sand Veil" },
		heightm: 0.9,
		weightkg: 14.5,
		color: "Brown",
		prevo: "Roselia-Aevium",
		evoType: "useItem",
		evoItem: "Sun Stone",
		eggGroups: ["Fairy", "Grass"],
	},
	cranidos: {
		inherit: true,
	},
	rampardos: {
		inherit: true,
	},
	shieldon: {
		inherit: true,
	},
	bastiodon: {
		inherit: true,
	},
	burmy: {
		inherit: true,
	},
	burmysandy: {
		inherit: true,
	},
	burmytrash: {
		inherit: true,
	},
	wormadam: {
		inherit: true,
	},
	wormadamsandy: {
		inherit: true,
	},
	wormadamtrash: {
		inherit: true,
	},
	mothim: {
		inherit: true,
	},
	combee: {
		inherit: true,
	},
	vespiquen: {
		inherit: true,
	},
	pachirisu: {
		inherit: true,
	},
	buizel: {
		inherit: true,
	},
	floatzel: {
		inherit: true,
	},
	cherubi: {
		inherit: true,
	},
	cherrim: {
		inherit: true,
	},
	cherrimsunshine: {
		inherit: true,
	},
	shellos: {
		inherit: true,
		otherFormes: ["Shellos-Aevium-West", "Shellos-Aevium-East"],
		formeOrder: ["Shellos", "Shellos-East", "Shellos-Aevium-West", "Shellos-Aevium-East"],
	},
	shelloseast: {
		inherit: true,
	},
	shellosaeviumwest: {
		num: 422,
		name: "Shellos-Aevium-West",
		baseSpecies: "Shellos",
		forme: "Aevium-West",
		types: ["Ground", "Fairy"],
		baseStats: { hp: 76, atk: 48, def: 48, spa: 57, spd: 62, spe: 34 },
		abilities: { 0: "Storm Drain", 1: "Liquid Ooze", H: "Poison Heal" },
		heightm: 0.3,
		weightkg: 6.3,
		color: "Purple",
		evos: ["Gastrodon-Aevium-West"],
		eggGroups: ["Water 1", "Amorphous"],
	},
	shellosaeviumeast: {
		num: 422,
		name: "Shellos-Aevium-East",
		baseSpecies: "Shellos",
		forme: "Aevium-East",
		types: ["Ground", "Fairy"],
		baseStats: { hp: 76, atk: 48, def: 48, spa: 57, spd: 62, spe: 34 },
		abilities: { 0: "Storm Drain", 1: "Liquid Ooze", H: "Flare Boost" },
		heightm: 0.3,
		weightkg: 6.3,
		color: "Purple",
		evos: ["Gastrodon-Aevium-East"],
		eggGroups: ["Water 1", "Amorphous"],
	},
	gastrodon: {
		inherit: true,
		otherFormes: ["Gastrodon-Aevium-West", "Gastrodon-Aevium-East"],
		cosmeticFormes: ["Gastrodon-East"],
		formeOrder: ["Gastrodon", "Gastrodon-East", "Gastrodon-Aevium-West", "Gastrodon-Aevium-East"],
	},
	gastrodoneast: {
		inherit: true,
	},
	gastrodonaeviumwest: {
		num: 423,
		name: "Gastrodon-Aevium-West",
		baseSpecies: "Gastrodon",
		types: ["Ground", "Fairy"],
		baseStats: { hp: 118, atk: 83, def: 68, spa: 92, spd: 82, spe: 39 },
		abilities: { 0: "Storm Drain", 1: "Liquid Ooze", H: "Poison Heal" },
		heightm: 0.9,
		weightkg: 29.9,
		color: "Purple",
		prevo: "Shellos-Aevium-West",
		evoLevel: 30,
		eggGroups: ["Water 1", "Amorphous"],
	},
	gastrodonaeviumeast: {
		num: 423,
		name: "Gastrodon-Aevium-East",
		baseSpecies: "Gastrodon",
		types: ["Ground", "Fairy"],
		baseStats: { hp: 118, atk: 83, def: 68, spa: 92, spd: 82, spe: 39 },
		abilities: { 0: "Storm Drain", 1: "Liquid Ooze", H: "Flare Boost" },
		heightm: 0.9,
		weightkg: 29.9,
		color: "Purple",
		prevo: "Shellos-Aevium-East",
		evoLevel: 30,
		eggGroups: ["Water 1", "Amorphous"],
	},
	ambipom: {
		inherit: true,
	},
	drifloon: {
		inherit: true,
	},
	drifblim: {
		inherit: true,
	},
	buneary: {
		inherit: true,
	},
	lopunny: {
		inherit: true,
	},
	lopunnymega: {
		inherit: true,
	},
	mismagius: {
		inherit: true,
		otherFormes: ["Mismagius-Aevium"],
		formeOrder: ["Mismagius", "Mismagius-Aevium"],
	},
	mismagiusaevium: {
		num: 429,
		name: "Mismagius-Aevium",
		baseSpecies: "Mismagius",
		forme: "Aevium",
		types: ["Grass", "Ghost"],
		baseStats: { hp: 60, atk: 105, def: 60, spa: 105, spd: 60, spe: 105 },
		abilities: { 0: "Magic Bounce", 1: "Poison Point", H: "Tangling Hair" },
		heightm: 0.9,
		weightkg: 4.4,
		color: "Green",
		prevo: "Misdreavus-Aevium",
		evoType: "useItem",
		evoItem: "Leaf Stone",
		eggGroups: ["Amorphous"],
	},
	honchkrow: {
		inherit: true,
	},
	glameow: {
		inherit: true,
	},
	purugly: {
		inherit: true,
	},
	chingling: {
		inherit: true,
	},
	stunky: {
		inherit: true,
	},
	skuntank: {
		inherit: true,
	},
	bronzor: {
		inherit: true,
		otherFormes: ["Bronzor-Aevium"],
		formeOrder: ["Bronzor", "Bronzor-Aevium"],
	},
	bronzoraevium: {
		num: 436,
		name: "Bronzor-Aevium",
		baseSpecies: "Bronzor",
		forme: "Aevium",
		types: ["Steel"],
		gender: "N",
		baseStats: { hp: 57, atk: 24, def: 86, spa: 24, spd: 86, spe: 23 },
		abilities: { 0: "Reflector" },
		heightm: 0.5,
		weightkg: 60.5,
		color: "Gray",
		evos: ["Bronzong-Aevium"],
		eggGroups: ["Mineral"],
	},
	bronzong: {
		inherit: true,
		otherFormes: ["Bronzong-Aevium"],
		formeOrder: ["Bronzong", "Bronzong-Aevium"],
	},
	bronzongaevium: {
		num: 437,
		name: "Bronzong-Aevium",
		baseSpecies: "Bronzong",
		forme: "Aevium",
		types: ["Steel"],
		gender: "N",
		baseStats: { hp: 67, atk: 79, def: 116, spa: 89, spd: 116, spe: 33 },
		abilities: { 0: "Reflector" },
		heightm: 1.3,
		weightkg: 187,
		color: "Gray",
		prevo: "Bronzor-Aevium",
		evoLevel: 33,
		eggGroups: ["Mineral"],
	},
	bonsly: {
		inherit: true,
	},
	mimejr: {
		inherit: true,
	},
	happiny: {
		inherit: true,
	},
	chatot: {
		inherit: true,
	},
	spiritomb: {
		inherit: true,
	},
	gible: {
		inherit: true,
	},
	gabite: {
		inherit: true,
	},
	garchomp: {
		inherit: true,
	},
	garchompmega: {
		inherit: true,
	},
	garchompmegaz: {
		inherit: true,
	},
	munchlax: {
		inherit: true,
	},
	riolu: {
		inherit: true,
	},
	lucario: {
		inherit: true,
	},
	lucariomega: {
		inherit: true,
	},
	lucariomegaz: {
		inherit: true,
	},
	hippopotas: {
		inherit: true,
	},
	hippowdon: {
		inherit: true,
	},
	skorupi: {
		inherit: true,
		otherFormes: ["Skorupi-Aevium"],
		formeOrder: ["Skorupi", "Skorupi-Aevium"],
	},
	skorupiaevium: {
		num: 451,
		name: "Skorupi-Aevium",
		baseSpecies: "Skorupi",
		forme: "Aevium",
		types: ["Ice", "Bug"],
		baseStats: { hp: 40, atk: 90, def: 50, spa: 30, spd: 55, spe: 65 },
		abilities: { 0: "Weak Armor", 1: "Poison Point", H: "Overcoat" },
		heightm: 0.8,
		weightkg: 12.8,
		color: "White",
		evos: ["Drapion-Aevium"],
		eggGroups: ["Bug", "Water 3"],
	},
	drapion: {
		inherit: true,
		otherFormes: ["Drapion-Aevium"],
		formeOrder: ["Drapion", "Drapion-Aevium"],
	},
	drapionaevium: {
		num: 452,
		name: "Drapion-Aevium",
		baseSpecies: "Drapion",
		forme: "Aevium",
		types: ["Ice", "Poison"],
		baseStats: { hp: 70, atk: 110, def: 90, spa: 60, spd: 75, spe: 95 },
		abilities: { 0: "Fur Coat", 1: "Merciless", H: "Overcoat" },
		heightm: 1.3,
		weightkg: 63.5,
		color: "White",
		prevo: "Skorupi-Aevium",
		evoLevel: 40,
		eggGroups: ["Bug", "Water 3"],
	},
	croagunk: {
		inherit: true,
	},
	toxicroak: {
		inherit: true,
	},
	carnivine: {
		inherit: true,
	},
	finneon: {
		inherit: true,
	},
	lumineon: {
		inherit: true,
	},
	mantyke: {
		inherit: true,
	},
	snover: {
		inherit: true,
	},
	abomasnow: {
		inherit: true,
	},
	abomasnowmega: {
		inherit: true,
	},
	weavile: {
		inherit: true,
	},
	magnezone: {
		inherit: true,
	},
	lickilicky: {
		inherit: true,
	},
	rhyperior: {
		inherit: true,
	},
	tangrowth: {
		inherit: true,
	},
	electivire: {
		inherit: true,
	},
	magmortar: {
		inherit: true,
	},
	togekiss: {
		inherit: true,
	},
	yanmega: {
		inherit: true,
	},
	leafeon: {
		inherit: true,
	},
	glaceon: {
		inherit: true,
	},
	gliscor: {
		inherit: true,
	},
	mamoswine: {
		inherit: true,
	},
	porygonz: {
		inherit: true,
	},
	gallade: {
		num: 475,
		inherit: true,
	},
	gallademega: {
		inherit: true,
	},
	probopass: {
		inherit: true,
	},
	dusknoir: {
		inherit: true,
	},
	froslass: {
		inherit: true,
		otherFormes: ["Froslass-Aevium", "Froslass-Mega"],
		formeOrder: ["Froslass", "Froslass-Aevium", "Froslass-Mega"],
	},
	froslassaevium: {
		num: 478,
		name: "Froslass-Aevium",
		baseSpecies: "Froslass",
		forme: "Aevium",
		types: ["Grass", "Water"],
		gender: "F",
		baseStats: { hp: 70, atk: 80, def: 70, spa: 80, spd: 70, spe: 110 },
		abilities: { 0: "Adaptability", H: "Gooey" },
		heightm: 1.3,
		weightkg: 26.6,
		color: "White",
		prevo: "Snorunt-Aevium",
		evoType: "useItem",
		evoItem: "Water Stone",
		eggGroups: ["Fairy", "Mineral"],
	},
	froslassmega: {
		inherit: true,
	},
	rotom: {
		inherit: true,
	},
	rotomheat: {
		inherit: true,
	},
	rotomwash: {
		inherit: true,
	},
	rotomfrost: {
		inherit: true,
	},
	rotomfan: {
		inherit: true,
	},
	rotommow: {
		inherit: true,
	},
	uxie: {
		inherit: true,
	},
	mesprit: {
		inherit: true,
	},
	azelf: {
		inherit: true,
	},
	dialga: {
		inherit: true,
	},
	dialgaorigin: {
		inherit: true,
	},
	palkia: {
		inherit: true,
	},
	palkiaorigin: {
		inherit: true,
	},
	heatran: {
		inherit: true,
	},
	heatranmega: {
		inherit: true,
	},
	regigigas: {
		inherit: true,
	},
	giratina: {
		inherit: true,
	},
	giratinaorigin: {
		inherit: true,
	},
	cresselia: {
		inherit: true,
	},
	phione: {
		inherit: true,
	},
	manaphy: {
		inherit: true,
	},
	darkrai: {
		inherit: true,
	},
	darkraimega: {
		inherit: true,
	},
	shaymin: {
		inherit: true,
	},
	shayminsky: {
		inherit: true,
	},
	arceus: {
		inherit: true,
	},
	arceusbug: {
		inherit: true,
	},
	arceusdark: {
		inherit: true,
	},
	arceusdragon: {
		inherit: true,
	},
	arceuselectric: {
		inherit: true,
	},
	arceusfairy: {
		inherit: true,
	},
	arceusfighting: {
		inherit: true,
	},
	arceusfire: {
		inherit: true,
	},
	arceusflying: {
		inherit: true,
	},
	arceusghost: {
		inherit: true,
	},
	arceusgrass: {
		inherit: true,
	},
	arceusground: {
		inherit: true,
	},
	arceusice: {
		inherit: true,
	},
	arceuspoison: {
		inherit: true,
	},
	arceuspsychic: {
		inherit: true,
	},
	arceusrock: {
		inherit: true,
	},
	arceussteel: {
		inherit: true,
	},
	arceuswater: {
		inherit: true,
	},
	victini: {
		inherit: true,
	},
	snivy: {
		inherit: true,
	},
	servine: {
		inherit: true,
	},
	serperior: {
		inherit: true,
	},
	tepig: {
		inherit: true,
	},
	pignite: {
		inherit: true,
	},
	emboar: {
		inherit: true,
	},
	emboarmega: {
		inherit: true,
	},
	oshawott: {
		inherit: true,
	},
	dewott: {
		inherit: true,
	},
	samurott: {
		inherit: true,
	},
	samurotthisui: {
		inherit: true,
	},
	patrat: {
		inherit: true,
	},
	watchog: {
		inherit: true,
	},
	lillipup: {
		inherit: true,
	},
	herdier: {
		inherit: true,
	},
	stoutland: {
		inherit: true,
	},
	purrloin: {
		inherit: true,
	},
	liepard: {
		inherit: true,
	},
	pansage: {
		inherit: true,
	},
	simisage: {
		inherit: true,
	},
	pansear: {
		inherit: true,
	},
	simisear: {
		inherit: true,
	},
	panpour: {
		inherit: true,
	},
	simipour: {
		inherit: true,
	},
	munna: {
		inherit: true,
		otherFormes: ["Munna-Aevium"],
		formeOrder: ["Munna", "Munna-Aevium"],
	},
	munnaaevium: {
		num: 517,
		name: "Munna-Aevium",
		baseSpecies: "Munna",
		forme: "Aevium",
		types: ["Dark", "Fairy"],
		baseStats: { hp: 76, atk: 67, def: 45, spa: 25, spd: 45, spe: 24 },
		abilities: { 0: "Bad Dreams", 1: "Shed Skin", H: "Tough Claws" },
		heightm: 0.6,
		weightkg: 23.3,
		color: "Black",
		evos: ["Musharna-Aevium"],
		eggGroups: ["Field"],
	},
	musharna: {
		inherit: true,
		otherFormes: ["Musharna-Aevium"],
		formeOrder: ["Musharna", "Musharna-Aevium"],
	},
	musharnaaevium: {
		num: 518,
		name: "Musharna-Aevium",
		baseSpecies: "Musharna",
		forme: "Aevium",
		types: ["Dark", "Fairy"],
		baseStats: { hp: 116, atk: 107, def: 85, spa: 65, spd: 85, spe: 29 },
		abilities: { 0: "Bad Dreams", 1: "Shed Skin", H: "Tough Claws" },
		heightm: 1.1,
		weightkg: 60.5,
		color: "Black",
		prevo: "Munna-Aevium",
		evoType: "useItem",
		evoItem: "Moon Stone",
		eggGroups: ["Field"],
	},
	pidove: {
		inherit: true,
		otherFormes: ["Pidove-Aevium"],
		formeOrder: ["Pidove", "Pidove-Aevium"],
	},
	pidoveaevium: {
		num: 519,
		name: "Pidove-Aevium",
		baseSpecies: "Pidove",
		forme: "Aevium",
		types: ["Rock"],
		baseStats: { hp: 50, atk: 55, def: 60, spa: 26, spd: 30, spe: 43 },
		abilities: { 0: "Clear Body", 1: "Sturdy", H: "Oblivious" },
		heightm: 0.3,
		weightkg: 2.1,
		color: "Brown",
		evos: ["Tranquill-Aevium"],
		eggGroups: ["Flying"],
	},
	tranquill: {
		inherit: true,
		otherFormes: ["Tranquill-Aevium"],
		formeOrder: ["Tranquill", "Tranquill-Aevium"],
	},
	tranquillaevium: {
		num: 520,
		name: "Tranquill-Aevium",
		baseSpecies: "Tranquill",
		forme: "Aevium",
		types: ["Rock", "Fighting"],
		baseStats: { hp: 62, atk: 77, def: 67, spa: 40, spd: 42, spe: 70 },
		abilities: { 0: "Clear Body", 1: "Sturdy", H: "Oblivious" },
		heightm: 0.6,
		weightkg: 15,
		color: "Brown",
		prevo: "Pidove-Aevium",
		evoLevel: 21,
		evos: ["Unfezant-Aevium"],
		eggGroups: ["Flying"],
	},
	unfezant: {
		inherit: true,
		otherFormes: ["Unfezant-Aevium"],
		formeOrder: ["Unfezant", "Unfezant-Aevium"]
	},
	unfezantaevium: {
		num: 521,
		name: "Unfezant-Aevium",
		baseSpecies: "Unfezant",
		forme: "Aevium",
		types: ["Rock", "Fighting"],
		baseStats: { hp: 80, atk: 115, def: 85, spa: 55, spd: 55, spe: 98 },
		abilities: { 0: "Defiant", 1: "Sturdy", H: "Rock Head" },
		heightm: 1.2,
		weightkg: 29,
		color: "Brown",
		prevo: "Tranquill-Aevium",
		evoLevel: 32,
		eggGroups: ["Flying"],
	},
	blitzle: {
		inherit: true,
	},
	zebstrika: {
		inherit: true,
	},
	roggenrola: {
		inherit: true,
	},
	boldore: {
		inherit: true,
	},
	gigalith: {
		inherit: true,
	},
	woobat: {
		inherit: true,
	},
	swoobat: {
		inherit: true,
	},
	drilbur: {
		inherit: true,
	},
	excadrill: {
		inherit: true,
	},
	excadrillmega: {
		inherit: true,
	},
	audino: {
		inherit: true,
	},
	audinomega: {
		inherit: true,
	},
	timburr: {
		inherit: true,
	},
	gurdurr: {
		inherit: true,
	},
	conkeldurr: {
		inherit: true,
	},
	tympole: {
		inherit: true,
	},
	palpitoad: {
		inherit: true,
	},
	seismitoad: {
		inherit: true,
	},
	throh: {
		inherit: true,
	},
	sawk: {
		inherit: true,
	},
	sewaddle: {
		inherit: true,
		otherFormes: ["Sewaddle-Aevium"],
		formeOrder: ["Sewaddle", "Sewaddle-Aevium"]
	},
	sewaddleaevium: {
		num: 540,
		name: "Sewaddle-Aevium",
		baseSpecies: "Sewaddle",
		forme: "Aevium",
		types: ["Bug", "Dragon"],
		baseStats: { hp: 45, atk: 63, def: 65, spa: 40, spd: 55, spe: 42 },
		abilities: { 0: "Swarm", 1: "Unnerve", H: "Intimidate" },
		heightm: 0.3,
		weightkg: 2.5,
		color: "Yellow",
		evos: ["Swadloon-Aevium"],
		eggGroups: ["Bug"],
	},
	swadloon: {
		inherit: true,
		otherFormes: ["Swadloon-Aevium"],
		formeOrder: ["Swadloon", "Swadloon-Aevium"],
	},
	swadloonaevium: {
		num: 541,
		name: "Swadloon-Aevium",
		baseSpecies: "Swadloon",
		forme: "Aevium",
		types: ["Bug", "Dragon"],
		baseStats: { hp: 55, atk: 73, def: 85, spa: 50, spd: 75, spe: 42 },
		abilities: { 0: "Swarm", 1: "Unnerve", H: "Intimidate" },
		heightm: 0.5,
		weightkg: 7.3,
		color: "Green",
		prevo: "Sewaddle-Aevium",
		evos: ["Leavanny-Aevium"],
		eggGroups: ["Bug"],
	},
	leavanny: {
		inherit: true,
		otherFormes: ["Leavanny-Aevium"],
		formeOrder: ["Leavanny", "Leavanny-Aevium"]
	},
	leavannyaevium: {
		num: 542,
		name: "Leavanny-Aevium",
		baseSpecies: "Leavanny",
		forme: "Aevium",
		types: ["Bug", "Dragon"],
		baseStats: { hp: 75, atk: 108, def: 75, spa: 70, spd: 75, spe: 97 },
		abilities: { 0: "Swarm", 1: "Unnerve", H: "Intimidate" },
		heightm: 1.2,
		weightkg: 20.5,
		color: "Red",
		prevo: "Swadloon-Aevium",
		evoType: "levelMove",
		evoMove: "Dragon Claw",
		eggGroups: ["Bug"],
	},
	venipede: {
		inherit: true,
	},
	whirlipede: {
		inherit: true,
	},
	scolipede: {
		inherit: true,
	},
	scolipedemega: {
		inherit: true,
	},
	cottonee: {
		inherit: true,
	},
	whimsicott: {
		inherit: true,
	},
	petilil: {
		inherit: true,
	},
	lilligant: {
		inherit: true,
	},
	lilliganthisui: {
		inherit: true,
	},
	basculin: {
		inherit: true,
	},
	basculinbluestriped: {
		inherit: true,
	},
	basculinwhitestriped: {
		inherit: true,
	},
	sandile: {
		inherit: true,
	},
	krokorok: {
		inherit: true,
	},
	krookodile: {
		inherit: true,
	},
	darumaka: {
		inherit: true,
	},
	darumakagalar: {
		inherit: true,
	},
	darmanitan: {
		inherit: true,
	},
	darmanitanzen: {
		inherit: true,
	},
	darmanitangalar: {
		inherit: true,
	},
	darmanitangalarzen: {
		inherit: true,
	},
	maractus: {
		inherit: true,
	},
	dwebble: {
		inherit: true,
	},
	crustle: {
		inherit: true,
	},
	scraggy: {
		inherit: true,
	},
	scrafty: {
		inherit: true,
	},
	scraftymega: {
		inherit: true,
	},
	sigilyph: {
		inherit: true,
		otherFormes: ["Sigilyph-Aevium"],
		formeOrder: ["Sigilyph", "Sigilyph-Aevium"]
	},
	sigilyphaevium: {
		num: 561,
		name: "Sigilyph-Aevium",
		baseSpecies: "Sigilyph",
		forme: "Aevium",
		types: ["Fairy", "Ghost"],
		baseStats: { hp: 72, atk: 58, def: 80, spa: 103, spd: 80, spe: 97 },
		abilities: { 0: "Flare Boost", 1: "Magic Guard", H: "Tinted Lens" },
		heightm: 1.4,
		weightkg: 14,
		color: "Black",
		eggGroups: ["Flying"],
	},
	yamask: {
		inherit: true,
	},
	yamaskgalar: {
		inherit: true,
	},
	cofagrigus: {
		inherit: true,
	},
	tirtouga: {
		inherit: true,
	},
	carracosta: {
		inherit: true,
	},
	archen: {
		inherit: true,
	},
	archeops: {
		inherit: true,
	},
	trubbish: {
		inherit: true,
	},
	garbodor: {
		inherit: true,
		otherFormes: ["Garbodor-giga"],
		formeOrder: ["Garbodor", "Garbodor-giga"],
		canGigantamax: undefined,
	},
	// garbodorgiga: {
	// },
	zorua: {
		inherit: true,
	},
	zoruahisui: {
		inherit: true,
	},
	zoroark: {
		inherit: true,
	},
	zoroarkhisui: {
		inherit: true,
	},
	minccino: {
		inherit: true,
	},
	cinccino: {
		inherit: true,
	},
	gothita: {
		inherit: true,
	},
	gothorita: {
		inherit: true,
	},
	gothitelle: {
		inherit: true,
	},
	solosis: {
		inherit: true,
	},
	duosion: {
		inherit: true,
	},
	reuniclus: {
		inherit: true,
	},
	ducklett: {
		inherit: true,
	},
	swanna: {
		inherit: true,
	},
	vanillite: {
		inherit: true,
	},
	vanillish: {
		inherit: true,
	},
	vanilluxe: {
		inherit: true,
	},
	deerling: {
		inherit: true,
	},
	deerlingsummer: {
		inherit: true,
	},
	deerlingautumn: {
		inherit: true,
	},
	deerlingwinter: {
		inherit: true,
	},
	sawsbuck: {
		inherit: true,
	},
	emolga: {
		inherit: true,
	},
	karrablast: {
		inherit: true,
	},
	escavalier: {
		inherit: true,
	},
	foongus: {
		inherit: true,
	},
	amoonguss: {
		inherit: true,
	},
	frillish: {
		inherit: true,
	},
	jellicent: {
		inherit: true,
	},
	alomomola: {
		inherit: true,
	},
	joltik: {
		inherit: true,
	},
	galvantula: {
		inherit: true,
	},
	ferroseed: {
		inherit: true,
	},
	ferrothorn: {
		inherit: true,
	},
	klink: {
		inherit: true,
	},
	klang: {
		inherit: true,
	},
	klinklang: {
		inherit: true,
	},
	tynamo: {
		inherit: true,
	},
	eelektrik: {
		inherit: true,
	},
	eelektross: {
		inherit: true,
	},
	eelektrossmega: {
		inherit: true,
	},
	elgyem: {
		inherit: true,
	},
	beheeyem: {
		inherit: true,
	},
	litwick: {
		inherit: true,
		otherFormes: ["Litwick-Aevium"],
		formeOrder: ["Litwick", "Litwick-Aevium"],
	},
	litwickaevium: {
		num: 607,
		name: "Litwick-Aevium",
		baseSpecies: "Litwick",
		forme: "Aevium",
		types: ["Ghost", "Fire"],
		baseStats: { hp: 50, atk: 35, def: 55, spa: 65, spd: 55, spe: 20 },
		abilities: { 0: "Illuminate", 1: "Flash Fire", H: "Infiltrator" },
		heightm: 0.3,
		weightkg: 3.1,
		color: "White",
		evos: ["Lampent-Aevium"],
		eggGroups: ["Amorphous"],
	},
	lampent: {
		inherit: true,
		otherFormes: ["Lampent-Aevium"],
		formeOrder: ["Lampent", "Lampent-Aevium"],
	},
	lampentaevium: {
		num: 608,
		name: "Lampent-Aevium",
		baseSpecies: "Lampent",
		forme: "Aevium",
		types: ["Ghost", "Electric"],
		baseStats: { hp: 60, atk: 40, def: 60, spa: 95, spd: 60, spe: 55 },
		abilities: { 0: "Illuminate", 1: "Volt Absorb", H: "Levitate" },
		heightm: 0.6,
		weightkg: 13,
		color: "Black",
		prevo: "Litwick-Aevium",
		evoType: "levelMove",
		evoMove: "Zap Cannon",
		evos: ["Chandelure-Aevium"],
		eggGroups: ["Amorphous"],
	},
	chandelure: {
		inherit: true,
		otherFormes: ["Chandelure-Aevium", "Chandelure-Mega"],
		formeOrder: ["Chandelure", "Chandelure-Aevium", "Chandelure-Mega"],
	},
	chandelureaevium: {
		num: 609,
		name: "Chandelure-Aevium",
		baseSpecies: "Chandelure",
		forme: "Aevium",
		types: ["Ghost", "Electric"],
		baseStats: { hp: 65, atk: 55, def: 90, spa: 145, spd: 90, spe: 80 },
		abilities: { 0: "Illuminate", 1: "Volt Absorb", H: "Levitate" },
		heightm: 1,
		weightkg: 34.3,
		color: "Black",
		prevo: "Lampent",
		evoType: "useItem",
		evoItem: "Thunder Stone",
		eggGroups: ["Amorphous"],
	},
	chandeluremega: {
		inherit: true,
	},
	axew: {
		inherit: true,
	},
	fraxure: {
		inherit: true,
	},
	haxorus: {
		inherit: true,
	},
	cubchoo: {
		inherit: true,
	},
	beartic: {
		inherit: true,
	},
	cryogonal: {
		inherit: true,
	},
	shelmet: {
		inherit: true,
	},
	accelgor: {
		inherit: true,
	},
	stunfisk: {
		inherit: true,
	},
	stunfiskgalar: {
		inherit: true,
	},
	mienfoo: {
		inherit: true,
	},
	mienshao: {
		inherit: true,
	},
	druddigon: {
		inherit: true,
	},
	golett: {
		inherit: true,
	},
	golurk: {
		inherit: true,
	},
	golurkmega: {
		inherit: true,
	},
	pawniard: {
		inherit: true,
	},
	bisharp: {
		inherit: true,
	},
	bouffalant: {
		inherit: true,
	},
	rufflet: {
		inherit: true,
	},
	braviary: {
		inherit: true,
	},
	braviaryhisui: {
		inherit: true,
	},
	vullaby: {
		inherit: true,
	},
	mandibuzz: {
		inherit: true,
	},
	heatmor: {
		inherit: true,
	},
	durant: {
		inherit: true,
	},
	deino: {
		inherit: true,
	},
	zweilous: {
		inherit: true,
	},
	hydreigon: {
		inherit: true,
	},
	larvesta: {
		inherit: true,
		otherFormes: ["Larvesta-Aevium"],
		formeOrder: ["Larvesta", "Larvesta-Aevium"],
	},
	larvestaaevium: {
		num: 636,
		name: "Larvesta-Aevium",
		baseSpecies: "Larvesta",
		forme: "Aevium",
		types: ["Flying"],
		baseStats: { hp: 55, atk: 85, def: 50, spa: 50, spd: 50, spe: 70 },
		abilities: { 0: "Wonder Skin", H: "Unnerve" },
		heightm: 1.1,
		weightkg: 28.8,
		color: "White",
		evos: ["Volcarona-Aevium"],
		eggGroups: ["Bug"],
	},
	volcarona: {
		inherit: true,
		otherFormes: ["Volcarona-Aevium"],
		formeOrder: ["Volcarona", "Volcarona-Aevium"],
	},
	volcaronaaevium: {
		num: 637,
		name: "Volcarona-Aevium",
		baseSpecies: "Volcarona",
		forme: "Aevium",
		types: ["Flying"],
		baseStats: { hp: 85, atk: 60, def: 60, spa: 135, spd: 100, spe: 110 },
		abilities: { 0: "Shield Dust", H: "Pressure" },
		heightm: 1.6,
		weightkg: 46,
		color: "White",
		prevo: "Larvesta-Aevium",
		evoLevel: 59,
		eggGroups: ["Bug"],
	},
	cobalion: {
		inherit: true,
	},
	terrakion: {
		inherit: true,
	},
	virizion: {
		inherit: true,
	},
	tornadus: {
		inherit: true,
	},
	tornadustherian: {
		inherit: true,
	},
	thundurus: {
		inherit: true,
	},
	thundurustherian: {
		inherit: true,
	},
	reshiram: {
		inherit: true,
	},
	zekrom: {
		inherit: true,
	},
	landorus: {
		inherit: true,
	},
	landorustherian: {
		inherit: true,
	},
	kyurem: {
		inherit: true,
	},
	kyuremblack: {
		inherit: true,
	},
	kyuremwhite: {
		inherit: true,
	},
	keldeo: {
		inherit: true,
	},
	keldeoresolute: {
		inherit: true,
	},
	meloetta: {
		inherit: true,
	},
	meloettapirouette: {
		inherit: true,
	},
	genesect: {
		inherit: true,
	},
	genesectdouse: {
		inherit: true,
	},
	genesectshock: {
		inherit: true,
	},
	genesectburn: {
		inherit: true,
	},
	genesectchill: {
		inherit: true,
	},
	chespin: {
		inherit: true,
	},
	quilladin: {
		inherit: true,
	},
	chesnaught: {
		inherit: true,
	},
	chesnaughtmega: {
		inherit: true,
	},
	fennekin: {
		inherit: true,
	},
	braixen: {
		inherit: true,
	},
	delphox: {
		inherit: true,
	},
	delphoxmega: {
		inherit: true,
	},
	froakie: {
		inherit: true,
	},
	frogadier: {
		inherit: true,
	},
	greninja: {
		inherit: true,
		otherFormes: ["Greninja-Mega"],
		formeOrder: ["Greninja", "Greninja-Mega"],
	},
	greninjamega: {
		inherit: true,
	},
	bunnelby: {
		inherit: true,
	},
	diggersby: {
		inherit: true,
	},
	fletchling: {
		inherit: true,
	},
	fletchinder: {
		inherit: true,
	},
	talonflame: {
		inherit: true,
	},
	scatterbug: {
		inherit: true,
	},
	spewpa: {
		inherit: true,
	},
	vivillon: {
		inherit: true,
		baseForme: "Astral", // TODO: actual base forme is Icy Snow, not Meadow
		cosmeticFormes: ["Vivillon-Dream", "Vivillon-Tropics", "Vivillon-Radiant", "Vivillon-Snowy", "Vivillon-Spotted", "Vivillon-Garufan", "Vivillon-Sinister", "Vivillon-Celebratory", "Vivillon-Poilethal", "Vivillon-Butterfly-Of-Fate"],
		formeOrder: [
			"Vivillon", // Astral
			"Vivillon-Dream",
			"Vivillon-Tropics",
			"Vivillon-Radiant",
			"Vivillon-Snowy",
			"Vivillon-Spotted",
			"Vivillon-Garufan",
			"Vivillon-Sinister",
			"Vivillon-Celebratory",
			"Vivillon-Poilethal",
			"Vivillon-Butterfly-Of-Fate",
		],
	},
	vivillondream: {
		isCosmeticForme: true,
		name: "Vivillon-Dream",
		baseSpecies: "Vivillon",
		forme: "Dream",
		color: "White",
	},
	vivillontropics: {
		isCosmeticForme: true,
		name: "Vivillon-Tropics",
		baseSpecies: "Vivillon",
		forme: "Tropics",
		color: "Yellow",
	},
	vivillonradiant: {
		isCosmeticForme: true,
		name: "Vivillon-Radiant",
		baseSpecies: "Vivillon",
		forme: "Radiant",
		color: "Yellow",
	},
	vivillonsnowy: {
		isCosmeticForme: true,
		name: "Vivillon-Snowy",
		baseSpecies: "Vivillon",
		forme: "Snowy",
		color: "White",
	},
	vivillonspotted: {
		isCosmeticForme: true,
		name: "Vivillon-Spotted",
		baseSpecies: "Vivillon",
		forme: "Spotted",
		color: "White",
	},
	vivillongarufan: {
		isCosmeticForme: true,
		name: "Vivillon-Garufan",
		baseSpecies: "Vivillon",
		forme: "Garufan",
		color: "White",
	},
	vivillonsinister: {
		isCosmeticForme: true,
		name: "Vivillon-Sinister",
		baseSpecies: "Vivillon",
		forme: "Sinister",
		color: "Black",
	},
	vivilloncelebratory: {
		isCosmeticForme: true,
		name: "Vivillon-Celebratory",
		baseSpecies: "Vivillon",
		forme: "Celebratory",
		color: "White",
	},
	vivillonpoilethal: {
		isCosmeticForme: true,
		name: "Vivillon-Poilethal",
		baseSpecies: "Vivillon",
		forme: "Poilethal",
		color: "Black",
	},
	vivillonbutterflyoffate: {
		isCosmeticForme: true,
		name: "Vivillon-Butterfly-Of-Fate",
		baseSpecies: "Vivillon",
		forme: "Butterfly-Of-Fate",
		color: "White",
	},
	litleo: {
		inherit: true,
	},
	pyroar: {
		inherit: true,
	},
	pyroarmega: {
		inherit: true,
	},
	flabebe: {
		inherit: true,
		cosmeticFormes: ["Flabe\u0301be\u0301-Blue", "Flabe\u0301be\u0301-Black", "Flabe\u0301be\u0301-Green", "Flabe\u0301be\u0301-Purple"],
		formeOrder: ["Flabe\u0301be\u0301", "Flabe\u0301be\u0301-Blue", "Flabe\u0301be\u0301-Black", "Flabe\u0301be\u0301-Green", "Flabe\u0301be\u0301-Purple"],
	},
	floette: {
		inherit: true,
		cosmeticFormes: ["Floette-Blue", "Floette-Black", "Floette-Green", "Floette-Purple"],
		formeOrder: ["Floette", "Floette-Blue", "Floette-Black", "Floette-Green", "Floette-Purple", "Floette-Eternal", "Floette-Mega"],
	},
	floetteeternal: {
		inherit: true,
	},
	floettemega: {
		inherit: true,
	},
	florges: {
		inherit: true,
		cosmeticFormes: ["Florges-Blue", "Florges-Black", "Florges-Green", "Florges-Purple"],
		otherFormes: ["Florges-Reborn-Flower"],
		formeOrder: ["Florges", "Florges-Blue", "Florges-Black", "Florges-Green", "Florges-Purple", "Florges-Reborn-Flower"],
	},
	florgesrebornflower: {
		num: 671,
		name: "Florges-Reborn-Flower",
		baseForme: "Florges",
		forme: "Reborn-Flower",
		types: ["Fairy", "Fire"],
		gender: "F",
		baseStats: { hp: 77, atk: 64, def: 67, spa: 111, spd: 159, spe: 71 },
		abilities: { 0: "Invigorate", H: "Symbiosis" },
		heightm: 1.1,
		weightkg: 10,
		color: "White",
		prevo: "Floette",
		evoType: "useItem",
		evoItem: "Reborn Flower",
		eggGroups: ["Fairy"],
	},
	skiddo: {
		inherit: true,
	},
	gogoat: {
		inherit: true,
	},
	pancham: {
		inherit: true,
	},
	pangoro: {
		inherit: true,
	},
	furfrou: {
		inherit: true,
		cosmeticFormes: ["Furfrou-Star", "Furfrou-Heart", "Furfrou-Pharaoh", "Furfrou-Matron", "Furfrou-Dandy", "Furfrou-Kabuki", "Furfrou-La Reine", "Furfrou-Debutante", "Furfrou-Diamond",],
		formeOrder: [
			"Furfrou",
			"Furfrou-Star",
			"Furfrou-Heart",
			"Furfrou-Pharaoh",
			"Furfrou-Matron",
			"Furfrou-Dandy",
			"Furfrou-Kabuki",
			"Furfrou-La Reine",
			"Furfrou-Debutante",
			"Furfrou-Diamond",
		],
	},
	espurr: {
		inherit: true,
	},
	meowstic: {
		inherit: true,
	},
	meowsticf: {
		inherit: true,
	},
	meowsticmmega: {
		inherit: true,
	},
	meowsticfmega: {
		inherit: true,
	},
	honedge: {
		inherit: true,
	},
	doublade: {
		inherit: true,
	},
	aegislash: {
		inherit: true,
	},
	aegislashblade: {
		inherit: true,
	},
	spritzee: {
		inherit: true,
	},
	aromatisse: {
		inherit: true,
	},
	swirlix: {
		inherit: true,
	},
	slurpuff: {
		inherit: true,
	},
	inkay: {
		inherit: true,
	},
	malamar: {
		inherit: true,
	},
	malamarmega: {
		inherit: true,
	},
	binacle: {
		inherit: true,
	},
	barbaracle: {
		inherit: true,
	},
	barbaraclemega: {
		inherit: true,
	},
	skrelp: {
		inherit: true,
	},
	dragalge: {
		inherit: true,
	},
	dragalgemega: {
		inherit: true,
	},
	clauncher: {
		inherit: true,
	},
	clawitzer: {
		inherit: true,
	},
	helioptile: {
		inherit: true,
	},
	heliolisk: {
		inherit: true,
	},
	tyrunt: {
		inherit: true,
	},
	tyrantrum: {
		inherit: true,
	},
	amaura: {
		inherit: true,
	},
	aurorus: {
		inherit: true,
	},
	sylveon: {
		inherit: true,
	},
	hawlucha: {
		inherit: true,
	},
	hawluchamega: {
		inherit: true,
	},
	dedenne: {
		inherit: true,
	},
	carbink: {
		inherit: true,
	},
	goomy: {
		inherit: true,
	},
	sliggoo: {
		inherit: true,
	},
	sliggoohisui: {
		inherit: true,
	},
	goodra: {
		inherit: true,
	},
	goodrahisui: {
		inherit: true,
	},
	klefki: {
		inherit: true,
	},
	phantump: {
		inherit: true,
	},
	trevenant: {
		inherit: true,
	},
	pumpkaboo: {
		inherit: true,
		baseForme: "Small",
		baseStats: { hp: 44, atk: 66, def: 70, spa: 44, spd: 55, spe: 56 },
		heightm: 0.3,
		weightkg: 3.5,
		otherFormes: ["Pumpkaboo-Jumbo"],
		formeOrder: ["Pumpkaboo", "Jumbo"],
	},
	pumpkabojumbo: {
		num: 710,
		name: "Pumpkaboo-Jumbo",
		baseSpecies: "Pumpkaboo",
		forme: "Jumbo",
		types: ["Ghost", "Grass"],
		baseStats: { hp: 59, atk: 66, def: 70, spa: 44, spd: 55, spe: 41 },
		abilities: { 0: "Pickup", 1: "Frisk", H: "Insomnia" },
		heightm: 0.8,
		weightkg: 15,
		color: "Brown",
		evos: ["Gourgeist-Super"],
		eggGroups: ["Amorphous"],
	},
	gourgeist: {
		inherit: true,
		baseForme: "Small",
		baseStats: { hp: 55, atk: 85, def: 122, spa: 58, spd: 75, spe: 99 },
		heightm: 0.7,
		weightkg: 9.5,
		otherFormes: ["Gourgeist-Jumbo"],
		formeOrder: ["Gourgeist", "Gourgeist-Jumbo"],
	},
	gourgeistjumbo: {
		num: 711,
		name: "Gourgeist-Jumbo",
		baseSpecies: "Gourgeist",
		forme: "Jumbo",
		types: ["Ghost", "Grass"],
		baseStats: { hp: 85, atk: 100, def: 122, spa: 58, spd: 75, spe: 54 },
		abilities: { 0: "Pickup", 1: "Frisk", H: "Insomnia" },
		heightm: 1.7,
		weightkg: 39,
		color: "Brown",
		prevo: "Pumpkaboo-Jumbo",
		evoType: "trade",
		eggGroups: ["Amorphous"],
	},
	bergmite: {
		inherit: true,
	},
	avalugg: {
		inherit: true,
	},
	avalugghisui: {
		inherit: true,
	},
	noibat: {
		inherit: true,
	},
	noivern: {
		inherit: true,
	},
	xerneas: {
		inherit: true,
	},
	xerneasneutral: {
		inherit: true,
	},
	yveltal: {
		inherit: true,
	},
	zygarde: {
		inherit: true,
	},
	zygarde10: {
		inherit: true,
	},
	zygardecomplete: {
		inherit: true,
	},
	zygardemega: {
		inherit: true,
	},
	diancie: {
		inherit: true,
	},
	dianciemega: {
		inherit: true,
	},
	hoopa: {
		inherit: true,
	},
	hoopaunbound: {
		inherit: true,
	},
	volcanion: {
		inherit: true,
	},
	rowlet: {
		inherit: true,
	},
	dartrix: {
		inherit: true,
	},
	decidueye: {
		inherit: true,
	},
	decidueyehisui: {
		inherit: true,
	},
	litten: {
		inherit: true,
	},
	torracat: {
		inherit: true,
	},
	incineroar: {
		inherit: true,
	},
	popplio: {
		inherit: true,
	},
	brionne: {
		inherit: true,
	},
	primarina: {
		inherit: true,
	},
	pikipek: {
		inherit: true,
	},
	trumbeak: {
		inherit: true,
	},
	toucannon: {
		inherit: true,
	},
	yungoos: {
		inherit: true,
	},
	gumshoos: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	grubbin: {
		inherit: true,
	},
	charjabug: {
		inherit: true,
	},
	vikavolt: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	crabrawler: {
		inherit: true,
	},
	crabominable: {
		inherit: true,
	},
	crabominablemega: {
		inherit: true,
	},
	oricorio: {
		inherit: true,
	},
	oricoriopompom: {
		inherit: true,
	},
	oricoriopau: {
		inherit: true,
	},
	oricoriosensu: {
		inherit: true,
	},
	cutiefly: {
		inherit: true,
	},
	ribombee: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	rockruff: {
		inherit: true,
		baseForme: undefined,
		abilities: { 0: "Keen Eye", 1: "Vital Spirit", H: "Steadfast"},
		evos: ["Lycanroc", "Lycanroc-Midnight", "Lycanroc-Dusk"],
		otherFormes: undefined,
		formeOrder: undefined,
	},
	lycanroc: {
		inherit: true,
	},
	lycanrocmidnight: {
		inherit: true,
	},
	lycanrocdusk: {
		inherit: true,
		prevo: "Rockruff",
	},
	wishiwashi: {
		inherit: true,
	},
	wishiwashischool: {
		inherit: true,
	},
	mareanie: {
		inherit: true,
	},
	toxapex: {
		inherit: true,
	},
	mudbray: {
		inherit: true,
	},
	mudsdale: {
		inherit: true,
	},
	dewpider: {
		inherit: true,
	},
	araquanid: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	fomantis: {
		inherit: true,
	},
	lurantis: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined
	},
	morelull: {
		inherit: true,
	},
	shiinotic: {
		inherit: true,
	},
	salandit: {
		inherit: true,
	},
	salazzle: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	stufful: {
		inherit: true,
	},
	bewear: {
		inherit: true,
	},
	bounsweet: {
		inherit: true,
	},
	steenee: {
		inherit: true,
	},
	tsareena: {
		inherit: true,
	},
	comfey: {
		inherit: true,
	},
	oranguru: {
		inherit: true,
	},
	passimian: {
		inherit: true,
	},
	wimpod: {
		inherit: true,
		otherFormes: ["Wimpod-Aevium"],
		formeOrder: ["Wimpod", "Wimpod-Aevium"]
	},
	wimpodaevium: {
		num: 767,
		name: "Wimpod-Aevium",
		baseSpecies: "Wimpod",
		forme: "Aevium",
		types: ["Bug", "Ground"],
		baseStats: { hp: 25, atk: 40, def: 35, spa: 15, spd: 35, spe: 80 },
		abilities: { 0: "Wimp Out" , 1: "Rattled", H: "Sand Veil"},
		heightm: 0.5,
		weightkg: 12,
		color: "Gray",
		evos: ["Golisopod-Aevium"],
		eggGroups: ["Bug", "Water 3"],
	},
	golisopod: {
		inherit: true,
		otherFormes: ["Golisopod-Aevium", "Golisopod-Mega"],
		formeOrder: ["Golisopod", "Golisopod-Aevium", "Golisopod-Mega"],
	},
	golisopodaevium: {
		num: 768,
		name: "Golisopod-Aevium",
		baseSpecies: "Golisopod",
		forme: "Aevium",
		types: ["Bug", "Ground"],
		baseStats: { hp: 75, atk: 125, def: 140, spa: 60, spd: 90, spe: 40 },
		abilities: { 0: "Battle Armour" , 1: "Skill Link", H: "Sand Veil"},
		heightm: 2,
		weightkg: 108,
		color: "Gray",
		prevo: "Wimpod-Aevium",
		evoLevel: 30,
		eggGroups: ["Bug", "Water 3"],
	},
	golisopodmega: {
		inherit: true,
	},
	sandygast: {
		inherit: true,
		otherFormes: ["Sandygast-Aevium-Rocky", "Sandygast-Aevium-Fiery", "Sandygast-Aevium-Icy"],
		formeOrder: ["Sandygast", "Sandygast-Aevium-Rocky", "Sandygast-Aevium-Fiery", "Sandygast-Aevium-Icy"],
	},
	sandygastaeviumrocky: {
		num: 769,
		name: "Sandygast-Aevium-Rocky",
		baseSpecies: "Sandygast",
		forme: "Aevium-Rocky",
		types: ["Ghost", "Rock"],
		baseStats: { hp: 55, atk: 55, def: 80, spa: 70, spd: 45, spe: 15 },
		abilities: { 0: "Clear Body", H: "Storm Drain" },
		heightm: 0.5,
		weightkg: 70,
		color: "Brown",
		evos: ["Palossand-Aevium-Rocky"],
		eggGroups: ["Amorphous"],
	},
	sandygastaeviumfiery: {
		num: 769,
		name: "Sandygast-Aevium-Fiery",
		baseSpecies: "Sandygast",
		forme: "Aevium-Fiery",
		types: ["Ghost", "Fire"],
		baseStats: { hp: 55, atk: 55, def: 80, spa: 70, spd: 45, spe: 15 },
		abilities: { 0: "Flame Body", H: "Steam Engine" },
		heightm: 0.5,
		weightkg: 70,
		color: "Brown",
		evos: ["Palossand-Aevium-Fiery"],
		eggGroups: ["Amorphous"],
	},
	sandygastaeviumicy: {
		num: 769,
		name: "Sandygast-Aevium-Icy",
		baseSpecies: "Sandygast",
		forme: "Aevium-Icy",
		types: ["Ghost", "Ice"],
		baseStats: { hp: 55, atk: 55, def: 80, spa: 70, spd: 45, spe: 15 },
		abilities: { 0: "Ice Body", H: "Bulletproof" },
		heightm: 0.5,
		weightkg: 70,
		color: "Brown",
		evos: ["Palossand-Aevium-Icy"],
		eggGroups: ["Amorphous"],
	},
	palossand: {
		inherit: true,
		otherFormes: ["Palossand-Aevium-Rocky", "Palossand-Aevium-Fiery", "Palossand-Aevium-Icy"],
		formeOrder: ["Palossand", "Palossand-Aevium-Rocky", "Palossand-Aevium-Fiery", "Palossand-Aevium-Icy"],
	},
	palossandaeviumrocky: {
		num: 770,
		name: "Palossand-Aevium-Rocky",
		baseSpecies: "Palossand",
		forme: "Aevium-Rocky",
		types: ["Ghost", "Rock"],
		baseStats: { hp: 85, atk: 75, def: 110, spa: 100, spd: 75, spe: 35 },
		abilities: { 0: "Clear Body", H: "Solid Rock"},
		heightm: 1.3,
		weightkg: 250,
		color: "Brown",
		prevo: "Sandygast-Aevium-Rocky",
		evoLevel: 42,
		eggGroups: ["Amorphous"],
	},
	palossandaeviumfiery: {
		num: 770,
		name: "Palossand-Aevium-Fiery",
		baseSpecies: "Palossand",
		forme: "Aevium-Fiery",
		types: ["Ghost", "Fire"],
		baseStats: { hp: 85, atk: 75, def: 110, spa: 100, spd: 75, spe: 35 },
		abilities: { 0: "Flame Body", H: "Steam Engine"},
		heightm: 1.3,
		weightkg: 250,
		color: "Brown",
		prevo: "Sandygast-Aevium-Fiery",
		evoLevel: 42,
		eggGroups: ["Amorphous"],
	},
	palossandaeviumicy: {
		num: 770,
		name: "Palossand-Aevium-Icy",
		baseSpecies: "Palossand",
		forme: "Aevium-Icy",
		types: ["Ghost", "Ice"],
		baseStats: { hp: 85, atk: 75, def: 110, spa: 100, spd: 75, spe: 35 },
		abilities: { 0: "Ice Body", H: "Bulletproof" },
		heightm: 1.3,
		weightkg: 250,
		color: "Brown",
		prevo: "Sandygast-Aevium-Icy",
		evoLevel: 42,
		eggGroups: ["Amorphous"],
	},
	pyukumuku: {
		inherit: true,
	},
	typenull: {
		inherit: true,
	},
	silvally: {
		inherit: true,
        otherFormes: ["Silvally-Fighting", "Silvally-Flying", "Silvally-Poison", "Silvally-Ground", "Silvally-Rock", "Silvally-Bug", "Silvally-Ghost", "Silvally-Steel", "Silvally-Question", "Silvally-Fire", "Silvally-Water", "Silvally-Grass", "Silvally-Electric", "Silvally-Psychic", "Silvally-Ice", "Silvally-Dragon", "Silvally-Dark", "Silvally-Fairy"],
        formeOrder: [
            "Silvally", "Silvally-Fighting", "Silvally-Flying", "Silvally-Poison", "Silvally-Ground", "Silvally-Rock", "Silvally-Bug", "Silvally-Ghost", "Silvally-Steel", "Silvally-Question",
            "Silvally-Fire", "Silvally-Water", "Silvally-Grass", "Silvally-Electric", "Silvally-Psychic", "Silvally-Ice", "Silvally-Dragon", "Silvally-Dark", "Silvally-Fairy",
        ],
	},
	silvallyquestion: {
		num: 773,
		name: "Silvally-Question",
		baseSpecies: "Silvally",
		forme: "Question",
		types: ["???"],
		gender: "N",
		baseStats: { hp: 95, atk: 95, def: 95, spa: 95, spd: 95, spe: 95 },
		abilities: { 0: "RKS System" },
		heightm: 2.3,
		weightkg: 100.5,
		color: "Gray",
		eggGroups: ["Undiscovered"],
		requiredItem: "??? Memory",
		changesFrom: "Silvally",
	},
	silvallybug: {
		inherit: true,
	},
	silvallydark: {
		inherit: true,
	},
	silvallydragon: {
		inherit: true,
	},
	silvallyelectric: {
		inherit: true,
	},
	silvallyfairy: {
		inherit: true,
	},
	silvallyfighting: {
		inherit: true,
	},
	silvallyfire: {
		inherit: true,
	},
	silvallyflying: {
		inherit: true,
	},
	silvallyghost: {
		inherit: true,
	},
	silvallygrass: {
		inherit: true,
	},
	silvallyground: {
		inherit: true,
	},
	silvallyice: {
		inherit: true,
	},
	silvallypoison: {
		inherit: true,
	},
	silvallypsychic: {
		inherit: true,
	},
	silvallyrock: {
		inherit: true,
	},
	silvallysteel: {
		inherit: true,
	},
	silvallywater: {
		inherit: true,
	},
	minior: {
		inherit: true,
        cosmeticFormes: ["Minior-Blue", "Minior-Green", "Minior-Violet", "Minior-White", "Minior-Yellow", "Minior-Black"],
        formeOrder: [
            "Minior",
            "Minior-Blue",
            "Minior-Green",
            "Minior-Violet",
            "Minior-White",
            "Minior-Yellow",
            "Minior-Black",
            "Minior-Meteor",
        ],
    },
	miniorblue: {
		inherit: true,
	},
	miniorgreen: {
		inherit: true,
	},
	miniorviolet: {
		inherit: true,
	},
	miniorwhite: {
		isCosmeticForme: true,
		name: "Minior-White",
		baseSpecies: "Minior",
		forme: "White",
		color: "White",
	},
	minioryellow: {
		inherit: true,
	},
	miniorblack: {
		isCosmeticForme: true,
		name: "Minior-Black",
		baseSpecies: "Minior",
		forme: "Black",
		color: "Black",
	},
	miniormeteor: {
		inherit: true,
	},
	komala: {
		inherit: true,
	},
	turtonator: {
		inherit: true,
	},
	togedemaru: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	mimikyu: {
		inherit: true,
		otherFormes: ["Mimikyu-Busted"],
		formeOrder: ["Mimikyu", "Mimikyu-Busted"],
	},
	mimikyubusted: {
		inherit: true,
	},
	bruxish: {
		inherit: true,
	},
	drampa: {
		inherit: true,
	},
	drampamega: {
		inherit: true,
	},
	dhelmise: {
		inherit: true,
	},
	jangmoo: {
		inherit: true,
		otherFormes: ["Jangmo-o-Aevium"],
		formeOrder: ["Jangmo-o", "Jangmo-o-Aevium"],
	},
	jangmooaevium: {
		num: 782,
		name: "Jangmo-o-Aevium",
		types: ["Dragon", "Poison"],
		baseStats: { hp: 50, atk: 65, def: 55, spa: 40, spd: 40, spe: 40 },
		abilities: { 0: "Analytic", 1: "Keen Eye", H: "Overcoat" },
		heightm: 0.6,
		weightkg: 29.7,
		color: "Gray",
		evos: ["Hakamo-o-Aevium"],
		eggGroups: ["Dragon"],
	},
	hakamoo: {
		inherit: true,
		otherFormes: ["Hakamo-o-Aevium"],
		formeOrder: ["Hakamo-o", "Hakamo-o-Aevium"],
	},
	hakamooaevium: {
		num: 783,
		name: "Hakamo-o-Aevium",
		baseSpecies: "Hakamo-o",
		forme: "Aevium",
		types: ["Dragon", "Poison"],
		baseStats: { hp: 70, atk: 85, def: 85, spa: 60, spd: 60, spe: 60 },
		abilities: { 0: "Analytic", 1: "Keen Eye", H: "Overcoat" },
		heightm: 1.2,
		weightkg: 47,
		color: "Gray",
		prevo: "Jangmo-o-Aevium",
		evoLevel: 35,
		evos: ["Kommo-o-Aevium"],
		eggGroups: ["Dragon"],
	},
	kommoo: {
		inherit: true,
		otherFormes: ["Kommo-o-Aevium"],
		formeOrder: ["Kommo-o", "Kommo-o-Aevium"],
	},
	kommooaevium: {
		num: 784,
		name: "Kommo-o-Aevium",
		baseSpecies: "Kommo-o",
		forme: "Aevium",
		types: ["Dragon", "Poison"],
		baseStats: { hp: 95, atk: 125, def: 125, spa: 95, spd: 95, spe: 65 },
		abilities: { 0: "Analytic", 1: "Inexorable", H: "Overcoat" },
		heightm: 1.6,
		weightkg: 78.2,
		color: "Gray",
		prevo: "Hakamo-o-Aevium",
		evoLevel: 45,
		eggGroups: ["Dragon"],
	},
	tapukoko: {
		inherit: true,
	},
	tapulele: {
		inherit: true,
	},
	tapubulu: {
		inherit: true,
	},
	tapufini: {
		inherit: true,
	},
	cosmog: {
		inherit: true,
	},
	cosmoem: {
		inherit: true,
	},
	solgaleo: {
		inherit: true,
	},
	lunala: {
		inherit: true,
	},
	nihilego: {
		inherit: true,
	},
	buzzwole: {
		inherit: true,
	},
	pheromosa: {
		inherit: true,
	},
	xurkitree: {
		inherit: true,
	},
	celesteela: {
		inherit: true,
	},
	kartana: {
		inherit: true,
	},
	guzzlord: {
		inherit: true,
	},
	necrozma: {
		inherit: true,
	},
	necrozmaduskmane: {
		inherit: true,
	},
	necrozmadawnwings: {
		inherit: true,
	},
	necrozmaultra: {
		inherit: true,
	},
	magearna: {
		inherit: true,
		otherFormes: ["Magearna-Mega"],
		formeOrder: ["Magearna", "Magearna-Mega"],
	},
	magearnamega: {
		inherit: true,
	},
	marshadow: {
		inherit: true,
	},
	poipole: {
		inherit: true,
	},
	naganadel: {
		inherit: true,
	},
	stakataka: {
		inherit: true,
	},
	blacephalon: {
		inherit: true,
	},
	zeraora: {
		inherit: true,
	},
	zeraoramega: {
		inherit: true,
		gen: 9,
	},
	meltan: {
		inherit: true,
	},
	melmetal: {
		inherit: true,
		otherFormes: ["Melmetal-Giga"],
		formeOrder: ["Melmetal", "Melmetal-Giga"],
		canGigantamax: undefined,
	},
	// melmetalgiga: {
	// },
	grookey: {
		inherit: true,
	},
	thwackey: {
		inherit: true,
	},
	rillaboom: {
		inherit: true,
		otherFormes: ["Rillaboom-Giga"],
		formeOrder: ["Rillaboom", "Rillaboom-Giga"],
		canGigantamax: undefined,
	},
	rillaboomgiga: {
		num: 812,
		name: "Rillaboom-Giga",
		baseSpecies: "Rillaboom",
		forme: "Giga",
		types: ["Grass"],
		genderRatio: { M: 0.875, F: 0.125 },
		baseStats: { hp: 100, atk: 150, def: 115, spa: 120, spd: 90, spe: 50 },
		abilities: { 0: "Jungle Beat" },
		heightm: 28,
		weightkg: 165.3,
		color: "Green",
		eggGroups: ["Field", "Grass"],
		requiredItem: "Rillaboomite",
	},
	scorbunny: {
		inherit: true,
	},
	raboot: {
		inherit: true,
	},
	cinderace: {
		inherit: true,
		otherFormes: ["Cinderace-Giga"],
		formeOrder: ["Cinderace", "Cinderace-Giga"],
		canGigantamax: undefined,
	},
	// cinderacegiga: {
	// },
	sobble: {
		inherit: true,
	},
	drizzile: {
		inherit: true,
	},
	inteleon: {
		inherit: true,
		otherFormes: ["Inteleon-Giga"],
		formeOrder: ["Inteleon", "Inteleon-Giga"],
		canGigantamax: undefined,
	},
	// inteleongiga: {
	// },
	skwovet: {
		inherit: true,
	},
	greedent: {
		inherit: true,
	},
	rookidee: {
		inherit: true,
	},
	corvisquire: {
		inherit: true,
	},
	corviknight: {
		inherit: true,
		otherFormes: ["Corviknight-Giga"],
		formeOrder: ["Corviknight", "Corviknight-Giga"],
		canGigantamax: undefined,
	},
	// corviknightgiga: {
	// },
	blipbug: {
		inherit: true,
	},
	dottler: {
		inherit: true,
	},
	orbeetle: {
		inherit: true,
		otherFormes: ["Orbeetle-Giga"],
		formeOrder: ["Orbeetle", "Orbeetle-Giga"],
		canGigantamax: undefined,
	},
	// orbeetlegiga: {
	// },
	nickit: {
		inherit: true,
	},
	thievul: {
		inherit: true,
	},
	gossifleur: {
		inherit: true,
	},
	eldegoss: {
		inherit: true,
	},
	wooloo: {
		inherit: true,
	},
	dubwool: {
		inherit: true,
	},
	chewtle: {
		inherit: true,
	},
	drednaw: {
		inherit: true,
		otherFormes: ["Drednaw-Giga"],
		formeOrder: ["Drednaw", "Drednaw-Giga"],
		canGigantamax: undefined,
	},
	// drednawgiga: {
	// },
	yamper: {
		inherit: true,
	},
	boltund: {
		inherit: true,
	},
	rolycoly: {
		inherit: true,
	},
	carkol: {
		inherit: true,
	},
	coalossal: {
		inherit: true,
		otherFormes: ["Coalossal-Giga"],
		formeOrder: ["Coalossal", "Coalossal-Giga"],
		canGigantamax: undefined,
	},
	// coalossalgiga: {
	// },
	applin: {
		inherit: true,
	},
	flapple: {
		inherit: true,
		otherFormes: ["Flapple-Giga"],
		formeOrder: ["Flapple", "Flapple-Giga"],
		canGigantamax: undefined,
	},
	// flapplegiga: {
	// },
	appletun: {
		inherit: true,
		otherFormes: ["Appletun-Giga"],
		formeOrder: ["Appletun", "Appletun-Giga"],
		canGigantamax: undefined,
	},
	// appletungiga: {
	// },
	silicobra: {
		inherit: true,
	},
	sandaconda: {
		inherit: true,
		otherFormes: ["Sandaconda-Giga"],
		formeOrder: ["Sandaconda", "Sandaconda-Giga"],
		canGigantamax: undefined,
	},
	// sandacondagiga: {
	// },
	cramorant: {
		inherit: true,
	},
	cramorantgulping: {
		inherit: true,
	},
	cramorantgorging: {
		inherit: true,
	},
	arrokuda: {
		inherit: true,
	},
	barraskewda: {
		inherit: true,
	},
	toxel: {
		inherit: true,
	},
	toxtricity: {
		inherit: true,
		otherFormes: ["Toxtricity-Low-Key", "Toxtricity-Aevium", "Toxtricity-Giga"],
		formeOrder: ["Toxtricity", "Toxtricity-Low-Key", "Toxtricity-Aevium", "Toxtricity-Giga"],
		canGigantamax: undefined,
	},
	toxtricitylowkey: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
		canGigantamax: undefined,
	},
	toxtricityaevium: {
		num: 849,
		name: "Toxtricity-Aevium",
		baseSpecies: "Toxtricity",
		forme: "Aevium",
		types: ["Fire", "Poison"],
		baseStats: { hp: 70, atk: 75, def: 70, spa: 114, spd: 70, spe: 98 },
		abilities: { 0: "Galvanize", 1: "Punk Rock", H: "Solid Rock" },
		heightm: 1.6,
		weightkg: 40,
		color: "Purple",
		prevo: "Toxel",
		evoType: "useItem",
		evoItem: "Fire Stone",
		eggGroups: ["Human-Like"],
	},
	// toxtricitygiga: {
	// },
	sizzlipede: {
		inherit: true,
	},
	centiskorch: {
		inherit: true,
		otherFormes: ["Centiskorch-Giga"],
		formeOrder: ["Centiskorch", "Centiskorch-Giga"],
		canGigantamax: undefined,
	},
	// centiskorchgiga: {
	// },
	clobbopus: {
		inherit: true,
	},
	grapploct: {
		inherit: true,
	},
	sinistea: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	polteageist: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	hatenna: {
		inherit: true,
	},
	hattrem: {
		inherit: true,
	},
	hatterene: {
		inherit: true,
		otherFormes: ["Hatterene-Giga"],
		formeOrder: ["Hatterene", "Hatterene-Giga"],
		canGigantamax: undefined,
	},
	// hatternegiga: {
	// },
	impidimp: {
		inherit: true,
	},
	morgrem: {
		inherit: true,
	},
	grimmsnarl: {
		inherit: true,
		otherFormes: ["Grimmsnarl-Giga"],
		formeOrder: ["Grimmsnarl", "Grimmsnarl-Giga"],
		canGigantamax: undefined,
	},
	// grimmsnarlgiga: {
	// },
	obstagoon: {
		inherit: true,
	},
	perrserker: {
		inherit: true,
	},
	cursola: {
		inherit: true,
	},
	sirfetchd: {
		inherit: true,
	},
	mrrime: {
		inherit: true,
	},
	runerigus: {
		inherit: true,
	},
	milcery: {
		inherit: true,
	},
	alcremie: {
		inherit: true,
		baseForme: undefined,
		cosmeticFormes: undefined,
		otherFormes: ["Alcremie-Giga"],
		formeOrder: ["Alcremie", "Alcremie-Giga"],
		canGigantamax: undefined,
	},
	// alcremiegiga: {
	// },
	falinks: {
		inherit: true,
	},
	falinksmega: {
		inherit: true,
	},
	pincurchin: {
		inherit: true,
	},
	snom: {
		inherit: true,
	},
	frosmoth: {
		inherit: true,
	},
	stonjourner: {
		inherit: true,
	},
	eiscue: {
		inherit: true,
	},
	eiscuenoice: {
		inherit: true,
	},
	indeedee: {
		inherit: true,
	},
	indeedeef: {
		inherit: true,
	},
	morpeko: {
		inherit: true,
	},
	morpekohangry: {
		inherit: true,
	},
	cufant: {
		inherit: true,

	},
	copperajah: {
		inherit: true,
		otherFormes: ["Copperajah-Giga"],
		formeOrder: ["Copperajah", "Copperajah-Giga"],
		canGigantamax: undefined,
	},
	// copperajahgiga: {
	// },
	dracozolt: {
		inherit: true,
	},
	arctozolt: {
		inherit: true,
	},
	dracovish: {
		inherit: true,
	},
	arctovish: {
		inherit: true,
	},
	duraludon: {
		inherit: true,
		otherFormes: ["Duraludon-Giga"],
		formeOrder: ["Duraludon", "Duraludon-Giga"],
		canGigantamax: undefined,
	},
	// duraludongiga: {
	// },
	dreepy: {
		inherit: true,
	},
	drakloak: {
		inherit: true,
	},
	dragapult: {
		inherit: true,
	},
	zacian: {
		inherit: true,
	},
	zaciancrowned: {
		inherit: true,
	},
	zamazenta: {
		inherit: true,
	},
	zamazentacrowned: {
		inherit: true,
	},
	eternatus: {
		inherit: true,
		tags: undefined,
		otherFormes: undefined,
		formeOrder: undefined,
		cannotDynamax: undefined,
	},
	kubfu: {
		inherit: true,
	},
	urshifu: {
		inherit: true,
		otherFormes: ["Urshifu-Rapid-Strike", "Urshifu-Single-Giga", "Urshifu-Rapid-Giga"],
		formeOrder: ["Urshifu", "Urshifu-Rapid-Strike", "Urshifu-Single-Giga", "Urshifu-Rapid-Giga"],
		canGigantamax: undefined,
	},
	urshifurapidstrike: {
		inherit: true,
		canGigantamax: undefined,
	},
	// urshifusinglegiga: {
	// },
	// urshifurapidgiga: {
	// },
	zarude: {
		inherit: true,
	},
	zarudedada: {
		inherit: true,
	},
	regieleki: {
		inherit: true,
	},
	regidrago: {
		inherit: true,
	},
	glastrier: {
		inherit: true,
	},
	spectrier: {
		inherit: true,
	},
	calyrex: {
		inherit: true,
	},
	calyrexice: {
		inherit: true,
	},
	calyrexshadow: {
		inherit: true,
	},
	wyrdeer: {
		inherit: true,
	},
	kleavor: {
		inherit: true,
	},
	ursaluna: {
		inherit: true,
	},
	ursalunabloodmoon: {
		inherit: true,
	},
	basculegion: {
		inherit: true,
	},
	basculegionf: {
		inherit: true,
	},
	sneasler: {
		inherit: true,
		otherFormes: ["Sneasler-Aevium"],
		formeOrder: ["Sneasler", "Sneasler-Aevium"],
	},
	sneasleraevium: {
		num: 903,
		name: "Sneasler-Aevium",
		baseSpecies: "Sneasler",
		forme: "Aevium",
		types: ["Fighting", "Fairy"],
		baseStats: { hp: 80, atk: 120, def: 80, spa: 40, spd: 60, spe: 130 },
		abilities: { 0: "Battle Armor", 1: "Wind Rider", H: "Sworn Duty" },
		heightm: 1.5,
		weightkg: 27,
		color: "Gray",
		prevo: "Sneasel-Aevium",
		evoType: "levelHold",
		evoItem: "Fairy Feather",
		evoCondition: "during the day",
		eggGroups: ["Field"],
	},
	overqwil: {
		inherit: true,
	},
	enamorus: {
		inherit: true,
	},
	enamorustherian: {
		inherit: true,
	},
	sprigatito: {
		inherit: true,
	},
	floragato: {
		inherit: true,
	},
	meowscarada: {
		inherit: true,
	},
	fuecoco: {
		inherit: true,
	},
	crocalor: {
		inherit: true,
	},
	skeledirge: {
		inherit: true,
	},
	quaxly: {
		inherit: true,
	},
	quaxwell: {
		inherit: true,
	},
	quaquaval: {
		inherit: true,
	},
	lechonk: {
		inherit: true,
	},
	oinkologne: {
		inherit: true,
	},
	oinkolognef: {
		inherit: true,
	},
	tarountula: {
		inherit: true,
	},
	spidops: {
		inherit: true,
	},
	nymble: {
		inherit: true,
	},
	lokix: {
		inherit: true,
	},
	pawmi: {
		inherit: true,
	},
	pawmo: {
		inherit: true,
	},
	pawmot: {
		inherit: true,
	},
	tandemaus: {
		inherit: true,
	},
	maushold: {
		inherit: true,
	},
	mausholdfour: {
		inherit: true,
	},
	fidough: {
		inherit: true,
	},
	dachsbun: {
		inherit: true,
	},
	smoliv: {
		inherit: true,
	},
	dolliv: {
		inherit: true,
	},
	arboliva: {
		inherit: true,
	},
	squawkabilly: {
		inherit: true,
	},
	squawkabillyblue: {
		inherit: true,
	},
	squawkabillyyellow: {
		inherit: true,
	},
	squawkabillywhite: {
		inherit: true,
	},
	nacli: {
		inherit: true,
	},
	naclstack: {
		inherit: true,
	},
	garganacl: {
		inherit: true,
	},
	charcadet: {
		inherit: true,
	},
	armarouge: {
		inherit: true,
	},
	ceruledge: {
		inherit: true,
	},
	tadbulb: {
		inherit: true,
	},
	bellibolt: {
		inherit: true,
	},
	wattrel: {
		inherit: true,
	},
	kilowattrel: {
		inherit: true,
	},
	maschiff: {
		inherit: true,
	},
	mabosstiff: {
		inherit: true,
	},
	shroodle: {
		inherit: true,
	},
	grafaiai: {
		inherit: true,
	},
	bramblin: {
		inherit: true,
	},
	brambleghast: {
		inherit: true,
	},
	toedscool: {
		inherit: true,
	},
	toedscruel: {
		inherit: true,
	},
	klawf: {
		inherit: true,
	},
	capsakid: {
		inherit: true,
	},
	scovillain: {
		inherit: true,
	},
	scovillainmega: {
		inherit: true,
	},
	rellor: {
		inherit: true,
	},
	rabsca: {
		inherit: true,
	},
	flittle: {
		inherit: true,
	},
	espathra: {
		inherit: true,
	},
	tinkatink: {
		inherit: true,
	},
	tinkatuff: {
		inherit: true,
	},
	tinkaton: {
		inherit: true,
	},
	wiglett: {
		inherit: true,
	},
	wugtrio: {
		inherit: true,
	},
	bombirdier: {
		inherit: true,
	},
	finizen: {
		inherit: true,
	},
	palafin: {
		inherit: true,
	},
	palafinhero: {
		inherit: true,
	},
	varoom: {
		inherit: true,
	},
	revavroom: {
		inherit: true,
	},
	cyclizar: {
		inherit: true,
	},
	orthworm: {
		inherit: true,
	},
	glimmet: {
		inherit: true,
		otherFormes: ["Glimmet-Aevium"],
		formeOrder: ["Glimmet", "Glimmet-Aevium"],
	},
	glimmetaevium: {
		num: 969,
		name: "Glimmet-Aevium",
		baseSpecies: "Glimmet",
		forme: "Aevium",
		types: ["Steel", "Flying"],
		baseStats: { hp: 48, atk: 35, def: 42, spa: 105, spd: 60, spe: 60 },
		abilities: { 0: "Memory Leak", H: "Download" },
		heightm: 0.7,
		weightkg: 8,
		color: "Black",
		evos: ["Glimmora-Aevium"],
		eggGroups: ["Mineral"],
	},
	glimmora: {
		inherit: true,
		otherFormes: ["Glimmora-Aevium", "Glimmora-Mega"],
		formeOrder: ["Glimmora", "Glimmora-Aevium", "Glimmora-Mega"],
	},
	glimmoraaevium: {
		num: 970,
		name: "Glimmora-Aevium",
		baseSpecies: "Glimmora",
		forme: "Aevium",
		types: ["Steel", "Flying"],
		baseStats: { hp: 83, atk: 55, def: 90, spa: 130, spd: 81, spe: 86 },
		abilities: { 0: "Memory Leak", H: "Download" },
		heightm: 1.5,
		weightkg: 45,
		color: "Black",
		prevo: "Glimmet-Aevium",
		evoLevel: 35,
		eggGroups: ["Mineral"],
	},
	glimmoramega: {
		inherit: true,
	},
	greavard: {
		inherit: true,
	},
	houndstone: {
		inherit: true,
	},
	flamigo: {
		inherit: true,
	},
	cetoddle: {
		inherit: true,
	},
	cetitan: {
		inherit: true,
	},
	veluza: {
		inherit: true,
		otherFormes: ["Veluza-Aevium"],
		formeOrder: ["Veluza", "Veluza-Aevium"],
	},
	veluzaaevium: {
		num: 976,
		name: "Veluza-Aevium",
		baseSpecies: "Veluza",
		forme: "Aevium",
		types: ["Water", "Fire"],
		baseStats: { hp: 90, atk: 102, def: 60, spa: 62, spd: 60, spe: 104 },
		abilities: { 0: "Reckless", 1: "Regenerator", H: "Mold Breaker" },
		heightm: 2.5,
		weightkg: 90,
		color: "Gray",
		eggGroups: ["Water 2"],
	},
	dondozo: {
		inherit: true,
	},
	tatsugiri: {
		inherit: true,
	},
	tatsugiridroopy: {
		inherit: true,
	},
	tatsugiristretchy: {
		inherit: true,
	},
	tatsugiricurlymega: {
		inherit: true,
	},
	tatsugiridroopymega: {
		inherit: true,
	},
	tatsugiristretchymega: {
		inherit: true,
	},
	annihilape: {
		inherit: true,
	},
	clodsire: {
		inherit: true,
	},
	farigiraf: {
		inherit: true,
	},
	dudunsparce: {
		inherit: true,
	},
	dudunsparcethreesegment: {
		inherit: true,
	},
	kingambit: {
		inherit: true,
	},
	greattusk: {
		inherit: true,
	},
	screamtail: {
		inherit: true,
	},
	brutebonnet: {
		inherit: true,
	},
	fluttermane: {
		inherit: true,
	},
	slitherwing: {
		inherit: true,
	},
	sandyshocks: {
		inherit: true,
	},
	irontreads: {
		inherit: true,
	},
	ironbundle: {
		inherit: true,
	},
	ironhands: {
		inherit: true,
	},
	ironjugulis: {
		inherit: true,
	},
	ironmoth: {
		inherit: true,
	},
	ironthorns: {
		inherit: true,
	},
	frigibax: {
		inherit: true,
	},
	arctibax: {
		inherit: true,
	},
	baxcalibur: {
		inherit: true,
	},
	baxcaliburmega: {
		inherit: true,
	},
	gimmighoul: {
		inherit: true,
	},
	gimmighoulroaming: {
		inherit: true,
	},
	gholdengo: {
		inherit: true,
	},
	wochien: {
		inherit: true,
	},
	chienpao: {
		inherit: true,
	},
	tinglu: {
		inherit: true,
	},
	chiyu: {
		inherit: true,
	},
	roaringmoon: {
		inherit: true,
	},
	ironvaliant: {
		inherit: true,
	},
	koraidon: {
		inherit: true,
	},
	miraidon: {
		inherit: true,
	},
	walkingwake: {
		inherit: true,
	},
	ironleaves: {
		inherit: true,
	},
	dipplin: {
		inherit: true,
	},
	poltchageist: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	sinistcha: {
		inherit: true,
		otherFormes: undefined,
		formeOrder: undefined,
	},
	okidogi: {
		inherit: true,
	},
	munkidori: {
		inherit: true,
	},
	fezandipiti: {
		inherit: true,
	},
	ogerpon: {
		inherit: true,
		otherFormes: ["Ogerpon-Wellspring", "Ogerpon-Hearthflame", "Ogerpon-Cornerstone"],
		formeOrder: ["Ogerpon", "Ogerpon-Wellspring", "Ogerpon-Hearthflame", "Ogerpon-Cornerstone"],
		requiredTeraType: undefined,
	},
	ogerponwellspring: {
		inherit: true,
	},
	ogerponhearthflame: {
		inherit: true,
	},
	ogerponcornerstone: {
		inherit: true,
	},
	archaludon: {
		inherit: true,
	},
	hydrapple: {
		inherit: true,
	},
	gougingfire: {
		inherit: true, 
	},
	ragingbolt: {
		inherit: true,
	},
	ironboulder: {
		inherit: true,
	},
	ironcrown: {
		inherit: true,
	},
	terapagos: {
		inherit: true,
		requiredTeraType: undefined,
	},
	terapagosterastal: {
		inherit: true,
		requiredTeraType: undefined,
	},
	terapagosstellar: {
		inherit: true,
		requiredTeraType: undefined,
	},
	pecharunt: {
		inherit: true,
	},
};
