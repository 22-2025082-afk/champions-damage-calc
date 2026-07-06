/*
=========================================
damage.js
ダメージ計算（Pokémon Champions）
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
        power = 50,
        attack = 100,
        defense = 100,
        modifier = 1.0
    } = params;

    // ポケモン基本ダメージ式（簡易版）
    const base =
        Math.floor(
            Math.floor(
                Math.floor((2 * level) / 5 + 2) * power * attack / defense
            ) / 50
        ) + 2;

    return Math.floor(base * modifier);
}

/*
-----------------------------------------
結果表示（UI用）
-----------------------------------------
*/
function showDamageResult(result) {

    const el = document.getElementById("damageResult");

    if (!el) return;

    el.innerHTML = `
        <div>
            <p>最小ダメージ: ${result.min}</p>
            <p>最大ダメージ: ${result.max}</p>
        </div>
    `;
}

/*
-----------------------------------------
テスト用ダメージ表示
-----------------------------------------
*/
function testDamage() {

    const dmg = calcDamage({
        level: 50,
        power: 80,
        attack: 120,
        defense: 100,
        modifier: 1.0
    });

    showDamageResult({
        min: Math.floor(dmg * 0.85),
        max: dmg
    });
}
