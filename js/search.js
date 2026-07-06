/*
=========================================
search.js
検索機能（Pokémon / 技）
Version 0.1.0
=========================================
*/

/*
-----------------------------------------
簡易ポケモンデータ（テスト用）
※あとで pokemon.js に置き換える
-----------------------------------------
*/
const pokemonDB = [
    { name: "ピカチュウ", hp: 35, attack: 55, defense: 40, spattack: 50, spdefense: 50, speed: 90 },
    { name: "リザードン", hp: 78, attack: 84, defense: 78, spattack: 109, spdefense: 85, speed: 100 },
    { name: "カイリュー", hp: 91, attack: 134, defense: 95, spattack: 100, spdefense: 100, speed: 80 }
];

/*
-----------------------------------------
ポケモン検索
-----------------------------------------
*/
function findPokemon(name) {

    return pokemonDB.find(p => p.name === name) || null;
}

/*
-----------------------------------------
入力イベント登録
-----------------------------------------
*/
window.addEventListener("load", () => {

    const attacker = document.getElementById("attackerPokemon");
    const defender = document.getElementById("defenderPokemon");

    if (attacker) {
        attacker.addEventListener("change", function () {
            applyPokemon("attacker", this.value);
        });
    }

    if (defender) {
        defender.addEventListener("change", function () {
            applyPokemon("defender", this.value);
        });
    }

});

/*
-----------------------------------------
ポケモン反映
-----------------------------------------
*/
function applyPokemon(target, name) {

    const p = findPokemon(name);

    if (!p) {
        console.log("ポケモンが見つかりません:", name);
        return;
    }

    console.log(`${target} に ${name} を設定`);

    // 今はログだけ（後で stats.js と連動）
    console.log(p);

}
