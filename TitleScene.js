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
    var characters = ["dog","mantis","axolotl","bat","duck","mantis","pangolin","robo","slime"];
    for (var i = 0; i < characters.length; i++){
      var creature = characters[i];
      this.load.image(creature+"Head", "images/char_parts/"+ creature +"Head01.png");
      this.load.image(creature+"Bod", "images/char_parts/"+ creature +"Body01.png");
      this.load.image(creature+"Legs", "images/char_parts/"+ creature +"Legs01.png");
    }

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
      // this.scene.start("Battle");
    }
  }

}
