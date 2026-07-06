/*
=========================================
natures.js
性格データ（Pokémon Champions用）
Version 0.1.0
=========================================
*/

const natures = [
    { name: "がんばりや", up: null, down: null },
    { name: "さみしがり", up: "attack", down: "defense" },
    { name: "いじっぱり", up: "attack", down: "spattack" },
    { name: "やんちゃ", up: "attack", down: "spdefense" },
    { name: "ゆうかん", up: "attack", down: "speed" },

    { name: "ずぶとい", up: "defense", down: "attack" },
    { name: "すなお", up: null, down: null },
    { name: "わんぱく", up: "defense", down: "spattack" },
    { name: "のうてんき", up: "defense", down: "spdefense" },
    { name: "のんき", up: "defense", down: "speed" },

    { name: "ひかえめ", up: "spattack", down: "attack" },
    { name: "おっとり", up: "spattack", down: "defense" },
    { name: "てれや", up: null, down: null },
    { name: "うっかりや", up: "spattack", down: "spdefense" },
    { name: "れいせい", up: "spattack", down: "speed" },

    { name: "おくびょう", up: "speed", down: "attack" },
    { name: "せっかち", up: "speed", down: "defense" },
    { name: "ようき", up: "speed", down: "spattack" },
    { name: "むじゃき", up: "speed", down: "spdefense" },
    { name: "まじめ", up: null, down: null },

    { name: "おだやか", up: "spdefense", down: "attack" },
    { name: "おとなしい", up: "spdefense", down: "defense" },
    { name: "しんちょう", up: "spdefense", down: "spattack" },
    { name: "なまいき", up: "spdefense", down: "speed" },
    { name: "きまぐれ", up: null, down: null }
];
