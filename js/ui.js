/*
=========================================
ui.js
UI制御（Pokémon Champions）
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

    console.log("UI初期化開始");

    setupStatsUI();

}

/*
-----------------------------------------
能力ポイントUI生成
-----------------------------------------
*/
function setupStatsUI() {

    const attacker = document.getElementById("attackerStats");
    const defender = document.getElementById("defenderStats");

    if (!attacker || !defender) return;

    attacker.innerHTML = createStatControls("attacker");
    defender.innerHTML = createStatControls("defender");

    attachEvents();

    updateUI();
}

/*
-----------------------------------------
ステータスUI生成
-----------------------------------------
*/
function createStatControls(prefix) {

    const labels = {
        hp: "HP",
        attack: "攻撃",
        defense: "防御",
        spattack: "特攻",
        spdefense: "特防",
        speed: "素早さ"
    };

    let html = "";

    for (let key in labels) {

        html += `
        <div class="form-group">
            <label>${labels[key]}</label>
            <input
                type="range"
                min="0"
                max="32"
                value="0"
                data-stat="${key}"
                data-target="${prefix}">
            <span id="${prefix}-${key}-value">0</span>
        </div>
        `;
    }

    return html;
}

/*
-----------------------------------------
イベント付与
-----------------------------------------
*/
function attachEvents() {

    const sliders = document.querySelectorAll("input[type='range']");

    sliders.forEach(slider => {

        slider.addEventListener("input", function () {

            const stat = this.dataset.stat;
            const target = this.dataset.target;
            const value = Number(this.value);

            updateStat(target, stat, value);

        });

    });
}

/*
-----------------------------------------
ステータス更新
-----------------------------------------
*/
function updateStat(target, stat, value) {

    // stats.js の関数を使う想定
    if (typeof setPoint === "function") {
        setPoint(stat, value);
    }

    const label = document.getElementById(`${target}-${stat}-value`);
    if (label) {
        label.textContent = value;
    }

    updateUI();
}

/*
-----------------------------------------
UI更新
-----------------------------------------
*/
function updateUI() {

    const info = document.getElementById("damageResult");

    if (!info) return;

    const total = (typeof getTotalPoints === "function")
        ? getTotalPoints()
        : 0;

    info.textContent = `使用ポイント: ${total} / 66`;

}
