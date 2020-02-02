window.onload = function(){

  var config = {
    width: 640,
    height: 576,
    backgroundColor: 0x000000,
    scene: [TitleScene, BuildScene, Battle],
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
  }


  var game = new Phaser.Game(config);
//   this.game.scale.pageAlignHorizontally = true;
// this.game.scale.pageAlignVertically = true;
// this.game.scale.refresh();

}
