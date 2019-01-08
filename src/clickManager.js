import { addOre, addIncrementalOre } from './inventoryManagment.js';

export const clickOnAstroid = (astroid, type) => {
    astroid.on('pointerdown', function () {
        addOre(type)
        this.setTint(0xff0000);
    })
    astroid.on('pointerout', function () {
        this.clearTint();
    })
    astroid.on('pointerup', function () {
        this.clearTint();
    })
}

export const clickIncremental = (incremental, type) => {
    incremental.on('pointerdown', function () {
        addIncrementalOre(type)
        this.setTint(0xff0000);
    })
    incremental.on('pointerout', function () {
        this.clearTint();
    })
    incremental.on('pointerup', function () {
        this.clearTint();
    })
}