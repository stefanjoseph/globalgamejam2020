class TitleScene extends Phaser.Scene {
  constructor(){
    super("TitleScene");
  }

  preload(){
    this.load.image("ball", "images/ball.png")
  }

  create() {
    this.add.text(20, 20, "Welcome. Press space to start game.");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  //Player Input
  update() {
    if(this.cursorKeys.space.isDown){
      this.scene.start("BuildScene");
    }
  }

}
