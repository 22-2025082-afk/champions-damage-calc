/*
=========================================
script.js（最終接続）
Pokémon Champions
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

    console.log("App ready");

    bindPokemonInputs();
    bindMoveInput();
    bindSliders();
}

/*
-----------------------------------------
ポケモン入力
-----------------------------------------
*/
function bindPokemonInputs() {

    const attacker = document.getElementById("attackerPokemon");
    const defender = document.getElementById("defenderPokemon");

    attacker.addEventListener("change", () => {
        handlePokemon("attacker", attacker.value);
    });

    defender.addEventListener("change", () => {
        handlePokemon("defender", defender.value);
    });
}

/*
-----------------------------------------
ポケモン処理
-----------------------------------------
*/
function handlePokemon(target, name) {

    const p = getPokemon(name);

    if (!p) {
        console.log("未発見:", name);
        return;
    }

    setPokemon(target, p);

    updateUI();
}

/*
-----------------------------------------
技入力（追加）
-----------------------------------------
*/
function bindMoveInput() {

    const moveInput = document.getElementById("moveName");

    if (!moveInput) return;

    moveInput.addEventListener("change", () => {

        updateUI();
    });
}

/*
-----------------------------------------
スライダー
-----------------------------------------
*/
function bindSliders() {

    document.addEventListener("input", (e) => {

        if (e.target.type !== "range") return;

        const stat = e.target.dataset.stat;
        const target = e.target.dataset.target;
        const value = Number(e.target.value);

        setPoint(target, stat, value);

        updateUI();
    });
}

/*
-----------------------------------------
UI更新（完全統合）
-----------------------------------------
*/
function updateUI() {

    const state = getState();

    const atk = state.pokemon.attacker;
    const def = state.pokemon.defender;

    if (!atk || !def) return;

    const moveName = document.getElementById("moveName")?.value;
    const move = getMove(moveName);

    if (!move) return;

    const attackStat = calcStat(atk.attack, "attacker", "attack", 1.0);
    const defenseStat = calcStat(def.defense, "defender", "defense", 1.0);

    const dmg = calcDamageFull({
        level: 50,
        move,
        attacker: atk,
        defender: def,
        attackStat,
        defenseStat,
        natureMultiplier: 1.0
    });

    showDamageResult(
        Math.floor(dmg * 0.85),
        dmg
    );

    updateDisplay(state);
}

/*
-----------------------------------------
表示更新
-----------------------------------------
*/
function updateDisplay(state) {

    const el = document.getElementById("damageResult");

    const atk = state.pokemon.attacker;
    const def = state.pokemon.defender;

    if (!atk || !def) return;

    el.innerHTML = `
        <div>
            <p>攻撃: ${atk.name}</p>
            <p>防御: ${def.name}</p>
        </div>
    `;
}
