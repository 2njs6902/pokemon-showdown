import { BATTLE_TITLES, battleTitles } from '../battle-titles';
import { sendBattleCosmetics } from '../battle-cosmetics';

function titleID(text: string) {
	const id = toID(text);
	return id === 'rebornpheonix' ? 'rebornphoenix' : id;
}

export const commands: Chat.ChatCommands = {
	battletitle: {
		''(target, room, user) {
			if (!user.registered) return this.errorReply('Log into your registered account to use battle titles.');
			const account = battleTitles.accounts[user.id];
			const owned = account?.titles.map(id => `${BATTLE_TITLES[id]} (${id})`).join(', ') || 'None';
			this.sendReply(`Your battle titles: ${owned}. Selected: ${BATTLE_TITLES[account?.selected || ''] || 'None'}.`);
			this.sendReply('Use /battletitle set TITLE or /battletitle set none. Changes apply to future battles.');
		},
		list() {
			this.sendReply(`Available titles: ${Object.entries(BATTLE_TITLES).map(([id, name]) => `${name} (${id})`).join(', ')}`);
		},
		set(target, room, user) {
			if (!user.registered) return this.errorReply('Log into your registered account to use battle titles.');
			const title = toID(target) === 'none' ? '' : titleID(target);
			if (!target.trim()) return this.parse('/help battletitle');
			if (title && !Object.prototype.hasOwnProperty.call(BATTLE_TITLES, title)) return this.errorReply('Unknown title. Use /battletitle list.');
			if (!battleTitles.select(user.id, title)) return this.errorReply('You have not been granted that title.');
			sendBattleCosmetics(user);
			this.sendReply(`Battle title set to ${BATTLE_TITLES[title] || 'None'}. This applies to future battles.`);
		},
		grant(target) {
			this.checkCan('console');
			const [name, titleText, extra] = target.split(',').map(part => part.trim());
			const userid = toID(name);
			const title = titleID(titleText || '');
			if (!userid || !title || extra !== undefined) return this.parse('/help battletitle');
			if (!Object.prototype.hasOwnProperty.call(BATTLE_TITLES, title)) return this.errorReply('Unknown title. Use /battletitle list.');
			battleTitles.grant(userid, title);
			const targetUser = Users.get(userid);
			if (targetUser) sendBattleCosmetics(targetUser);
			this.globalModlog('BATTLE TITLE GRANT', userid, title);
			this.sendReply(`Granted ${BATTLE_TITLES[title]} to ${userid}. The player must log into that account to display it.`);
		},
		revoke(target) {
			this.checkCan('console');
			const [name, titleText, extra] = target.split(',').map(part => part.trim());
			const userid = toID(name);
			const title = titleID(titleText || '');
			if (!userid || !title || extra !== undefined) return this.parse('/help battletitle');
			if (!Object.prototype.hasOwnProperty.call(BATTLE_TITLES, title)) return this.errorReply('Unknown title. Use /battletitle list.');
			battleTitles.revoke(userid, title);
			const targetUser = Users.get(userid);
			if (targetUser) sendBattleCosmetics(targetUser);
			this.globalModlog('BATTLE TITLE REVOKE', userid, title);
			this.sendReply(`Revoked ${BATTLE_TITLES[title]} from ${userid}. This applies to future battles.`);
		},
	},
	battletitlehelp: [
		'/battletitle - Shows your owned and selected title.',
		'/battletitle list - Lists available titles.',
		'/battletitle set TITLE - Selects a title you own. Use none to hide your title.',
		'/battletitle grant USER, TITLE - Grants an exclusive title. Requires console permission (~).',
		'/battletitle revoke USER, TITLE - Revokes a title. Requires console permission (~).',
		'Titles are saved in config/battle-titles.json. Changes apply to future battles, not existing replays.',
	],
};
