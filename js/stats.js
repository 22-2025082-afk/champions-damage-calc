/*
=========================================
stats.js
能力値計算（Pokémon Champions用）
Version 0.1.0
=========================================
*/

/*
-----------------------------------------
能力ポイント上限
-----------------------------------------
*/
const MAX_TOTAL_POINTS = 66;
const MAX_PER_STAT = 32;

/*
-----------------------------------------
能力値のベース構造
-----------------------------------------
*/
const stats = ["hp", "attack", "defense", "spattack", "spdefense", "speed"];

/*
-----------------------------------------
能力ポイントを保持するオブジェクト
-----------------------------------------
*/
let pointData = {
    hp: 0,
    attack: 0,
    defense: 0,
    spattack: 0,
    spdefense: 0,
    speed: 0
};

/*
-----------------------------------------
合計ポイントを計算
-----------------------------------------
*/
function getTotalPoints() {

    let total = 0;

    for (let key in pointData) {
        total += pointData[key];
    }

    return total;
}

/*
-----------------------------------------
ポイント更新（後でスライダーと連動）
-----------------------------------------
*/
function setPoint(stat, value) {

    if (!stats.includes(stat)) return;

    if (value < 0) value = 0;
    if (value > MAX_PER_STAT) value = MAX_PER_STAT;

    pointData[stat] = value;

    // 合計制限チェック（超えたら戻す）
    if (getTotalPoints() > MAX_TOTAL_POINTS) {
        pointData[stat] -= 1;
    }

    console.log("ポイント更新:", pointData);
}

/*
-----------------------------------------
能力値計算（ここが本体）
-----------------------------------------
*/
function calcHP(base) {
    return base + 75 + pointData.hp;
}

function calcStat(base, stat, natureMultiplier = 1.0) {

    let value = (base + 20 + pointData[stat]) * natureMultiplier;

    return Math.floor(value);
}
