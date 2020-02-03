class TitleScene extends Phaser.Scene {
  constructor(){
    super("TitleScene");
  }

  preload(){



    for (var ii = 1; ii <= 6; ii++){
      this.load.audio('music_00'+ii, [
      'sounds/Loop_00'+ii+'.ogg']);
    }
    this.load.image("ball", "images/ball.png");
        this.load.image("title", "images/TitleScreen.png");
    this.load.image("win", "images/YouWin.png");
    this.load.image("lose", "images/YouLose.png");
    this.load.image("count1", "images/1.png");
    this.load.image("count2", "images/2.png");
    this.load.image("count3", "images/3.png");
    this.load.image("fight", "images/fight.png");

        this.load.image("heart", "images/actions/heart.png");
    //characters ---
    var characters = ["dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
    for (var i = 0; i < characters.length; i++){
      var creature = characters[i];
      this.load.image(creature+"Head", "images/char_parts/"+ creature +"Head01.png");
      this.load.image(creature+"Bod", "images/char_parts/"+ creature +"Body01.png");
      this.load.image(creature+"Legs", "images/char_parts/"+ creature +"Legs01.png");
    }


    this.load.image("dogHeadOn", "images/char_parts/dogHead02.png");
    this.load.image("dogBodOn", "images/char_parts/dogBody02.png");
    this.load.image("dogLegsOn", "images/char_parts/dogLegs02.png");
    this.load.image("axolotHeadOn", "images/char_parts/axolotlHead02.png");
    this.load.image("axolotBodOn", "images/char_parts/axolotlBody02.png");
    this.load.image("axolotLegsOn", "images/char_parts/axolotlLegs02.png");
    this.load.image("mantisHeadOn", "images/char_parts/mantisHead02.png");
    this.load.image("mantisBodOn", "images/char_parts/mantisBody02.png");
    this.load.image("mantisLegsOn", "images/char_parts/mantisLegs02.png");


    ///BAT DUCK PANGOLIN
    this.load.image("batHead", "images/char_parts/batHead01.png");
    this.load.image("batBod", "images/char_parts/batBody01.png");
    this.load.image("batLegs", "images/char_parts/batLegs01.png");
    this.load.image("duckHead", "images/char_parts/duckHead01.png");
    this.load.image("duckBod", "images/char_parts/duckBody01.png");
    this.load.image("duckLegs", "images/char_parts/duckLegs01.png");
    this.load.image("pangolinHead", "images/char_parts/pangolinHead01.png");
    this.load.image("pangolinBod", "images/char_parts/pangolinBody01.png");
    this.load.image("pangolinLegs", "images/char_parts/pangolinLegs01.png");

    this.load.image("batHeadOn", "images/char_parts/batHead02.png");
    this.load.image("batBodOn", "images/char_parts/batBody02.png");
    this.load.image("batLegsOn", "images/char_parts/batLegs02.png");
    this.load.image("duckHeadOn", "images/char_parts/duckHead02.png");
    this.load.image("duckBodOn", "images/char_parts/duckBody02.png");
    this.load.image("duckLegsOn", "images/char_parts/duckLegs02.png");
    this.load.image("pangolinHeadOn", "images/char_parts/pangolinHead02.png");
    this.load.image("pangolinBodOn", "images/char_parts/pangolinBody02.png");
    this.load.image("pangolinLegsOn", "images/char_parts/pangolinLegs02.png");

//robo slime

    ///BAT DUCK PANGOLIN
    this.load.image("roboHead", "images/char_parts/roboHead01.png");
    this.load.image("roboBod", "images/char_parts/roboBody01.png");
    this.load.image("roboLegs", "images/char_parts/roboLegs01.png");
    this.load.image("slimeHead", "images/char_parts/slimeHead01.png");
    this.load.image("slimeBod", "images/char_parts/slimeBody01.png");
    this.load.image("slimeLegs", "images/char_parts/slimeLegs01.png");


    this.load.image("roboHeadOn", "images/char_parts/roboHead02.png");
    this.load.image("roboBodOn", "images/char_parts/roboBody02.png");
    this.load.image("roboLegsOn", "images/char_parts/roboLegs02.png");
    this.load.image("slimeHeadOn", "images/char_parts/slimeHead02.png");
    this.load.image("slimeBodOn", "images/char_parts/slimeBody02.png");
    this.load.image("slimeLegsOn", "images/char_parts/slimeLegs02.png");




    //backgrounds ----
    this.load.image("bg1", "images/backgrounds/BG01Sunset.png");
    this.load.image("bg2", "images/backgrounds/BG02Forest.png");
    // this.load.image("bg3", "images/backgrounds/scene3.jpg");
    // this.load.image("bg4", "images/backgrounds/scene4.jpg");
    // this.load.image("bg5", "images/backgrounds/scene5.jpg");
  }

  create() {

    var title = this.add.image(320,288,"title");
      this.add.text(204, 385, "Press your Face to Begin");
    title.setScale(.25);
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
