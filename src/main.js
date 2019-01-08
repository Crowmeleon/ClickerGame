import {clickOnAstroid, clickIncremental} from './clickManager';
import {renderOreDisplayText, updateOreText, checkIncrementors, checkTimeSinceLastOnline} from './inventoryManagment';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
      preload,
      create,
      update
  }
};

const astroids = {
    copper: {
        name: 'copper',
        x: config.width / 4,
        y: 500
    },
    iron: {
        name: 'iron',
        x: config.width / 1.5,
        y: 500
    },
    silver: {
        name: 'silver',
        x: config.width / 1.5,
        y: 200 
    },
    gold: {
        name: 'gold',
        x: config.width / 4,
        y: 200
    }
}

var game = new Phaser.Game(config);
var minerals = 0;

function preload ()
{
    
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((window.innerWidth / 2) - 120, window.innerHeight / 2, 320, 30);

    var loadingText = this.make.text({
        x: config.width / 2,
        y: config.height / 2 + 15,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#47D304'
        }
    });
    loadingText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
        console.log(value);
        progressBar.clear();
        progressBar.fillStyle(0x47D304, 1);
        progressBar.fillRect((config.width / 2) - 120, config.height / 2, 320 * value, 30);
    });

    this.load.on('fileprogress', function (value) {
        console.log(value);
    });

    this.load.on('complete', function (value) {
        console.log(value);
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
    });

    this.load.image('copper', 'assets/copper.png');
    this.load.image('iron', 'assets/iron.png');
    this.load.image('silver', 'assets/silver.png');
    this.load.image('gold', 'assets/gold.png');
    this.load.image('add', 'assets/addIcon.png');
    this.load.image('background', 'assets/background.png');

}

function create ()
{
    let bg = this.add.sprite(config.width / 2, config.height / 2, 'background');
    bg.setDisplaySize(config.width, config.height)

    renderOreDisplayText(this);

    const createNewAstroid = (astroid) => {
        let newAstroid = this.add.sprite(astroid.x, astroid.y, astroid.name).setInteractive({ pixelPerfect: true });
        let tween = this.tweens.add({
            targets: newAstroid,
            y: astroid.y + 10,
            ease: 'Sine.easeInOut',
            duration: 1500,
            yoyo: true,
            repeat: -1
        })
        return newAstroid;
    }

    const createIncrementor = (x, y) => {
        return this.add.sprite(x,y, 'add').setInteractive();
    }


    clickOnAstroid(createNewAstroid(astroids.copper), astroids.copper.name);
    clickIncremental(createIncrementor((config.width / 4) + 180 ,550), 'copper', this);

    clickOnAstroid(createNewAstroid(astroids.iron),astroids.iron.name);
    clickIncremental(createIncrementor((config.width / 1.5) + 180, 550), 'iron', this);

    clickOnAstroid(createNewAstroid(astroids.silver), astroids.silver.name);
    clickIncremental(createIncrementor((config.width / 1.5) + 180, 250), 'silver', this);

    clickOnAstroid(createNewAstroid(astroids.gold), astroids.gold.name);
    clickIncremental(createIncrementor((config.width / 4) + 180, 250), 'gold', this);


    let timedEvent = this.time.addEvent({
        delay: 1000,
        callback: checkIncrementors,
        callbackScope: this,
        loop: true
    })

    checkTimeSinceLastOnline()
}

function update ()
{
    updateOreText();
}