/*
=========================================
ui.js（強化版）
Pokémon Champions UI
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

    console.log("UI init");

    setupStatsUI();
    updateAllUI();
}

/*
-----------------------------------------
スライダーUI生成
-----------------------------------------
*/
function setupStatsUI() {

    const targets = ["attacker", "defender"];

    targets.forEach(t => {

        const el = document.getElementById(t + "Stats");

        if (!el) return;

        el.innerHTML = createStatUI(t);
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
イベント登録
-----------------------------------------
*/
document.addEventListener("input", (e) => {

    if (e.target.type !== "range") return;

    const stat = e.target.dataset.stat;
    const target = e.target.dataset.target;
    const value = Number(e.target.value);

    if (typeof setPoint === "function") {
        setPoint(target, stat, value);
    }

    updateStatLabel(target, stat, value);
    updateAllUI();
});

/*
-----------------------------------------
数値更新
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

        const info = el.querySelector(".stat-block");

        if (info) {
            let old = el.querySelector(".point-info");

            if (!old) {
                old = document.createElement("div");
                old.className = "point-info";
                info.prepend(old);
            }

            old.textContent = `合計ポイント: ${total} / 66`;
        }
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
