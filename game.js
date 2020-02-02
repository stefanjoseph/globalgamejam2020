window.onload = function(){

  var config = {
    width: 640,
    height: 576,
    backgroundColor: 0x000000,
    scene: [TitleScene, BuildScene, Battle],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
  }



  var game = new Phaser.Game(config);
}
