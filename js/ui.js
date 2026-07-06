/*
=========================================
ui.js（仕上げ版）
Pokémon Champions UI System
Version 0.1.0
=========================================
*/

window.addEventListener("load", initUI);

/*
-----------------------------------------
初期化
-----------------------------------------
*/
function initUI() {

    console.log("UI init complete");

    setupStatsUI();
    bindGlobalEvents();
    updateAllUI();
}

/*
-----------------------------------------
スライダーUI生成
-----------------------------------------
*/
function setupStatsUI() {

    ["attacker", "defender"].forEach(target => {

        const el = document.getElementById(target + "Stats");

        if (!el) return;

        el.innerHTML = createStatUI(target);
    });
}

/*
-----------------------------------------
ステータスUI生成
-----------------------------------------
*/
function createStatUI(target) {

    const labels = {
        hp: "HP",
        attack: "攻撃",
        defense: "防御",
        spattack: "特攻",
        spdefense: "特防",
        speed: "素早さ"
    };

    let html = `<div class="stat-block">`;

    for (let key in labels) {

        html += `
        <div class="form-group">
            <label>${labels[key]}</label>

            <input type="range"
                min="0"
                max="32"
                value="0"
                data-stat="${key}"
                data-target="${target}">

            <div>
                値: <span id="${target}-${key}-value">0</span>
            </div>
        </div>
        `;
    }

    html += `</div>`;

    return html;
}

/*
-----------------------------------------
イベントまとめ管理
-----------------------------------------
*/
function bindGlobalEvents() {

    // スライダー
    document.addEventListener("input", handleSliderInput);

    // ポケモン入力
    bindPokemonInputs();
}

/*
-----------------------------------------
スライダー処理
-----------------------------------------
*/
function handleSliderInput(e) {

    if (e.target.type !== "range") return;

    const stat = e.target.dataset.stat;
    const target = e.target.dataset.target;
    const value = Number(e.target.value);

    setPoint(target, stat, value);

    updateStatLabel(target, stat, value);

    updateAllUI();
}

/*
-----------------------------------------
ポケモン入力バインド
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
ポケモン反映
-----------------------------------------
*/
function handlePokemon(target, name) {

    const p = getPokemon(name);

    if (!p) {
        console.log("ポケモン未発見:", name);
        return;
    }

    setPokemon(target, p);

    updateAllUI();
}

/*
-----------------------------------------
ラベル更新
-----------------------------------------
*/
function updateStatLabel(target, stat, value) {

    const el = document.getElementById(`${target}-${stat}-value`);

    if (el) {
        el.textContent = value;
    }
}

/*
-----------------------------------------
UI全体更新
-----------------------------------------
*/
function updateAllUI() {

    const state = getState ? getState() : null;

    if (!state) return;

    updatePointDisplay(state);
    updatePokemonDisplay(state);
    updateDamageDisplay(state);
}

/*
-----------------------------------------
ポイント表示
-----------------------------------------
*/
function updatePointDisplay(state) {

    ["attacker", "defender"].forEach(t => {

        const el = document.getElementById(t + "Stats");

        if (!el) return;

        const points = state.points[t];

        let total = 0;

        for (let k in points) {
            total += points[k];
        }

        let info = el.querySelector(".point-info");

        if (!info) {
            info = document.createElement("div");
            info.className = "point-info";
            el.prepend(info);
        }

        info.textContent = `合計ポイント: ${total} / 66`;
    });
}

/*
-----------------------------------------
ポケモン表示
-----------------------------------------
*/
function updatePokemonDisplay(state) {

    const atk = state.pokemon.attacker;
    const def = state.pokemon.defender;

    const el = document.getElementById("damageResult");

    if (!el) return;

    if (!atk || !def) {
        el.innerHTML = "ポケモンを選択してください";
        return;
    }

    el.innerHTML = `
        <div>
            <p>攻撃側: ${atk.name}</p>
            <p>防御側: ${def.name}</p>
        </div>
    `;
}

/*
-----------------------------------------
ダメージ表示（統合）
-----------------------------------------
*/
function updateDamageDisplay(state) {

    const atk = state.pokemon.attacker;
    const def = state.pokemon.defender;

    if (!atk || !def) return;

    const attack = calcStat(atk.attack, "attacker", "attack", 1.0);
    const defense = calcStat(def.defense, "defender", "defense", 1.0);

    const dmg = calcDamage({
        level: 50,
        power: 80,
        attack,
        defense,
        stab: 1.0,
        type: 1.0,
        random: true
    });

    showDamageResult(
        Math.floor(dmg * 0.85),
        dmg
    );
}
