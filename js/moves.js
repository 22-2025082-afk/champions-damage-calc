/*
=========================================
moves.js
技データベース
Pokémon Champions
Version 0.1.0
=========================================
*/

const movesDB = [
    {
        name: "10まんボルト",
        type: "electric",
        power: 90,
        category: "special"
    },
    {
        name: "かえんほうしゃ",
        type: "fire",
        power: 90,
        category: "special"
    },
    {
        name: "ドラゴンクロー",
        type: "dragon",
        power: 80,
        category: "physical"
    },
    {
        name: "じしん",
        type: "ground",
        power: 100,
        category: "physical"
    },
    {
        name: "シャドーボール",
        type: "ghost",
        power: 80,
        category: "special"
    },
    {
        name: "ストーンエッジ",
        type: "rock",
        power: 100,
        category: "physical"
    }
];

/*
-----------------------------------------
技取得
-----------------------------------------
*/
function getMove(name) {
    return movesDB.find(m => m.name === name) || null;
}

/*
-----------------------------------------
技タイプ取得
-----------------------------------------
*/
function getMoveType(name) {
    const m = getMove(name);
    return m ? m.type : null;
}

/*
-----------------------------------------
威力取得
-----------------------------------------
*/
function getMovePower(name) {
    const m = getMove(name);
    return m ? m.power : 0;
}

/*
-----------------------------------------
物理/特殊
-----------------------------------------
*/
function getMoveCategory(name) {
    const m = getMove(name);
    return m ? m.category : null;
}

/*
-----------------------------------------
全取得（デバッグ用）
-----------------------------------------
*/
function getAllMoves() {
    return movesDB;
}
