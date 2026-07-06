/*
=========================================
damage.js（強化版）
Pokémon Champions Damage System
Version 0.1.0
=========================================
*/

/*
-----------------------------------------
ダメージ計算メイン
-----------------------------------------
*/
function calcDamage(params) {

    const {
        level = 50,
        power = 80,
        attack = 100,
        defense = 100,
        stab = 1.0,
        type = 1.0,
        random = true
    } = params;

    // 基本計算
    let base =
        Math.floor(
            Math.floor(
                Math.floor((2 * level) / 5 + 2) * power * attack / defense
            ) / 50
        ) + 2;

    // 補正
    let modifier = stab * type;

    let damage = base * modifier;

    // 乱数（85%〜100%）
    if (random) {
        const rand = Math.floor(Math.random() * 16) + 85;
        damage = damage * rand / 100;
    }

    return Math.floor(damage);
}

/*
-----------------------------------------
タイプ相性（仮）
-----------------------------------------
*/
function getTypeMultiplier(moveType, defenderTypes = []) {

    // 超簡易版（あとで拡張）
    if (defenderTypes.includes("fire") && moveType === "water") return 2;
    if (defenderTypes.includes("water") && moveType === "electric") return 2;

    return 1;
}

/*
-----------------------------------------
性格補正
-----------------------------------------
*/
function getNatureMultiplier(nature, statType) {

    if (!nature) return 1.0;

    if (nature.up === statType) return 1.1;
    if (nature.down === statType) return 0.9;

    return 1.0;
}

/*
-----------------------------------------
STAB（タイプ一致）
-----------------------------------------
*/
function getSTAB(moveType, pokemonTypes) {

    if (!pokemonTypes) return 1.0;

    if (pokemonTypes.includes(moveType)) return 1.5;

    return 1.0;
}

/*
-----------------------------------------
結果表示
-----------------------------------------
*/
function showDamageResult(min, max) {

    const el = document.getElementById("damageResult");

    if (!el) return;

    el.innerHTML = `
        <div>
            <p>最小ダメージ: ${min}</p>
            <p>最大ダメージ: ${max}</p>
        </div>
    `;
}

/*
-----------------------------------------
テスト用（単体確認）
-----------------------------------------
*/
function testDamage() {

    const dmg = calcDamage({
        level: 50,
        power: 80,
        attack: 120,
        defense: 100,
        stab: 1.5,
        type: 1.0,
        random: true
    });

    showDamageResult(
        Math.floor(dmg * 0.85),
        dmg
    );
}
