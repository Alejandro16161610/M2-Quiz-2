export default class GameoverScene extends Phaser.Scene{

    constructor(){
      super("GameOver");
    }
    create(){
    this.add.text(125, 250, 'GAME OVER', { fontSize: '100px', fill: '#fff' }); 
    }
}