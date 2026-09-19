import { battleNameColors } from './battle-name-colors';
import { BATTLE_TITLES, battleTitles } from './battle-titles';

export function sendBattleCosmetics(user: User, userid = user.id) {
	const titleAccount = battleTitles.accounts[userid];
	const colorAccount = battleNameColors.accounts[userid];
	user.send(`|battlecosmetics|${JSON.stringify({
		titles: titleAccount?.titles.map(id => ({ id, name: BATTLE_TITLES[id] })).filter(entry => entry.name) || [],
		selectedTitle: titleAccount?.selected || '',
		colors: colorAccount?.colors || [],
		selectedColor: colorAccount?.selected || '',
	})}`);
}
