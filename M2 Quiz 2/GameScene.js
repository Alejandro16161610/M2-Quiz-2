// -------------object variables to all scripts
var Player;
var Projectile;
var Vigral;
var Houldrant;
var Shetrant;
var EnemyType = 0;
var enemydelay = 0;
var score = 0;
var minutes = 0;
var seconds = 0;
var playerTime = 0;
var playerTimeText;
var PlayerHealth;
var scoreText;
var cooldown = 0.3;
var readytoshoot = 0;
var Health = 1;
var Autofire = true;
//--------------
export default class Gamescene extends Phaser.Scene{

    constructor(){
      super("gs");
    }
    init(){
      // ------------------- object variables to this script
      this.Gameover = false;
      this.UpAndDownCont = false;
      this.cursors;
      this.spaceKey;
      this.Spawned = 0;
      this.MoveSpeed = 350;
      this.fired = false;
      this.Bulsound;
      this.EnBUl;
      // -------------------
    }
  
    preload(){
      this.load.image('ship', 'PlayerSprites/RocketAnim.png');
      this.load.image('ship2', 'PlayerSprites/RocketAnim2.png');
      this.load.image("Proj", 'PlayerSprites/RocketBullet.png');
      this.load.audio('pop', 'PlayerSprites/Sounds/Shoot.mp3');
      // Enemies
      // Vigral
      this.load.audio('Ex', 'EnemySprites/Sounds/Explosion1.mp3');
      this.load.audio('Ex2', 'EnemySprites/Sounds/Explosion2.mp3');
      this.load.audio('Ex3', 'EnemySprites/Sounds/Explosion3.mp3');
      this.load.image('Vigral', 'EnemySprites/Vigral1.png');
      this.load.image("Vigral2", 'EnemySprites/Vigral2.png');
      // Houldrant
      this.load.image('Houldrant', 'EnemySprites/Houldrant1.png');
      this.load.image("Houldrant2", 'EnemySprites/Houldrant2.png');
      // Shetrant
      this.load.image('Shetrant', 'EnemySprites/Shetrant1.png');
      this.load.image("Shetrant2", 'EnemySprites/Shetrant2.png');
      this.load.image("ShetrantProj", 'EnemySprites/Projectiles/ShetrantBullet.png');
      this.load.audio('bang', 'EnemySprites/Sounds/Shoot.mp3');
    }
  
    create(){
      Player = this.physics.add.sprite(400,520,'ship');
      scoreText = this.add.text(10, 32, 'Score: 0', { fontSize: '32px', fill: '#fff' });
      playerTimeText = this.add.text(10, 5, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }); 
      PlayerHealth = this.add.text(10, 59, 'Health: 0', { fontSize: '32px', fill: '#fff' }); 
      this.cursors = this.input.keyboard.createCursorKeys(); // loaad the keyboard before scripting it
      this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.Bulsound = this.sound.add("pop");
      this.EnBUl = this.sound.add("bang");
      this.ExSound1 = this.sound.add("Ex");
      this.ExSound2 = this.sound.add("Ex2");
      this.ExSound3 = this.sound.add("Ex3");

      Projectile = this.physics.add.group({
        defaultKey: {key: 'bullet'},
        maxSize: 2000,
        allowGravity: false,
        worldBounds: true
      });

      this.anims.create({
        key: 'Jet',
        frames: [
            { key: 'ship' },
            { key: 'ship2' },
        ],
        frameRate: 20,
        repeat: 1
    });

    this.anims.create({
      key: 'VigJet',
      frames: [
          { key: 'Vigral' },
          { key: 'Vigral2' },
      ],
      frameRate: 20,
      repeat: -1
  });

  this.anims.create({
    key: 'SheJet',
    frames: [
        { key: 'Shetrant' },
        { key: 'Shetrant2' },
    ],
    frameRate: 20,
    repeat: -1
});

  this.anims.create({
    key: 'Houlspin',
    frames: [
        { key: 'Houldrant' },
        { key: 'Houldrant2' },
    ],
    frameRate: 10,
    repeat: -1
});

  // Add enemies

  Vigral = this.physics.add.group({
    defaultKey: {key: 'Vigral'},
    maxSize: 2000,
    allowGravity: false,
    runChildUpdate: true,
    worldBounds: true,
});

Houldrant = this.physics.add.group({
  defaultKey: {key: 'Houldrant'},
  maxSize: 2000,
  allowGravity: false,
  runChildUpdate: true,
  worldBounds: true,
});

Shetrant = this.physics.add.group({
  defaultKey: {key: 'Shetrant'},
  maxSize: 2000,
  allowGravity: false,
  runChildUpdate: true,
  worldBounds: true,
});

function onHit(bullets,enemies){
  enemies.destroy();
  this.soundplay = Phaser.Math.Between(1, 3);
  if (this.soundplay == 1){
  this.ExSound1.play();
  }
  else if (this.soundplay == 2){
  this.ExSound2.play();
  }
  else if (this.soundplay == 3){
  this.ExSound3.play();
  }
  bullets.destroy();
  score += 1;
  scoreText.setText('Score: ' + score);
}

function onHit2(enemies){
 //enemies.destroy();
  this.soundplay = Phaser.Math.Between(1, 3);
  if (this.soundplay == 1){
  this.ExSound1.play();
  }
  else if (this.soundplay == 2){
  this.ExSound2.play();
  }
  else if (this.soundplay == 3){
  this.ExSound3.play();
  }
  Health -= 1;
}

//------------------------------------ touch functions
this.physics.add.overlap(Projectile, Vigral, onHit, null, this);
this.physics.add.overlap(Projectile, Houldrant, onHit, null, this);
this.physics.add.overlap(Projectile, Shetrant, onHit, null, this);

this.physics.add.overlap(Vigral, Player, onHit2, null, this);
this.physics.add.overlap(Houldrant, Player, onHit2, null, this);
this.physics.add.overlap(Shetrant, Player, onHit2, null, this);
//------------------------------------
    }
  
    // GAME FUNCTIONS
  
    update(){
      PlayerHealth.setText('Health: ' + Health);
if (Health <= 0){
  this.Gameover = true;
  this.scene.start('GameOver');
}
      Player.anims.play('Jet', true);
      if (this.Gameover) {
        return
      }
      
      //-------------------------------------------- functions
      function createEnemy(EnId){
        if (EnId == 1){
      var x = Phaser.Math.Between(30, 755);
      var y = -50;
      var newEnemy = Vigral.create(x, y, 'Vigral');
      newEnemy.setScale(0.75);
      newEnemy.setVelocityY(85);
      newEnemy.anims.play('VigJet', true);
        }
        else if (EnId == 2){
          var x = Phaser.Math.Between(30, 755);
          var y = -50;
          var newEnemy2 = Houldrant.create(x, y, 'Houldrant');
          newEnemy2.setScale(0.75);
          newEnemy2.setVelocityY(150);
          newEnemy2.anims.play('Houlspin', true);  
        }
        else if (EnId == 3){
          var x = Phaser.Math.Between(30, 755);
          var y = -50;
          var newEnemy3 = Shetrant.create(x, y, 'Shetrant');
          newEnemy3.setScale(0.75);
          newEnemy3.setVelocityY(85);
          newEnemy3.anims.play('SheJet', true);  
        }
      }

      function makebullet(){
        var Projshot = Projectile.get(Player.x, Player.y - 55, 'Proj').setScale(1); // make the bullet
        Projshot.setVelocityY(-1200);
      }

      function timer(){
        minutes = Math.floor(playerTime / 60);
        seconds = Math.floor(playerTime % 60);
        playerTimeText.setText('Time: ' + minutes + ':' + seconds.toString().padStart(2, '0'));
        playerTime += 0.0165;
      }
      //--------------------------------------------

      if (this.spaceBar.isDown) {
        if (this.fired == false){
          if (this.time.now > readytoshoot + (cooldown*1000)){
          makebullet();
          this.Bulsound.play();
          readytoshoot = this.time.now;
          if (Autofire == false){
          this.fired = true;
          }
          }
        }
      }
      else{
        if (this.fired == true){
         this.fired = false;
        }
      }

      if (this.cursors.left.isDown){
          Player.setVelocityX(-this.MoveSpeed);
      }
      else if (this.cursors.right.isDown){
          Player.setVelocityX(this.MoveSpeed);
      }
      else if (this.cursors.up.isDown){
        if (this.UpAndDownCont == true){
          Player.setVelocityY(-this.MoveSpeed);
        }
      }
      else if (this.cursors.down.isDown){
        if (this.UpAndDownCont == true){
          Player.setVelocityY(this.MoveSpeed);
        }
      }
      else
      {
          Player.setVelocityX(0);
          if (this.UpAndDownCont == true){
          Player.setVelocityY(0);
          }
      }
      
      timer();

if (this.time.now > this.Spawned + enemydelay){
      EnemyType = Phaser.Math.Between(1,3);
      createEnemy(EnemyType);
      enemydelay = Phaser.Math.Between(500,1500);
      this.Spawned = this.time.now;
}
    }
  }