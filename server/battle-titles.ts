/** Server-authorized, account-exclusive battle titles. */
import { FS } from '../lib';
import { toID } from '../sim/dex-data';

export const BATTLE_TITLES: { [id: string]: string } = {
	rebornphoenix: 'Reborn Phoenix',
};
const TITLES_FILE = 'config/battle-titles.json';
interface TitleAccount {
	titles: string[];
	selected: string;
}

export class BattleTitleRegistry {
	accounts: { [userid: string]: TitleAccount } = Object.create(null);

	constructor() {
		const text = FS(TITLES_FILE).readIfExistsSync();
		if (!text) return;
		const data = JSON.parse(text);
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			throw new Error(`${TITLES_FILE} must contain an object of account title assignments.`);
		}
		for (const [name, value] of Object.entries(data)) {
			const entry = value as Partial<TitleAccount> | null;
			if (!entry || !Array.isArray(entry.titles)) continue;
			const titles = entry.titles.filter(id => typeof id === 'string' && Object.prototype.hasOwnProperty.call(BATTLE_TITLES, id));
			const selected = typeof entry.selected === 'string' && titles.includes(entry.selected) ? entry.selected : '';
			this.accounts[toID(name)] = { titles: [...new Set(titles)], selected };
		}
	}

	save() {
		FS(TITLES_FILE).writeUpdate(() => JSON.stringify(this.accounts, null, 2) + '\n');
	}

	grant(userid: ID, title: string) {
		if (!Object.prototype.hasOwnProperty.call(BATTLE_TITLES, title)) throw new Error('Unknown battle title.');
		const account = this.accounts[userid] ||= { titles: [], selected: '' };
		if (!account.titles.includes(title)) account.titles.push(title);
		if (!account.selected) account.selected = title;
		this.save();
	}

	revoke(userid: ID, title: string) {
		const account = this.accounts[userid];
		if (!account) return;
		account.titles = account.titles.filter(id => id !== title);
		if (account.selected === title) account.selected = '';
		if (!account.titles.length) delete this.accounts[userid];
		this.save();
	}

	select(userid: ID, title: string) {
		const account = this.accounts[userid];
		if (title && (!account || !account.titles.includes(title))) return false;
		if (account) {
			account.selected = title;
			this.save();
		}
		return true;
	}

	get(user: Pick<User, 'id' | 'registered'> | null) {
		// Unregistered guests cannot claim another account's title by using its name.
		if (!user?.registered) return '';
		const account = this.accounts[user.id];
		if (!account || !account.titles.includes(account.selected)) return '';
		return Object.prototype.hasOwnProperty.call(BATTLE_TITLES, account.selected) ? account.selected : '';
	}
}

export const battleTitles = new BattleTitleRegistry();
