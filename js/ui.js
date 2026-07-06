// ==========================================
// ui.js
// ==========================================

// 性格一覧
const natures = [
    "がんばりや",
    "さみしがり",
    "いじっぱり",
    "やんちゃ",
    "ゆうかん",

    "ずぶとい",
    "すなお",
    "わんぱく",
    "のうてんき",
    "のんき",

    "ひかえめ",
    "おっとり",
    "てれや",
    "うっかりや",
    "れいせい",

    "おくびょう",
    "せっかち",
    "ようき",
    "むじゃき",
    "まじめ",

    "おだやか",
    "おとなしい",
    "しんちょう",
    "なまいき",
    "きまぐれ"
];

export function initializeUI() {

    const selects = [
        document.getElementById("attacker-nature"),
        document.getElementById("defender-nature")
    ];

    selects.forEach(select => {

        natures.forEach(nature => {

            const option = document.createElement("option");

            option.value = nature;
            option.textContent = nature;

            select.appendChild(option);

        });

    });

    console.log("UI 初期化完了");

}
