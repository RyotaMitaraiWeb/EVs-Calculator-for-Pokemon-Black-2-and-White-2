'use strict';

/* DOM elements */
const calculate = document.querySelector('#calculate');
const evs_result = document.querySelector('#evs-result');
const exp_result = document.querySelector('#exp-result');
const startLevel = document.querySelector('#startLevel');
const checkAll = document.querySelectorAll('[data-action]');
const select = document.querySelector('#starter');
const versionCheck = document.querySelectorAll('input[type="button"][data-version]');
const tradeCheckbox = document.querySelector('#trade');
let checkboxes = [];

/* Input data */
let pokemon = '';
let opponentLevel = 0;

/* Stats */
let hp = 0,
atk = 0,
def = 0,
spa = 0,
spd = 0,
spe = 0,
currentHp = 0,
currentAtk = 0,
currentDef = 0,
currentSpa = 0,
currentSpd = 0,
currentSpe = 0;

// experience
let expYield = 0,
fastExp = 0,
medSlowExp = 0,
medFastExp = 0,
slowExp = 0,
erraticExp = 0,
fluctuatingExp = 0;

let fastLevel = 0,
medSlowLevel = 0,
medFastLevel = 0,
slowLevel = 0,
erraticLevel = 0,
fluctuatingLevel = 0;

let level = 0,
exp = 0,
split = 1,
luckyegg = 1,
trade = 1;


calculate.addEventListener('click', function() {
    expYield = 0;
    hp = 0;
    atk = 0;
    def = 0;
    spa = 0;
    spd = 0;
    spe = 0;
    exp = 0;
    trade = tradeCheckbox.checked ? 1.5 : 1;
    console.log(trade);

    level = Number(startLevel.value);
    fastLevel = level;
    medFastLevel = level;
    medSlowLevel = level;
    slowLevel = level;
    erraticLevel = level;
    fluctuatingLevel = level;

    fastExp = fastGrowth(level);
    medSlowExp = medSlowGrowth(level);
    medFastExp = medFastGrowth(level);
    slowExp = slowGrowth(level);
    erraticExp = erraticGrowth(level);
    fluctuatingExp = fluctuatingGrowth(level);

    checkboxes = document.querySelectorAll('form input[type="checkbox"]:checked');
    if (checkboxes) {
        checkboxes.forEach(item => {
            if (item.dataset.split) {
                split = Number(item.dataset.split);
            } else {
                split = 1;
            }
            pokemon = item.dataset.pokemon;
            opponentLevel = Number(item.dataset.level);
            expYield = data[pokemon]['expYield'];
            currentHp = data[pokemon].hp;
            currentAtk = data[pokemon].atk;
            currentDef = data[pokemon].def;
            currentSpa = data[pokemon].spa;
            currentSpd = data[pokemon].spd;
            currentSpe = data[pokemon].spe;

            hp += currentHp;

            if (hp > 252) {
                hp = 252
            }

            atk += currentAtk;

            if (atk > 252) {
                atk = 252;
            }

            def += currentDef;

            if (def > 252) {
                def = 252;
            }

            spa += currentSpa;

            if (spa > 252) {
                spa = 252;
            }

            spd += currentSpd;

            if (spd > 252) {
                spd = 252;
            }

            spe += currentSpe;

            if (spe > 252) {
                spe = 252;
            }

            if (item.parentNode.parentNode.parentNode.parentNode.className === 'luckyegg') {
                luckyegg = 1.5;
            }

            fastExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, fastLevel, opponentLevel) / split) * trade) * luckyegg);
            if (fastExp >= fastGrowth(fastLevel + 1)) {
                let start = fastGrowth(fastLevel);
                for (let i = start; i <= fastExp; i++) {
                    if (i === fastGrowth(fastLevel + 1)) {
                        fastLevel++;
                    }
                }
            }
            
            medSlowExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, medSlowLevel, opponentLevel) / split) * trade) * luckyegg);
            if (medSlowExp >= medSlowGrowth(medSlowLevel + 1)) {
                let start = medSlowGrowth(medSlowLevel);
                for (let i = start; i <= medSlowExp; i++) {
                    if (i === medSlowGrowth(medSlowLevel + 1)) {
                        medSlowLevel++;
                    }
                }
            }

            medFastExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, medFastLevel, opponentLevel) / split) * trade) * luckyegg);
            if (medFastExp >= medFastGrowth(medFastLevel + 1)) {
                let start = medFastGrowth(medFastLevel);
                for (let i = start; i <= medFastExp; i++) {
                    if (i === medFastGrowth(medFastLevel + 1)) {
                        medFastLevel++;
                    }
                }
            }

            slowExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, slowLevel, opponentLevel) / split) * trade) * luckyegg);
            if (slowExp >= slowGrowth(slowLevel + 1)) {
                let start = slowGrowth(slowLevel);
                for (let i = start; i <= slowExp; i++) {
                    if (i === slowGrowth(slowLevel + 1)) {
                        slowLevel++;
                    }
                }
            }

            erraticExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, erraticLevel, opponentLevel) / split) * trade) * luckyegg);
            if (erraticExp >= erraticGrowth(erraticLevel + 1)) {
                let start = erraticGrowth(erraticLevel);
                for (let i = start; i <= erraticExp; i++) {
                    if (i === erraticGrowth(erraticLevel + 1)) {
                        erraticLevel++;
                    }
                }
            }

            fluctuatingExp += Math.floor(Math.floor(Math.ceil(gainExp(expYield, fluctuatingLevel, opponentLevel) / split) * trade) * luckyegg);
            if (fluctuatingExp >= fluctuatingGrowth(fluctuatingLevel + 1)) {
                let start = fluctuatingGrowth(fluctuatingLevel);
                for (let i = start; i <= fluctuatingExp; i++) {
                    if (i === fluctuatingGrowth(fluctuatingLevel + 1)) {
                        fluctuatingLevel++;
                    }
                }
            }
            
        });
    }
    console.log(erraticExp, fastLevel, medSlowLevel, medFastLevel, slowLevel, erraticLevel, fluctuatingLevel);
    evs_result.innerHTML = `<p>Your Pokemon would have the following EVs:</p>
<ul>
    <li><strong>HP:</strong> ${hp}</li>
    <li><strong>Atk:</strong> ${atk}</li>
    <li><strong>Def:</strong> ${def}</li>
    <li><strong>SpA:</strong> ${spa}</li>
    <li><strong>SpD:</strong> ${spd}</li>
    <li><strong>Spe:</strong> ${spe}</li>
</ul>`;

    exp_result.innerHTML = `<p>Your Pokemon would be the following levels, depending on its experience group:</p>
<ul>
    <li>Pokemon in the <strong>Fast</strong> experience group would be around <strong>level ${fastLevel}</strong> (approximate exp: <strong>${fastExp}</strong>).</li>
    <li>Pokemon in the <strong>Medium Fast</strong> experience group would be around <strong>level ${medFastLevel}</strong> (approximate exp: <strong>${medFastExp}</strong>).</li>
    <li>Pokemon in the <strong>Medium Slow</strong> experience group would be around <strong>level ${medSlowLevel}</strong> (approximate exp: <strong>${medSlowExp}</strong>).</li>
    <li>Pokemon in the <strong>Slow</strong> experience group would be around <strong>level ${slowLevel}</strong> (approximate exp: <strong>${slowExp}</strong>).</li>
    <li>Pokemon in the <strong>Erratic</strong> experience group would be around <strong>level ${erraticLevel}</strong> (approximate exp: <strong>${erraticExp}</strong>).</li>
    <li>Pokemon in the <strong>Fluctuating</strong> experience group would be around <strong>level ${fluctuatingLevel}</strong> (approximate exp: <strong>${fluctuatingExp}</strong>).</li>
</ul>`
});

checkAll.forEach(btn => {
    btn.addEventListener('click', function() {
        let group = this.parentNode.parentNode.querySelectorAll('div.group');
        group.forEach(child => {
            let checkboxes = child.querySelectorAll('input[type="checkbox"');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        });
    });
});

versionCheck.forEach(btn => {
    btn.addEventListener('click', function() {
        let version = this.dataset.version;
        let group = this.parentNode.parentNode.querySelectorAll('div.group');
        group.forEach(item => {
            if (item.dataset.version.includes(version)) {
                item.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = true;
                });
            }
        });
    });
});


select.addEventListener('change', function(e) {
    let starter = e.target.value;
    let strongerStarter = starter === 'snivy' ? ['tepig', 'emboar'] : starter === 'tepig' ? ['oshawott', 'samurott'] : ['snivy', 'serperior'];
    let hugh = document.querySelectorAll('.starter');
    hugh.forEach(input => {
        let stage = Number(input.parentNode.parentNode.dataset.stage);
        input.dataset.pokemon = strongerStarter[stage];
        input.nextElementSibling.textContent = input.nextElementSibling.textContent.replace(/[A-Za-z]+(?= \(lv\.)/, strongerStarter[stage][0].toLocaleUpperCase() + strongerStarter[stage].slice(1));
    });
});

function fastGrowth(lvl) {
    return Math.floor(4 * (lvl ** 3) / 5);
}

function medSlowGrowth(lvl) {
    return Math.floor((6/5 * (lvl ** 3)) - (15 * (lvl ** 2)) + (100 * lvl) - 140);
}

function medFastGrowth(lvl) {
    return lvl ** 3;
}

function slowGrowth(lvl) {
    return Math.floor(5 * (lvl ** 3) / 4);
}

function erraticGrowth(lvl) {
    if (lvl < 50) {
        return Math.floor(((lvl ** 3) * (100 - lvl)) / 50);
    } else if (lvl < 68) {
        return Math.floor(((lvl ** 3) * (150 - lvl)) / 100);
    } else if (lvl < 98) {
        return Math.floor(((lvl ** 3) * Math.floor(((1911 - (10 * lvl))) / 3) / 500));
    } else {
        return Math.floor(((lvl ** 3) * (160 - lvl)) / 100);
    }
}

function fluctuatingGrowth(lvl) {
    if (lvl < 15) {
        return Math.floor((lvl ** 3) * (((Math.floor(lvl + 1)) / 3) + 24) / 50);
    } else if (lvl < 36) {
        return Math.floor((lvl ** 3) * ((lvl + 14) / 50))
    } else {
        return Math.floor((lvl ** 3) * ((Math.floor(lvl / 2) + 32) / 50));
    }
}

function gainExp(opponentYield, userLvl, opponentLvl) {
    let X = opponentLvl + opponentLvl + 10;
    let Y = opponentLvl + userLvl + 10;
    let Z = Math.floor(Math.floor(opponentYield * opponentLvl / 5) * 1.5);
    return Math.floor((Number((Math.sqrt(X).toFixed(4)))*(X*X))*Z/(Number((Math.sqrt(Y)).toFixed(4))*(Y*Y))+1);
}


function debug(pokemon, userLvl, opponentLvl) {
    let X = opponentLvl + opponentLvl + 10;
    let Y = opponentLvl + userLvl + 10;
    let Z = Math.floor(Math.floor(data[pokemon]['expYield'] * opponentLvl / 5) * 1.5);

    return Math.floor((Number((Math.sqrt(X).toFixed(4)))*(X*X))*Z/(Number((Math.sqrt(Y)).toFixed(4))*(Y*Y))+1)
}
