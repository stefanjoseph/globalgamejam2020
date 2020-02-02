class TitleScene extends Phaser.Scene {
  constructor(){
    super("TitleScene");
  }

  preload(){
    this.load.image("ball", "images/ball.png");
    this.load.image("count1", "images/1.png");
    this.load.image("count2", "images/2.png");
    this.load.image("count3", "images/3.png");
    this.load.image("fight", "images/fight.png");

    //characters ---
    this.load.image("dogHead", "images/char_parts/dogHead.png");
    this.load.image("dogBod", "images/char_parts/dogBod.png");
    this.load.image("dogLegs", "images/char_parts/dogLegs.png");
    this.load.image("axolotHead", "images/char_parts/axolotlHead.png");
    this.load.image("axolotBod", "images/char_parts/axolotlBod.png");
    this.load.image("axolotLegs", "images/char_parts/axolotlLegs.png");
    this.load.image("mantisHead", "images/char_parts/mantisHead.png");
    this.load.image("mantisBod", "images/char_parts/mantisBod.png");
    this.load.image("mantisLegs", "images/char_parts/mantisLegs.png");

    //backgrounds ----
    this.load.image("bg1", "images/backgrounds/scene1.jpg");
    this.load.image("bg2", "images/backgrounds/scene2.jpg");
    this.load.image("bg3", "images/backgrounds/scene3.jpg");
    this.load.image("bg4", "images/backgrounds/scene4.jpg");
    this.load.image("bg5", "images/backgrounds/scene5.jpg");
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
