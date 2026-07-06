/*
=========================================
damage.js（最終統合版）
Pokémon Champions Damage Engine
Version 0.1.0
=========================================
*/

/*
-----------------------------------------
メインダメージ計算
-----------------------------------------
*/
function calcDamageFull(params) {

    const {
        level = 50,
        move,
        attacker,
        defender,
        attackStat,
        defenseStat,
        natureMultiplier = 1.0
    } = params;

    if (!move || !attacker || !defender) return 0;

    // STAB
    const stab = getSTAB(move.type, attacker.types);

    // タイプ相性
    const type = getTypeMultiplier(move.type, defender.types);

    // ベース計算
    let base =
        Math.floor(
            Math.floor(
                Math.floor((2 * level) / 5 + 2) *
                move.power *
                attackStat /
                defenseStat
            ) / 50
        ) + 2;

    // 全補正
    let modifier = stab * type * natureMultiplier;

    let damage = base * modifier;

    // 乱数（85〜100%）
    const rand = Math.floor(Math.random() * 16) + 85;
    damage = damage * rand / 100;

    return Math.floor(damage);
}

/*
-----------------------------------------
タイプ相性（強化版）
-----------------------------------------
*/
function getTypeMultiplier(moveType, defenderTypes = []) {

    let multiplier = 1;

    defenderTypes.forEach(type => {

        // 超簡易版（後で完全化可能）
        if (moveType === "fire" && type === "grass") multiplier *= 2;
        if (moveType === "water" && type === "fire") multiplier *= 2;
        if (moveType === "electric" && type === "water") multiplier *= 2;

        if (moveType === "fire" && type === "water") multiplier *= 0.5;
        if (moveType === "grass" && type === "fire") multiplier *= 0.5;
        if (moveType === "electric" && type === "ground") multiplier *= 0;

    });

    return multiplier;
}

/*
-----------------------------------------
STAB
-----------------------------------------
*/
function getSTAB(moveType, types) {

    if (!types) return 1.0;

    return types.includes(moveType) ? 1.5 : 1.0;
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
ダメージレンジ表示
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
簡易実行（テスト用）
-----------------------------------------
*/
function testFullDamage() {

    const dmg = calcDamageFull({
        level: 50,
        move: getMove("かえんほうしゃ"),
        attacker: getPokemon("リザードン"),
        defender: getPokemon("ミミッキュ"),
        attackStat: 120,
        defenseStat: 100,
        natureMultiplier: 1.1
    });

    showDamageResult(
        Math.floor(dmg * 0.85),
        dmg
    );
}
