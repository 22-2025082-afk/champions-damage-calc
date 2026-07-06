/*
=========================================
pokemon.js
ポケモンデータベース
Version 0.1.0
=========================================
*/

const pokemonDB = [
    {
        name: "ピカチュウ",
        hp: 35,
        attack: 55,
        defense: 40,
        spattack: 50,
        spdefense: 50,
        speed: 90
    },
    {
        name: "リザードン",
        hp: 78,
        attack: 84,
        defense: 78,
        spattack: 109,
        spdefense: 85,
        speed: 100
    },
    {
        name: "カイリュー",
        hp: 91,
        attack: 134,
        defense: 95,
        spattack: 100,
        spdefense: 100,
        speed: 80
    },
    {
        name: "ガブリアス",
        hp: 108,
        attack: 130,
        defense: 95,
        spattack: 80,
        spdefense: 85,
        speed: 102
    },
    {
        name: "ミミッキュ",
        hp: 55,
        attack: 90,
        defense: 80,
        spattack: 50,
        spdefense: 105,
        speed: 96
    }
];

/*
-----------------------------------------
ポケモン取得
-----------------------------------------
*/
function getPokemon(name) {
    return pokemonDB.find(p => p.name === name) || null;
}

/*
-----------------------------------------
データ全取得（デバッグ用）
-----------------------------------------
*/
function getAllPokemon() {
    return pokemonDB;
}
