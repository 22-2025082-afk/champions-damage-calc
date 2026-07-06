/*
=========================================
pokemon.js（強化版）
Pokémon Champions データベース
Version 0.1.0
=========================================
*/

const pokemonDB = [
    {
        name: "ピカチュウ",
        types: ["electric"],
        hp: 35,
        attack: 55,
        defense: 40,
        spattack: 50,
        spdefense: 50,
        speed: 90
    },
    {
        name: "リザードン",
        types: ["fire", "flying"],
        hp: 78,
        attack: 84,
        defense: 78,
        spattack: 109,
        spdefense: 85,
        speed: 100
    },
    {
        name: "カイリュー",
        types: ["dragon", "flying"],
        hp: 91,
        attack: 134,
        defense: 95,
        spattack: 100,
        spdefense: 100,
        speed: 80
    },
    {
        name: "ガブリアス",
        types: ["dragon", "ground"],
        hp: 108,
        attack: 130,
        defense: 95,
        spattack: 80,
        spdefense: 85,
        speed: 102
    },
    {
        name: "ミミッキュ",
        types: ["ghost", "fairy"],
        hp: 55,
        attack: 90,
        defense: 80,
        spattack: 50,
        spdefense: 105,
        speed: 96
    },
    {
        name: "バンギラス",
        types: ["rock", "dark"],
        hp: 100,
        attack: 134,
        defense: 110,
        spattack: 95,
        spdefense: 100,
        speed: 61
    }
];

/*
-----------------------------------------
取得
-----------------------------------------
*/
function getPokemon(name) {
    return pokemonDB.find(p => p.name === name) || null;
}

/*
-----------------------------------------
タイプ取得
-----------------------------------------
*/
function getPokemonTypes(name) {
    const p = getPokemon(name);
    return p ? p.types : [];
}

/*
-----------------------------------------
ステータス取得
-----------------------------------------
*/
function getBaseStat(name, stat) {

    const p = getPokemon(name);

    if (!p) return 0;

    return p[stat] || 0;
}

/*
-----------------------------------------
全取得（デバッグ用）
-----------------------------------------
*/
function getAllPokemon() {
    return pokemonDB;
}
