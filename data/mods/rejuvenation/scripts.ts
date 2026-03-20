import {Dex} from '../../../sim/dex';
export const Scripts: {[k: string]: ModdedBattleScriptsData} = {
	gen: 8,
	teambuilderConfig: {
		// for micrometas to only show custom tiers
		excludeStandardTiers: false,
		// only to specify the order of custom tiers
		customTiers: ['rejuvenation'],
	},	
	
	init() {
		// Bulbasaur
		this.modData("Learnsets", "bulbasaur").learnset.secretpower = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.reflect = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.rocksmash = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.irritation = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.slashandburn = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.cut = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.strength = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.helpinghand = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.bodyslam = ["8L1"];
		this.modData("Learnsets", "bulbasaur").learnset.block = ["8L1"];
		delete this.modData('Learnsets', 'bulbasaur').learnset.bide;
		delete this.modData('Learnsets', 'bulbasaur').learnset.naturalgift;
		delete this.modData('Learnsets', 'bulbasaur').learnset.grassyglide;
		delete this.modData('Learnsets', 'bulbasaur').learnset.headbutt;
		delete this.modData('Learnsets', 'bulbasaur').learnset.captivate;
		delete this.modData('Learnsets', 'bulbasaur').learnset.stringshot;
		delete this.modData('Learnsets', 'bulbasaur').learnset.razorwind;
		delete this.modData('Learnsets', 'bulbasaur').learnset.rage;
		delete this.modData('Learnsets', 'bulbasaur').learnset.megadrain;
		delete this.modData('Learnsets', 'bulbasaur').learnset.mimic;
		delete this.modData('Learnsets', 'bulbasaur').learnset.furycutter;
		delete this.modData('Learnsets', 'bulbasaur').learnset.defensecurl;
		delete this.modData('Learnsets', 'bulbasaur').learnset.celebrate;
		delete this.modData('Learnsets', 'bulbasaur').learnset.mudslap;
		// Ivysaur
		this.modData("Learnsets", "ivysaur").learnset.secretpower = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.reflect = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.falseswipe = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.flash = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.rocksmash = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.rockclimb = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.irritation = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.slashandburn = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.cut = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.strength = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.helpinghand = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.bodyslam = ["8L1"];
		this.modData("Learnsets", "ivysaur").learnset.block = ["8L1"];
		delete this.modData('Learnsets', 'ivysaur').learnset.bide;
		delete this.modData('Learnsets', 'ivysaur').learnset.naturalgift;
		delete this.modData('Learnsets', 'ivysaur').learnset.grassyglide;
		delete this.modData('Learnsets', 'ivysaur').learnset.headbutt;
		delete this.modData('Learnsets', 'ivysaur').learnset.captivate;
		delete this.modData('Learnsets', 'ivysaur').learnset.stringshot;
		delete this.modData('Learnsets', 'ivysaur').learnset.razorwind;
		delete this.modData('Learnsets', 'ivysaur').learnset.rage;
		delete this.modData('Learnsets', 'ivysaur').learnset.megadrain;
		delete this.modData('Learnsets', 'ivysaur').learnset.mimic;
		delete this.modData('Learnsets', 'ivysaur').learnset.furycutter;
		delete this.modData('Learnsets', 'ivysaur').learnset.defensecurl;
		delete this.modData('Learnsets', 'ivysaur').learnset.celebrate;
		delete this.modData('Learnsets', 'ivysaur').learnset.mudslap;
		// Venusaur
		this.modData("Learnsets", "venusaur").learnset.secretpower = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.reflect = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.falseswipe = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.flash = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.rocksmash = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.irritation = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.slashandburn = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.weatherball = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.bulletseed = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.cut = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.strength = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.outrage = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.helpinghand = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.bodyslam = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.terrainpulse = ["8L1"];
		this.modData("Learnsets", "venusaur").learnset.earthpower = ["8L1"];
		delete this.modData('Learnsets', 'venusaur').learnset.bide;
		delete this.modData('Learnsets', 'venusaur').learnset.naturalgift;
		delete this.modData('Learnsets', 'venusaur').learnset.grassyglide;
		delete this.modData('Learnsets', 'venusaur').learnset.headbutt;
		delete this.modData('Learnsets', 'venusaur').learnset.captivate;
		delete this.modData('Learnsets', 'venusaur').learnset.stringshot;
		delete this.modData('Learnsets', 'venusaur').learnset.razorwind;
		delete this.modData('Learnsets', 'venusaur').learnset.rage;
		delete this.modData('Learnsets', 'venusaur').learnset.megadrain;
		delete this.modData('Learnsets', 'venusaur').learnset.mimic;
		delete this.modData('Learnsets', 'venusaur').learnset.furycutter;
		delete this.modData('Learnsets', 'venusaur').learnset.frenzyplant;
		delete this.modData('Learnsets', 'venusaur').learnset.defensecurl;
		delete this.modData('Learnsets', 'venusaur').learnset.celebrate;
		delete this.modData('Learnsets', 'venusaur').learnset.mudslap;

	},
};