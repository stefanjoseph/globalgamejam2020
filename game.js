window.onload = function(){

  var config = {
    width: 1200,
    height: 600,
    backgroundColor: 0x000000,
    scene: [TitleScene, BuildScene, Battle]
  }



  var game = new Phaser.Game(config);
}
