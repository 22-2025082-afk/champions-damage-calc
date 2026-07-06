console.log("Pokémon Champions Damage Calculator");

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

const selects = [
    document.getElementById("attackerNature"),
    document.getElementById("defenderNature")
];

selects.forEach(select=>{

    natures.forEach(nature=>{

        const option=document.createElement("option");

        option.value=nature;

        option.textContent=nature;

        select.appendChild(option);

    });

});

document
.getElementById("calcButton")
.addEventListener("click",()=>{

    document.getElementById("result").textContent=
    "まだ計算機能は実装されていません";

});
