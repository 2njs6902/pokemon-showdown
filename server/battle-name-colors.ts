/** Server-authorized custom name colors used only in battles and their replays. */
import { FS } from '../lib';
import { toID } from '../sim/dex-data';

const COLORS_FILE = 'config/battle-name-colors.json';

export function normalizeBattleNameColor(color: string) {
	const normalized = color.trim().replace(/^#/, '').toUpperCase();
	return /^[0-9A-F]{6}$/.test(normalized) ? normalized : '';
}

interface NameColorAccount {
	colors: string[];
	selected: string;
}

export class BattleNameColorRegistry {
	accounts: { [userid: string]: NameColorAccount } = Object.create(null);

	constructor() {
		const text = FS(COLORS_FILE).readIfExistsSync();
		if (!text) return;
		const data = JSON.parse(text);
		if (!data || typeof data !== 'object' || Array.isArray(data)) {
			throw new Error(`${COLORS_FILE} must contain an object of account color assignments.`);
		}
		for (const [name, value] of Object.entries(data)) {
			// Migrate assignments made before multiple owned colors were supported.
			if (typeof value === 'string') {
				const color = normalizeBattleNameColor(value);
				if (color) this.accounts[toID(name)] = { colors: [color], selected: color };
				continue;
			}
			if (!value || typeof value !== 'object' || !Array.isArray((value as Partial<NameColorAccount>).colors)) continue;
			const colors = [...new Set((value as NameColorAccount).colors.map(normalizeBattleNameColor).filter(Boolean))];
			const selected = normalizeBattleNameColor((value as NameColorAccount).selected || '');
			if (colors.length) this.accounts[toID(name)] = { colors, selected: colors.includes(selected) ? selected : '' };
		}
	}

	save() {
		FS(COLORS_FILE).writeUpdate(() => JSON.stringify(this.accounts, null, 2) + '\n');
	}

	grant(userid: ID, color: string) {
		const normalized = normalizeBattleNameColor(color);
		if (!normalized) throw new Error('Battle name colors must be six-digit hexadecimal colors.');
		const account = this.accounts[userid] ||= { colors: [], selected: '' };
		if (!account.colors.includes(normalized)) account.colors.push(normalized);
		if (!account.selected) account.selected = normalized;
		this.save();
	}

	revoke(userid: ID, color: string) {
		const normalized = normalizeBattleNameColor(color);
		const account = this.accounts[userid];
		if (!normalized || !account) return;
		account.colors = account.colors.filter(owned => owned !== normalized);
		if (account.selected === normalized) account.selected = '';
		if (!account.colors.length) delete this.accounts[userid];
		this.save();
	}

	select(userid: ID, color: string) {
		const normalized = color ? normalizeBattleNameColor(color) : '';
		const account = this.accounts[userid];
		if (normalized && (!account || !account.colors.includes(normalized))) return false;
		if (account) {
			account.selected = normalized;
			this.save();
		}
		return true;
	}

	get(user: Pick<User, 'id' | 'registered'> | null) {
		if (!user?.registered) return '';
		const account = this.accounts[user.id];
		return account?.colors.includes(account.selected) ? account.selected : '';
	}
}

export const battleNameColors = new BattleNameColorRegistry();
