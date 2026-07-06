/*
=========================================
Pokémon Champions Damage Calculator
Version 0.1.0
script.js
=========================================
*/

window.addEventListener("load", initialize);

/*
-----------------------------------------
初期化
-----------------------------------------
*/
function initialize() {

    console.log("Pokémon Champions Damage Calculator v0.1.0");

    loadNatureList();

}

/*
-----------------------------------------
性格一覧を読み込む
-----------------------------------------
*/
function loadNatureList() {

    const attackerNature = document.getElementById("attackerNature");
    const defenderNature = document.getElementById("defenderNature");

    if (!attackerNature || !defenderNature) {
        console.error("性格セレクトが見つかりません。");
        return;
    }

    natures.forEach(function (nature) {

        const option1 = document.createElement("option");
        option1.value = nature.name;
        option1.textContent = nature.name;
        attackerNature.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = nature.name;
        option2.textContent = nature.name;
        defenderNature.appendChild(option2);

    });

    console.log("性格一覧の読み込み完了");

}
