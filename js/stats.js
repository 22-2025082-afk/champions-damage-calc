/*
=========================================
stats.js（強化版）
能力値・種族値・ポイント管理
Version 0.1.0
=========================================
*/

/*
-----------------------------------------
定数
-----------------------------------------
*/
const MAX_TOTAL_POINTS = 66;
const MAX_PER_STAT = 32;

const STAT_KEYS = ["hp", "attack", "defense", "spattack", "spdefense", "speed"];

/*
-----------------------------------------
状態管理
-----------------------------------------
*/
let state = {
    pokemon: {
        attacker: null,
        defender: null
    },

    points: {
        attacker: initEmptyStats(),
        defender: initEmptyStats()
    }
};

/*
-----------------------------------------
初期化
-----------------------------------------
*/
function initEmptyStats() {

    const obj = {};

    STAT_KEYS.forEach(k => {
        obj[k] = 0;
    });

    return obj;
}

/*
-----------------------------------------
ポケモンセット
-----------------------------------------
*/
function setPokemon(target, pokemon) {

    if (!state.pokemon[target]) return;

    state.pokemon[target] = pokemon;

    console.log(`${target} ポケモン設定:`, pokemon);
}

/*
-----------------------------------------
ポイント更新
-----------------------------------------
*/
function setPoint(target, stat, value) {

    if (!state.points[target]) return;
    if (!STAT_KEYS.includes(stat)) return;

    value = Math.max(0, Math.min(MAX_PER_STAT, value));

    state.points[target][stat] = value;

    // 合計制限チェック
    enforceTotalLimit(target);

    updateUIStats(target);
}

/*
-----------------------------------------
合計制限（66）
-----------------------------------------
*/
function enforceTotalLimit(target) {

    let total = 0;

    const stats = state.points[target];

    for (let k in stats) {
        total += stats[k];
    }

    if (total <= MAX_TOTAL_POINTS) return;

    // 超えたら削る（最後に変更した分を優先的に減らす簡易処理）
    for (let k in stats) {
        if (stats[k] > 0) {
            stats[k]--;
            break;
        }
    }
}

/*
-----------------------------------------
能力値計算（最終）
-----------------------------------------
*/
function calcStat(base, target, stat, nature = 1.0) {

    const bonus = state.points[target][stat] || 0;

    let value = (base + 20 + bonus) * nature;

    return Math.floor(value);
}

/*
-----------------------------------------
HP専用
-----------------------------------------
*/
function calcHP(base, target) {

    const bonus = state.points[target].hp || 0;

    return base + 75 + bonus;
}

/*
-----------------------------------------
UI更新（呼び出し用）
-----------------------------------------
*/
function updateUIStats(target) {

    const el = document.getElementById(target + "Stats");

    if (!el) return;

    const points = state.points[target];

    let total = 0;

    for (let k in points) {
        total += points[k];
    }

    el.innerHTML = `
        <div style="margin-top:10px;">
            <b>合計ポイント:</b> ${total} / ${MAX_TOTAL_POINTS}
        </div>
    `;
}

/*
-----------------------------------------
外部公開用API
-----------------------------------------
*/
function getState() {
    return state;
}
