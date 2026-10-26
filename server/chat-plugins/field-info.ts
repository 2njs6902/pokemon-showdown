import { Utils } from '../../lib';

interface FieldInfo {
	name: string;
	kind: 'Field' | 'Terrain/overlay';
	effects?: string[];
	sections?: FieldInfoSection[];
}

interface FieldInfoSection {
	title: string;
	effects: string[];
}

const FIELD_INFO: Record<string, FieldInfo> = {
	electricterrain: {
		name: 'Electric Terrain',
		kind: 'Terrain/overlay',
		sections: [
			{ title: 'Core rules', effects: [
				'Grounded users (and users under Magnet Rise) deal 1.5× damage with Electric-type attacks when unlayered, or 1.3× while this terrain overlays a field.',
				'Grounded Pokémon cannot fall asleep. Mud Sport suppresses the terrain for its duration.',
				'Spikes deal Electric-type effectiveness-scaled damage and can hit airborne Pokémon, even if the Spikes were placed before the terrain appeared.',
			] },
			{ title: 'Moves', effects: [
				'Rising Voltage receives its terrain power increase; Psyblade is strengthened. Focus Punch fails before its attack animation.',
				'Plasma Fists creates Electric Terrain for 3 turns (6 with Amplified Rock). Hadron Engine and Electric Surge normally create it for 5 turns (8 with Amplified Rock).',
				'Tectonic Rage destroys the terrain and receives a 1.3× transition boost.',
				'Secret Power uses the terrain-specific effect; Terrain Pulse becomes Electric; Camouflage and Mimicry make the user Electric-type.',
			] },
			{ title: 'Abilities and items', effects: [
				'Surge Surfer doubles Speed. Comatose is suppressed. Static has a 60% contact activation chance.',
				'Battery, Galvanize, Transistor, Plus, Minus, Lightning Rod, Motor Drive, Volt Absorb, Electromorphosis, Quick Feet, Steadfast, Slow Start and Teravolt have terrain-specific enhancements.',
				'Cell Battery is reusable while the terrain is unlayered. Elemental Seed applies its Electric Terrain effect.',
			] },
		],
	},
	grassyterrain: {
		name: 'Grassy Terrain',
		kind: 'Terrain/overlay',
		sections: [
			{ title: 'Core rules', effects: [
				'Grounded users deal 1.5× damage with Grass-type attacks when unlayered, or 1.3× while this terrain overlays a field.',
				'Grounded Pokémon restore 1/16 maximum HP at the end of each turn. Earthquake, Bulldoze and Magnitude are weakened against grounded targets.',
				'Only while unlayered, Fire-type attacks against grounded targets are strengthened by 1.5×.',
			] },
			{ title: 'Moves', effects: [
				'Floral Healing restores more HP. Grassy Glide receives priority. Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the terrain-specific Grass effects.',
			] },
			{ title: 'Abilities and items', effects: [
				'Cotton Down, Effect Spore, Grass Pelt, Harvest, Leaf Guard, Overgrow, Sap Sipper, Seed Sower and related Grass abilities receive their terrain-specific enhancements.',
				'Big Root increases draining recovery more than normal while the terrain is unlayered. Elemental Seed applies its Grassy Terrain effect.',
			] },
		],
	},
	mistyterrain: {
		name: 'Misty Terrain',
		kind: 'Terrain/overlay',
		sections: [
			{ title: 'Core rules', effects: [
				'Fairy-type attacks deal 1.5× damage when unlayered or 1.3× while this terrain overlays a field.',
				'Only while unlayered, Dragon-type attacks deal 0.5× damage. Grounded Pokémon are protected from major status conditions.',
				'Misty Terrain cannot overlay Corrosive Mist, Frozen Dimensional or Underwater Field.',
			] },
			{ title: 'Moves and abilities', effects: [
				'Misty Explosion is strengthened. Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the terrain-specific Fairy effects.',
				'Pastel Veil halves Poison-type attack damage for its bearer and allies. Pixilate, Marvel Scale, Soul-Heart, Dry Skin and Water Compaction have terrain-specific effects.',
				'Elemental Seed applies its Misty Terrain effect.',
			] },
			{ title: 'Transitions', effects: [
				'Bleakwind Storm, Gust, Hurricane, Razor Wind, Twister and Supersonic Skystrike blow the mist away; damaging transition moves receive a 1.3× boost.',
				'Clear Smog, Corrosive Gas, Poison Gas and Smog add 1 corrosion point; Acid Downpour adds 2. At 2 points it becomes Corrosive Mist, and the triggering damaging move receives a 1.3× boost.',
			] },
		],
	},
	psychicterrain: {
		name: 'Psychic Terrain',
		kind: 'Terrain/overlay',
		sections: [
			{ title: 'Core rules', effects: [
				'Grounded users deal 1.5× damage with Psychic-type attacks when unlayered, or 1.3× while this terrain overlays a field.',
				'Priority attacks cannot hit grounded opposing Pokémon.',
			] },
			{ title: 'Moves', effects: [
				'Expanding Force receives its terrain power increase and spread targeting. Meditate, Mind Reader, Miracle Eye and Psych Up receive their field enhancements.',
				'Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the terrain-specific Psychic effects.',
			] },
			{ title: 'Abilities and items', effects: [
				'Anticipation and Forewarn raise Special Attack on switch-in: +2 stages when unlayered, or +1 stage when this terrain is an overlay.',
				'Power Spot, Pure Power and Zen Mode have terrain-specific effects.',
				'Magical Seed applies its Psychic Terrain effect while the terrain is unlayered.',
			] },
		],
	},
	rainbowterrain: {
		name: 'Rainbow Field (overlay)',
		kind: 'Terrain/overlay',
		sections: [
			{ title: 'Core rules', effects: [
				'Listed rainbow-charged attacks deal 1.5× damage.',
				'Special Normal-type attacks become a random non-Normal, non-Stellar type and deal 1.3× damage.',
				'Secondary-effect chances are doubled; this stacks with Serene Grace, except for flinching effects.',
			] },
			{ title: 'Moves and natural type', effects: [
				'Solar Beam and Solar Blade need no charge turn. Fire Pledge and Water Pledge interact with the overlay.',
				'The natural type is Dragon: Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the Dragon field effect.',
			] },
		],
	},
	forestfield: {
		name: 'Forest Field',
		kind: 'Field',
		sections: [
			{ title: 'Damage and typing', effects: [
				'Grass-type attacks and special Bug-type attacks deal 1.3× damage. The field natural type is Bug.',
				'Cut, Air Cutter, Air Slash, Aerial Ace, X-Scissor and Slash receive forest-specific enhancements.',
			] },
			{ title: 'Moves', effects: [
				'Infestation deals increased trapping damage. Ingrain, Floral Healing, Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter receive forest-specific effects.',
				'Surf adds 1 waterlogging point and Muddy Water adds 2. At 3 points, Forest Field becomes Swamp Field; the triggering damaging move receives a 1.3× boost.',
			] },
			{ title: 'Abilities and items', effects: [
				'Effect Spore, Grass Pelt, Harvest, Jungle Beat, Leaf Guard, Overgrow, Sap Sipper, Swarm and Wildfire receive forest-specific enhancements.',
				'Telluric Seed applies the Forest Field seed effect.',
			] },
		],
	},
	swampfield: {
		name: 'Swamp Field',
		kind: 'Field',
		sections: [
			{ title: 'Core rules', effects: [
				'Bug-, Grass- and Water-type attacks deal 1.3× damage; Fire-type attacks deal 0.8× damage. The field natural type is Water.',
				'At the end of each turn, grounded Pokémon lose 1 Speed stage (2 while partially trapped), unless protected by Heavy-Duty Boots, Clear Amulet, Clear Body, Propeller Tail, Quick Feet, Swift Swim or White Smoke.',
				'Sleeping Pokémon and Pokémon with Comatose lose 1/16 maximum HP each turn, or 1/8 while partially trapped.',
			] },
			{ title: 'Moves', effects: [
				'Draining moves lower one random non-HP stat of the target after successfully restoring the user’s HP.',
				'Grass Pledge, Water Pledge, Mud Shot, Mud Barrage, Floral Healing, Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter receive swamp-specific effects.',
			] },
			{ title: 'Abilities and items', effects: [
				'Dry Skin, Foam Spray, Gooey, Gulp Missile, Hydration, Rattled and related swamp abilities receive field-specific enhancements.',
				'Telluric Seed applies the Swamp Field seed effect.',
			] },
		],
	},
	frozendimensionalfield: {
		name: 'Frozen Dimensional Field',
		kind: 'Field',
		sections: [
			{ title: 'Currently active mechanics', effects: [
				'Misty Terrain cannot overlay this field.',
				'The server currently has no other Frozen Dimensional Field battle modifiers implemented.',
			] },
		],
	},
	hauntedfield: {
		name: 'Haunted Field',
		kind: 'Field',
		sections: [
			{ title: 'Damage and typing', effects: [
				'Ghost-type attacks deal 1.5× damage and can hit Normal-type Pokémon neutrally. The field natural type is Ghost.',
				'Flame Burst, Inferno, Flame Charge and Fire Spin gain Ghost as an additional type. Those moves, Burning Jealousy, Torch Song, Bitter Blade, Bone Club, Bone Rush, Bonemerang and Astonish also receive a 1.5× field boost.',
				'Shadow Bone deals 1.2× damage. Infernal Parade receives its boosted-power condition automatically.',
			] },
			{ title: 'Status and move changes', effects: [
				'Non-Ghost sleeping Pokémon and Pokémon with Comatose lose 1/16 maximum HP each turn.',
				'Will-O-Wisp and Hypnosis have 90% accuracy. Lick always paralyzes; Ominous Wind has double its usual secondary-effect chance; Scary Face lowers Speed by one additional stage; Spite removes 6 PP.',
				'Night Shade deals 1.5× the user’s level. Curse, Destiny Bond, Mean Look, Nightmare, Phantom Force, Shadow Force, Magic Powder, Secret Power and other listed Ghost moves receive field-specific effects.',
			] },
			{ title: 'Abilities and items', effects: [
				'Rattled raises Speed on switch-in. Power Spot supplies a 1.5× power boost. Cursed Body, Perish Body, Shadow Tag, Wandering Spirit, Soul Eater and Resuscitation receive haunted-field enhancements.',
				'Magical Seed applies the Haunted Field seed effect.',
			] },
			{ title: 'Transitions', effects: [
				'Judgment, Origin Pulse, Purify and Sacred Fire transform the field into Blessed Field. Flash and Dazzling Gleam destroy it.',
				'A damaging move that performs one of these transitions receives a 1.3× boost.',
			] },
		],
	},
	narcissafield: {
		name: 'Haunted Field (Narcissa variation)',
		kind: 'Field',
		sections: [
			{ title: 'Battle mechanics', effects: [
				'Uses every Haunted Field damage, typing, move, ability, residual and seed effect.',
				'Judgment, Origin Pulse, Purify and Sacred Fire transform it into Blessed Field.',
				'Unlike normal Haunted Field, Flash and Dazzling Gleam transform it into Forest Field instead of removing it. Damaging transition moves receive a 1.3× boost.',
			] },
		],
	},
	blessedfield: {
		name: 'Blessed Field',
		kind: 'Field',
		sections: [{ title: 'Currently active mechanics', effects: [
			'The server currently recognizes and displays Blessed Field, but no additional battle modifiers are implemented for it yet.',
		] }],
	},
	rainbowfield: {
		name: 'Rainbow Field',
		kind: 'Field',
		sections: [
			{ title: 'Damage and typing', effects: [
				'Listed rainbow-charged attacks deal 1.5× damage; listed darkness-themed attacks deal 0.5× damage.',
				'Special Normal-type attacks become a random non-Normal, non-Stellar type and deal 1.5× damage.',
				'Secondary-effect chances are doubled and stack with Serene Grace, except for flinching. The natural type is Dragon.',
			] },
			{ title: 'Moves and residual effects', effects: [
				'Solar Beam and Solar Blade need no charge turn. Cosmic Power, Meditate, Aurora Veil, Life Dew, Wish, Nightmare, Sonic Boom and Weather Ball receive field-specific effects.',
				'Sleeping Pokémon restore 1/16 maximum HP each turn instead of suffering the field’s nightmare effects.',
				'Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the Dragon field effect.',
			] },
			{ title: 'Abilities, item and transitions', effects: [
				'Cloud Nine, Wonder Skin, Marvel Scale, Soul-Heart, Pastel Veil, Prism Armor and Bad Dreams receive rainbow-specific effects.',
				'Magical Seed raises Special Attack and creates a Wish worth 75% of maximum HP.',
				'Sandstorm, Hail/Snow, Sandsear Storm and Light That Burns the Sky destroy the field; damaging transition moves receive a 1.3× boost where defined.',
			] },
		],
	},
	corrosivemistfield: {
		name: 'Corrosive Mist Field',
		kind: 'Field',
		sections: [
			{ title: 'Damage, typing and residual effects', effects: [
				'Fire-type attacks deal 1.5× damage. Special Flying-type attacks gain Poison as an additional type. The natural type is Poison.',
				'At the end of each turn, non-Poison/non-Steel active Pokémon are poisoned unless Neutralizing Gas is active.',
				'Misty Terrain cannot overlay this field.',
			] },
			{ title: 'Moves', effects: [
				'Apple Acid, Bubble, Bubble Beam and Sparkling Aria deal 1.5× damage and gain Poison typing. Misty Explosion does so while its user is grounded. Acid Spray, Clear Smog and Smog deal 1.5× damage.',
				'Acid Armor raises Defense by 3; Barb Barrage and Venoshock always receive their doubled-power condition; Smokescreen lowers Accuracy by 2; Toxic has 100% accuracy; Venom Drench works regardless of status.',
				'Energy Ball gains Poison typing. Floral Healing and Life Dew poison the healed target. Aqua Ring damages non-Poison/non-Steel users instead of healing them.',
			] },
			{ title: 'Abilities and item', effects: [
				'Merciless, Poison Heal and Toxic Boost activate from the field. Aftermath deals 50% maximum HP; Corrosion boosts the user’s damage by 1.5×; Toxic Chain can poison Poison- and Steel-types; Water Compaction activates on switch-in.',
				'Dry Skin loses 1/8 maximum HP each turn; Poison-types with Dry Skin heal instead and Steel-types are unaffected. Elemental Seed raises Attack and Special Attack by 1 stage and badly poisons its user.',
			] },
			{ title: 'Transitions and combustion', effects: [
				'Gravity changes it to Corrosive Field; Seed Flare changes it to Misty Terrain. Bleakwind Storm, Gust, Hurricane, Razor Wind, Twister and Supersonic Skystrike disperse it.',
				'Burning Jealousy, Eruption, Explosion, Fire Pledge, Flame Burst, Heat Wave, Incinerate, Lava Plume, Mind Blown, Searing Shot, Self-Destruct and Inferno Overdrive remove and combust it. Damp prevents the mass damage but not removal.',
				'Combustion KOs active Pokémon except those protected by Flash Fire, protection, Commander or a semi-invulnerable turn. Full-HP Sturdy and Endure users survive at 1 HP. Damaging transition moves receive a 1.3× boost.',
			] },
		],
	},
	corrosivefield: {
		name: 'Corrosive Field',
		kind: 'Field',
		sections: [{ title: 'Currently active mechanics', effects: [
			'Purify and Seed Flare clear Corrosive Field and create Grassy Terrain.',
			'The server currently has no other Corrosive Field battle modifiers implemented.',
		] }],
	},
	underwaterfield: {
		name: 'Underwater Field',
		kind: 'Field',
		sections: [
			{ title: 'Core rules', effects: [
				'Weather and terrains cannot be created. Misty Terrain cannot overlay this field.',
				'Water-type attacks deal 1.5× damage; Electric-type attacks deal 2× damage and cannot miss. Fire-type attacks fail.',
				'Ground-type moves gain Water as an additional type. Dragon Darts and Grav Apple become Water-type. Physical non-Water attacks from non-Water users deal 0.5× damage unless the user has EeleVate, Steelworker or Swift Swim.',
			] },
			{ title: 'Speed, residual effects and moves', effects: [
				'Non-Water Pokémon have 0.5× Speed unless they have EeleVate, Steelworker or Swift Swim.',
				'Non-Water Pokémon weak to Water take effectiveness-scaled damage each turn; Water Absorb, Dry Skin, Storm Drain, Swift Swim and Magic Guard prevent it. Magma Armor and Flame Body double this damage.',
				'Water Pulse and Jet Punch receive another 1.5× boost; Anchor Shot and Dragon Darts receive another 2× boost. Tar Shot and Spicy Extract fail.',
			] },
			{ title: 'Abilities, item and transitions', effects: [
				'Hydration, Schooling, Swift Swim, Torrent, Water Veil, Gulp Missile and related aquatic abilities receive underwater enhancements. Elemental Seed applies its Underwater effect.',
				'Dive, Sky Drop, Fly, Bounce, Shore Up and Triple Dive return the battle to Water Surface. Two Sludge Waves or one Acid Downpour pollute it into Murkwater Surface and KO vulnerable non-Poison/non-Steel active Pokémon.',
				'Damaging moves that perform a field transition receive a 1.3× boost.',
			] },
		],
	},
	icyfield: {
		name: 'Icy Field',
		kind: 'Field',
		sections: [
			{ title: 'Damage and typing', effects: [
				'Ice-type attacks deal 1.5× damage; Fire-type attacks deal 0.5× damage. Rock-type moves gain Ice as an additional type.',
				'Bitter Malice and Chilling Water receive a separate 1.5× boost. Scald, Steam Eruption and Hydro Steam receive a separate 0.5× reduction.',
				'Ice-types receive 1.5× Defense during Hail. Burn damage is reduced to 1/32 maximum HP.',
			] },
			{ title: 'Movement, moves, abilities and item', effects: [
				'Grounded users gain 1 Speed stage after a damaging contact priority move or Defense Curl, Feint, Lunge, Ice Ball, Rollout, Steamroller, Spin Out or Ice Spinner.',
				'Heatproof, Ice Body, Ice Scales, Liquid Voice, Refrigerate, Slush Rush and Snow Cloak receive icy-field enhancements. Hail and Snow last 8 turns.',
				'Elemental Seed applies its Icy Field effect. Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the Ice field effect.',
			] },
			{ title: 'Transitions', effects: [
				'Steam Eruption melts the ice immediately; two uses total of Scald, Hydro Steam or Matcha Gotcha also melt it. It reveals a prior Water/Murkwater Surface or otherwise becomes Water Surface.',
				'Dive breaks it from below when water is underneath. Earthquake, Bulldoze, Magnitude, Fissure and Tectonic Rage reveal underlying water; otherwise they place Spikes on both sides.',
				'Heat Wave, Eruption, Searing Shot, Flame Burst, Lava Plume, Fire Pledge, Mind Blown, Incinerate, Inferno Overdrive, Burning Jealousy, Magma Drift and Raging Fury remove it. Damaging transitions receive a 1.3× boost.',
			] },
		],
	},
	murkwatersurfacefield: {
		name: 'Murkwater Surface',
		kind: 'Field',
		sections: [
			{ title: 'Damage and typing', effects: [
				'Water- and Poison-type attacks deal 1.5× damage. Electric-type attacks against grounded targets deal 1.3× damage. Ground-type moves fail. The natural type is Poison.',
				'Water moves gain Poison as an additional type. Mud Bomb, Mud-Slap, Mud Shot, Mud Barrage and Thousand Waves become Water/Poison; Smack Down and Apple Acid gain Poison; Sludge Wave gains Water.',
				'Mud Bomb, Mud-Slap, Mud Shot, Mud Barrage, Smack Down, Acid, Acid Spray, Brine, Thousand Waves and Apple Acid receive another 1.5× move-specific boost.',
			] },
			{ title: 'Speed and residual effects', effects: [
				'Grounded non-Water Pokémon have 0.75× Speed unless they have Surge Surfer or Swift Swim.',
				'Vulnerable grounded Pokémon take Poison-effectiveness-scaled damage each turn. Dive makes this damage four times stronger; Dry Skin, Flame Body, Magma Armor and Water Absorb double it.',
				'Grounded Poison-types with Dry Skin or Water Absorb heal 1/8 maximum HP instead. Poison Heal restores 1/8 maximum HP. Poison- and Steel-types and listed immunity abilities avoid the field damage.',
			] },
			{ title: 'Moves, abilities and item', effects: [
				'Merciless always critically hits for grounded users. Toxic Boost supplies a 1.5× physical boost to grounded users. Gooey, Foam Spray, Stench, Acid Armor, Liquid Ooze and related Poison/water abilities receive field-specific effects.',
				'Spikes and Toxic Spikes disappear when the field begins. Shore Up becomes Water-type. Nature Power, Secret Power, Terrain Pulse, Camouflage, Mimicry and Shelter use the Poison field effect.',
				'Elemental Seed applies the Murkwater Surface effect.',
			] },
			{ title: 'Transitions', effects: [
				'Whirlpool or Purify immediately cleans it into Water Surface; Tidy Up adds 1 cleaning point and cleans it after two uses.',
				'Blizzard, Glaciate and Subzero Slammer freeze it into Icy Field. Damaging transition moves receive a 1.3× boost.',
			] },
		],
	},
	watersurfacefield: {
		name: 'Water Surface',
		kind: 'Field',
		sections: [
			{ title: 'Core rules', effects: [
				'Water-type attacks deal 1.5× damage. Electric-type attacks against grounded targets deal 1.5× damage; Fire-type attacks against grounded targets deal 0.5× damage. Ground-type moves fail.',
				'Whirlpool, Surf, Muddy Water, Dive, Sludge Wave, Octazooka, Origin Pulse, Hydro Vortex and Triple Dive receive a separate 1.2× boost.',
				'Grounded non-Water Pokémon have 0.75× Speed unless they have Surge Surfer or Swift Swim. The natural type is Water.',
			] },
			{ title: 'Moves, abilities and item', effects: [
				'Spikes and Toxic Spikes disappear when the field begins. Tar Shot is removed at the end of each turn. Whirlpool trapping damage is increased.',
				'Shore Up becomes Water-type; Splash lowers Accuracy; Dive executes in one turn. Gulp Missile always uses its Gulping form.',
				'Hydration, Schooling, Steam Engine, Swift Swim, Water Absorb and Water Veil receive Water Surface enhancements. Elemental Seed applies its Water Surface effect.',
			] },
			{ title: 'Transitions', effects: [
				'Gravity, Dive, Anchor Shot, Grav Apple and Triple Dive transform it into Underwater. Blizzard, Glaciate and Subzero Slammer freeze it into Icy Field.',
				'Sludge Wave adds 1 pollution point and Acid Downpour adds 2; at 2 points it becomes Murkwater Surface.',
				'Damaging moves that perform a field transition receive a 1.3× boost.',
			] },
		],
	},
	desertfield: {
		name: 'Desert Field',
		kind: 'Field',
		sections: [{ title: 'Currently active mechanics', effects: [
			'The server currently recognizes and displays Desert Field, but no additional battle modifiers are implemented for it yet.',
		] }],
	},
	concertvenue: {
		name: 'Concert Venue',
		kind: 'Field',
		sections: [{ title: 'Currently active mechanics', effects: [
			'The server currently recognizes and displays Concert Venue, but no additional battle modifiers are implemented for it yet.',
		] }],
	},
};

const FIELD_ALIASES: Record<string, string> = {
	electric: 'electricterrain',
	grassy: 'grassyterrain',
	misty: 'mistyterrain',
	psychic: 'psychicterrain',
	rainbow: 'rainbowfield',
	rainbowoverlay: 'rainbowterrain',
	forest: 'forestfield',
	swamp: 'swampfield',
	frozendimensional: 'frozendimensionalfield',
	haunted: 'hauntedfield',
	narcissa: 'narcissafield',
	blessed: 'blessedfield',
	corrosivemist: 'corrosivemistfield',
	corrosive: 'corrosivefield',
	underwater: 'underwaterfield',
	icy: 'icyfield',
	murkwater: 'murkwatersurfacefield',
	watersurface: 'watersurfacefield',
	desert: 'desertfield',
	concert: 'concertvenue',
};

function resolveField(target: string) {
	const id = toID(target);
	return FIELD_ALIASES[id] || (FIELD_INFO[id] ? id : '');
}

function currentEffects(room: Rooms.GameRoom) {
	let field = '';
	let terrain = '';
	for (const line of room.getLog(-1).split('\n')) {
		if (!line.startsWith('|-fieldstart|') && !line.startsWith('|-fieldend|')) continue;
		const [command, effectText] = line.slice(1).split('|');
		const text = effectText.trim();
		const effect = text.startsWith('move:') ?
			Dex.moves.get(text.slice(5)) : Dex.mod('rejuvenation').conditions.get(text);
		if (!effect.id) continue;
		const isTerrain = effect.id.endsWith('terrain');
		if (command === '-fieldstart') {
			if (isTerrain) terrain = effect.id;
			else if (effect.id.endsWith('field') || FIELD_INFO[effect.id]?.kind === 'Field') field = effect.id;
		} else if (isTerrain) {
			if (terrain === effect.id) terrain = '';
		} else if (field === effect.id) {
			field = '';
		}
	}
	return [field, terrain].filter(Boolean);
}

function renderFieldInfo(id: string) {
	const info = FIELD_INFO[id];
	if (!info) return '';
	const sourceSections = info.sections || [{ title: 'Battle mechanics', effects: info.effects || [] }];
	const sections = sourceSections.map(section => {
		const effects = section.effects.map(effect => `<li>${Utils.escapeHTML(effect)}</li>`).join('');
		return `<div><strong>${Utils.escapeHTML(section.title)}</strong><ul>${effects}</ul></div>`;
	}).join('');
	return `<section><strong>${Utils.escapeHTML(info.name)}</strong> <small>(${info.kind})</small>${sections}</section>`;
}

export const commands: Chat.ChatCommands = {
	fieldinfo(target, room) {
		this.runBroadcast();
		let ids: string[];
		if (target.trim()) {
			const id = resolveField(target);
			if (!id) throw new Chat.ErrorMessage(`Unknown field or terrain: "${target.trim()}".`);
			ids = [id];
		} else {
			room = this.requireRoom();
			if (!room.battle) throw new Chat.ErrorMessage('Use /fieldinfo without an argument inside a battle.');
			ids = currentEffects(room);
			if (!ids.length) return this.sendReplyBox('<strong>No active field or terrain.</strong>');
		}
		return this.sendReplyBox(ids.map(renderFieldInfo).join('<hr />'));
	},
	fieldinfohelp: [
		'/fieldinfo [field or terrain] - Shows the effects of the named field or terrain.',
		'/fieldinfo - In a battle, shows the active base field and terrain/overlay.',
	],
};
