const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
      preload,
      create,
      update
  }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var cursors;
var player;
var winOrLose;

function preload ()
{
  this.load.image('sky', 'assets/exampleBackground.png');
  this.load.image('platform', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{
    this.add.image(400, 300, 'sky');

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 586, 'platform').setScale(2).refreshBody();

    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0);
    player.setCollideWorldBounds(true);

    // this.anims.create({
    //     key: 'left',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });

    // this.anims.create({
    //     key: 'turn',
    //     frames: [ { key: 'dude', frame: 4 } ],
    //     frameRate: 20
    // });

    // this.anims.create({
    //     key: 'right',
    //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    this.physics.add.collider(player, platforms);
    
    cursors = this.input.keyboard.createCursorKeys();

    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
  });
  
  stars.children.iterate(function (child) {
  
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  
  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  function collectStar (player, star)
  {
      star.disableBody(true, true);
  
      score += 10;
      scoreText.setText('Score: ' + score);
      if(scoreText === 30){
        winOrLose.setText('You win');
    }
}
    winOrLose = this.add.text(32, 32, '', {fontSize: '32px', fill: '#000'})
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        // player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        // player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        // player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}