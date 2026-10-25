import { Utils } from '../../lib';

interface FieldInfo {
	name: string;
	kind: 'Field' | 'Terrain/overlay';
	effects: string[];
}

const FIELD_INFO: Record<string, FieldInfo> = {
	electricterrain: {
		name: 'Electric Terrain',
		kind: 'Terrain/overlay',
		effects: [
			'Boosts grounded Electric-type attacks; the multiplier depends on whether the terrain is unlayered or over a field.',
			'Prevents grounded Pokémon from falling asleep. Mud Sport disables its effects while Mud Sport remains active.',
			'Several Rejuvenation moves and abilities gain terrain-specific effects, and Spikes become electrified.',
		],
	},
	grassyterrain: {
		name: 'Grassy Terrain',
		kind: 'Terrain/overlay',
		effects: [
			'Boosts grounded Grass-type attacks and restores grounded Pokémon each turn.',
			'Weakens Earthquake, Bulldoze, and Magnitude, with additional Rejuvenation-specific move and ability interactions.',
		],
	},
	mistyterrain: {
		name: 'Misty Terrain',
		kind: 'Terrain/overlay',
		effects: [
			'Weakens Dragon-type attacks and provides Rejuvenation-specific protection and move interactions.',
			'Can be blown away, corroded into Corrosive Mist, or combusted by the appropriate moves.',
		],
	},
	psychicterrain: {
		name: 'Psychic Terrain',
		kind: 'Terrain/overlay',
		effects: [
			'Boosts grounded Psychic-type attacks and blocks priority attacks against grounded targets.',
			'Provides Rejuvenation-specific move, ability, stat, natural-type, and seed interactions.',
		],
	},
	rainbowterrain: {
		name: 'Rainbow Field (overlay)',
		kind: 'Terrain/overlay',
		effects: [
			'Listed rainbow-charged attacks receive a 1.5× boost.',
			'Special Normal-type attacks become a random non-Normal, non-Stellar type and receive a 1.3× boost.',
			'Secondary-effect chances are doubled; this stacks with Serene Grace except for flinching effects.',
			'Solar Beam and Solar Blade require no charge turn.',
			'Its natural type is Dragon for Camouflage, Mimicry, Terrain Pulse, Shelter, Nature Power, and Secret Power.',
		],
	},
	forestfield: {
		name: 'Forest Field',
		kind: 'Field',
		effects: [
			'Uses the Forest Field move, ability, natural-type, transition, and seed effects implemented by the Rejuvenation mod.',
			'Its natural type is Bug.',
		],
	},
	swampfield: {
		name: 'Swamp Field',
		kind: 'Field',
		effects: [
			'Applies the Swamp Field speed rule and its Water-, Ground-, Poison-, move-, ability-, and trapping interactions.',
			'Its natural type is Water.',
		],
	},
	frozendimensionalfield: {
		name: 'Frozen Dimensional Field',
		kind: 'Field',
		effects: [
			'Applies the Frozen Dimensional Field effects implemented by the Rejuvenation mod.',
			'Cannot be overlaid by Misty Terrain.',
		],
	},
	hauntedfield: {
		name: 'Haunted Field',
		kind: 'Field',
		effects: [
			'Ghost-type attacks are empowered and can affect Normal-type Pokémon.',
			'Fire and bone-themed moves, several Ghost-related abilities, sleeping Pokémon, and numerous status moves receive special effects.',
			'Its natural type is Ghost. Holy moves transform it into Blessed Field; Flash and Dazzling Gleam destroy it.',
		],
	},
	narcissafield: {
		name: 'Haunted Field (Narcissa variation)',
		kind: 'Field',
		effects: [
			'Has the same effects as Haunted Field.',
			'Unlike ordinary Haunted Field, Flash and Dazzling Gleam transform it into Forest Field.',
		],
	},
	blessedfield: {
		name: 'Blessed Field',
		kind: 'Field',
		effects: ['Applies the Blessed Field effects currently implemented by the Rejuvenation mod.'],
	},
	rainbowfield: {
		name: 'Rainbow Field',
		kind: 'Field',
		effects: [
			'Listed rainbow-charged attacks receive a 1.5× boost; listed dark attacks are reduced to 0.5×.',
			'Special Normal-type attacks become a random non-Normal, non-Stellar type and receive a 1.5× boost.',
			'Secondary-effect chances are doubled; this stacks with Serene Grace except for flinching effects.',
			'Its natural type is Dragon. Solar Beam and Solar Blade require no charge turn.',
			'Cloud Nine, Wonder Skin, Marvel Scale, Soul-Heart, Pastel Veil, and Prism Armor receive special effects.',
			'Cosmic Power, Meditate, Aurora Veil, Life Dew, Wish, Nightmare, Bad Dreams, Sonic Boom, and Weather Ball are modified.',
			'Sleeping Pokémon recover 1/16 maximum HP each turn. Magical Seed raises Special Attack and applies a 75% Wish.',
			'Sand, Hail, Snow, Sandsear Storm, and Light That Burns the Sky destroy the base field.',
		],
	},
	corrosivemistfield: {
		name: 'Corrosive Mist Field',
		kind: 'Field',
		effects: [
			'Boosts Fire-type attacks and gives special Flying-type attacks an additional Poison typing.',
			'Poisons vulnerable active Pokémon each turn and enables numerous Poison-related move and ability effects.',
			'Its natural type is Poison and Misty Terrain cannot overlay it.',
			'Can be dispersed, combusted, purified, or transformed by its implemented transition moves.',
		],
	},
	corrosivefield: {
		name: 'Corrosive Field',
		kind: 'Field',
		effects: ['Applies the Corrosive Field effects currently implemented by the Rejuvenation mod.'],
	},
	underwaterfield: {
		name: 'Underwater Field',
		kind: 'Field',
		effects: [
			'Applies the Underwater Field effects currently implemented by the Rejuvenation mod.',
			'Misty Terrain cannot overlay it.',
		],
	},
	icyfield: {
		name: 'Icy Field',
		kind: 'Field',
		effects: ['Applies the Icy Field effects currently implemented by the Rejuvenation mod.'],
	},
	murkwatersurfacefield: {
		name: 'Murkwater Surface',
		kind: 'Field',
		effects: [
			'Its natural type is Poison. Water moves gain Poison as an additional type; listed mud moves and Smack Down also gain Poison, while Sludge Wave gains Water.',
			'Water- and Poison-type attacks gain 1.5x power. Electric attacks gain 1.3x power against grounded targets. Ground-type attacks fail.',
			'Grounded non-Water Pokémon lose 25% Speed unless they have Surge Surfer or Swift Swim.',
			'At the end of each turn, vulnerable grounded Pokémon take Poison-type-scaled toxic-water damage. Dive and certain abilities increase it.',
			'Activates the listed Poison/water abilities and modifies Gooey, Foam Spray, Stench, Acid Armor, Liquid Ooze, Secret Power, and Elemental Seed.',
			'Whirlpool, Purify, or two uses of Tidy Up clean it into Water Surface. Blizzard, Glaciate, and Subzero Slammer freeze it into Icy Field.',
		],
	},
	watersurfacefield: {
		name: 'Water Surface',
		kind: 'Field',
		effects: [
			'Applies the Water Surface speed rule and its Water-based move, trapping, status, ability, and hazard interactions.',
			'Its natural type is Water.',
			'Can transition into Underwater, Icy Field, or Murkwater Surface through the implemented moves.',
		],
	},
	desertfield: {
		name: 'Desert Field',
		kind: 'Field',
		effects: ['Applies the Desert Field effects currently implemented by the Rejuvenation mod.'],
	},
	concertvenue: {
		name: 'Concert Venue',
		kind: 'Field',
		effects: ['Applies the Concert Venue effects currently implemented by the Rejuvenation mod.'],
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
	const effects = info.effects.map(effect => `<li>${Utils.escapeHTML(effect)}</li>`).join('');
	return `<section><strong>${Utils.escapeHTML(info.name)}</strong> <small>(${info.kind})</small><ul>${effects}</ul></section>`;
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
