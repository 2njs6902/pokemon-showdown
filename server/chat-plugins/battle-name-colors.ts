import { battleNameColors, normalizeBattleNameColor } from '../battle-name-colors';
import { sendBattleCosmetics } from '../battle-cosmetics';

export const commands: Chat.ChatCommands = {
	battlecosmetics(target, room, user) {
		sendBattleCosmetics(user);
	},
	battlenamecolor: {
		set(target, room, user) {
			if (!user.registered) return this.errorReply('Log into your registered account to use battle name colors.');
			const color = toID(target) === 'none' ? '' : normalizeBattleNameColor(target);
			if (!target.trim() || (color === '' && toID(target) !== 'none')) return this.parse('/help battlenamecolor');
			if (!battleNameColors.select(user.id, color)) return this.errorReply('You have not been granted that color.');
			sendBattleCosmetics(user);
			this.sendReply(`Battle name color set to ${color ? `#${color}` : 'None'}. This applies to future battles.`);
		},
		grant(target) {
			this.checkCan('console');
			const [name, colorText, extra] = target.split(',').map(part => part.trim());
			const userid = toID(name);
			const color = normalizeBattleNameColor(colorText || '');
			if (!userid || !color || extra !== undefined) return this.parse('/help battlenamecolor');
			battleNameColors.grant(userid, color);
			const targetUser = Users.get(userid);
			if (targetUser) sendBattleCosmetics(targetUser);
			this.globalModlog('BATTLE NAME COLOR GRANT', userid, `#${color}`);
			this.sendReply(`Set ${userid}'s battle name color to #${color}. This applies to future battles.`);
		},
		revoke(target) {
			this.checkCan('console');
			const [name, colorText, extra] = target.split(',').map(part => part.trim());
			const userid = toID(name);
			const color = normalizeBattleNameColor(colorText || '');
			if (!userid || !color || extra !== undefined) return this.parse('/help battlenamecolor');
			battleNameColors.revoke(userid, color);
			const targetUser = Users.get(userid);
			if (targetUser) sendBattleCosmetics(targetUser);
			this.globalModlog('BATTLE NAME COLOR REVOKE', userid, `#${color}`);
			this.sendReply(`Revoked #${color} from ${userid}. This applies to future battles.`);
		},
	},
	battlenamecolorhelp: [
		'/battlenamecolor set HEX - Selects a color you own. Use none to hide your custom color.',
		'/battlenamecolor grant USER, HEX - Assigns a six-digit battle name color. Requires console permission (~).',
		'/battlenamecolor revoke USER, HEX - Removes an owned battle name color. Requires console permission (~).',
		'Colors are saved in config/battle-name-colors.json and appear only in new battles and their replays.',
	],
};

export const handlers: Chat.Handlers = {
	onRename(user, oldID, newID) {
		sendBattleCosmetics(user, newID);
	},
};
