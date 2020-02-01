class Scene1 extends Phaser.Scene {
  constructor(){
    super("TitleScene");
  }

  create() {
    this.add.text(20, 20, "Welcome. Press enter to start game.");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    if(this.cursorKeys.space.isDown){
      this.scene.start("BuildScene");
    }
  }

}
