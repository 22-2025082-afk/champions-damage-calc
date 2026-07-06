/*
=========================================
script.js（接続パート）
Pokémon Champions Damage Calculator
Version 0.1.0
=========================================
*/

window.addEventListener("load", initApp);

/*
-----------------------------------------
初期化
-----------------------------------------
*/
function initApp() {

    console.log("App init v0.1.0");

    bindPokemonInputs();

    bindSliders();

    console.log("初期化完了");
}

/*
-----------------------------------------
ポケモン入力 → stats.jsへ接続
-----------------------------------------
*/
function bindPokemonInputs() {

    const attacker = document.getElementById("attackerPokemon");
    const defender = document.getElementById("defenderPokemon");

    if (attacker) {
        attacker.addEventListener("change", () => {
            handlePokemon("attacker", attacker.value);
        });
    }

    if (defender) {
        defender.addEventListener("change", () => {
            handlePokemon("defender", defender.value);
        });
    }
}

/*
-----------------------------------------
ポケモン処理
-----------------------------------------
*/
function handlePokemon(target, name) {

    const p = getPokemon(name);

    if (!p) {
        console.log("見つからない:", name);
        return;
    }

    setPokemon(target, p);

    updateDamage();
}

/*
-----------------------------------------
スライダー接続
-----------------------------------------
*/
function bindSliders() {

    document.addEventListener("input", (e) => {

        if (e.target.type !== "range") return;

        const stat = e.target.dataset.stat;
        const target = e.target.dataset.target;
        const value = Number(e.target.value);

        if (typeof setPoint === "function") {
            setPoint(target, stat, value);
        }

        updateDamage();
    });
}

/*
-----------------------------------------
ダメージ更新
-----------------------------------------
*/
function updateDamage() {

    const atk = getState().pokemon.attacker;
    const def = getState().pokemon.defender;

    if (!atk || !def) return;

    const attackStat = calcStat(
        atk.attack,
        "attacker",
        "attack",
        1.0
    );

    const defenseStat = calcStat(
        def.defense,
        "defender",
        "defense",
        1.0
    );

    const dmg = calcDamage({
        level: 50,
        power: 80,
        attack: attackStat,
        defense: defenseStat,
        modifier: 1.0
    });

    showDamageResult({
        min: Math.floor(dmg * 0.85),
        max: dmg
    });
}
