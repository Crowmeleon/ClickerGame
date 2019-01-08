import _ from 'lodash';

const { localStorage } = window;

var displayText = {
    ore: {}
};

var inventory = {
    credits: 0,
    ore: {
        copper: {
            amount: Number.parseFloat(localStorage.getItem('copper')) || 0,
            value: 5,
            requiredForIngot: 5,
            autoHarvest: Number.parseFloat(localStorage.getItem('copperIncrement')) || 0
        },
        iron: {
            amount: Number.parseFloat(localStorage.getItem('iron')) || 0,
            value: 10,
            requiredForIngot: 5,
            autoHarvest: Number.parseFloat(localStorage.getItem('ironIncrement')) || 0
        },
        silver: {
            amount: Number.parseFloat(localStorage.getItem('silver')) || 0,
            value: 20,
            requiredForIngot: 5,
            autoHarvest: Number.parseFloat(localStorage.getItem('silverIncrement')) || 0
        },
        gold: {
            amount: Number.parseFloat(localStorage.getItem('gold')) || 0,
            value: 50,
            requiredForIngot: 5,
            autoHarvest: Number.parseFloat(localStorage.getItem('goldIncrement')) || 0
        }
    },
    ingots: {
        copper: Number.parseFloat(localStorage.getItem('copperIngot')) || 0,
        iron: Number.parseFloat(localStorage.getItem('ironIngot')) || 0,
        silver: Number.parseFloat(localStorage.getItem('silverIngot')) || 0,
        gold: Number.parseFloat(localStorage.getItem('goldIngot')) || 0,
    }
}

export const renderOreDisplayText = (game) => {
    let yPosition = 0;
    _.forOwn(inventory.ore, (val, key) => {
        displayText.ore[key] = game.add.text(20, yPosition += 15, `${key.toUpperCase()}: ${localStorage.getItem(key) || 0}`, { fontFamily: 'Arial', fontSize: 12, color: '#00ff00' });
        return displayText.ore[key];
    })
}

export const updateOreText = () => {
    _.forOwn(inventory.ore, (val, key) => {
        displayText.ore[key].setText(`${key.toUpperCase()}: ${localStorage.getItem(key) || 0}`)
    })
}

export const addOre = (ore) => {
    window.localStorage.setItem(ore, inventory.ore[ore].amount += 1)
    inventory.ore[ore].amount = Number.parseFloat(localStorage.getItem(ore));
    console.log(ore, inventory.ore[ore].amount);
}

export const addIncrementalOre = (ore) => {
    localStorage.setItem(ore + 'Increment', inventory.ore[ore].autoHarvest += 1)
    inventory.ore[ore].autoHarvest = Number.parseFloat(localStorage.getItem(ore + 'Increment'));
}

export const checkIncrementors = () => {
    _.forOwn(inventory.ore, (value, key) => {
        if(value.autoHarvest > 0){
            value.amount += Number.parseFloat(localStorage.getItem(key + 'Increment')) || 0
            localStorage.setItem(key, value.amount)
        }
    });
    localStorage.setItem('lastOnlineDate', new Date())
}

export const checkTimeSinceLastOnline = () => {
    let startDate = localStorage.getItem('lastOnlineDate') || new Date().toString();
    let endDate = new Date();
    let seconds = Math.floor( (endDate.getTime() - new Date(startDate).getTime()) / 1000);
    localStorage.setItem('lastOnlineDate', new Date())
    
    console.log(seconds)

    if(seconds > 0){
        addIncrementalOresFromLastTimeOnline(seconds)
    }

    function addIncrementalOresFromLastTimeOnline(seconds){
        _.forOwn(inventory.ore, (value, key) => {
            if(value.autoHarvest > 0){
                value.amount += Number.parseFloat(localStorage.getItem(key + 'Increment') * seconds)
                localStorage.setItem(key, value.amount)
            }
        })
    }
}

export const addIngot = (ore, amount) => {
    if(Number.parseFloat(localStorage.getItem(ore)) > amount){
        localStorage.setItem(type, inventory.ore[ore] -= 1)
        inventory.ore[ore] -= amount;

        inventory.ingots[ore + 'Ingot'] += 1;
        localStorage.setItem(ore + 'Ingot', inventory.ore[ore] -= 1)
    } else {
        // TODO some form of error notification likea toast 
        console.log('You do not have the sufficent ores for this');
    }
}