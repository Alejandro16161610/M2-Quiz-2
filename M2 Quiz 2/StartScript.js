import GS from  "./GameScene.js";
import GOS from  "./GameOver.js";

let Gamescene = new GS();
let GameoverScene = new GOS();
  
  var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 0 },
              debug: false
          }
      },
  };
  let gaem = new Phaser.Game(config);
  
  // put more scenes in the mainscript body

  gaem.scene.add('GameScene',Gamescene);
  gaem.scene.add('GameOver',GameoverScene);
  
  gaem.scene.start('gs');