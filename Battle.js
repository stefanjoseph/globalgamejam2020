class Battle extends Phaser.Scene {
  constructor(){
    super("Battle");
        // this.fightBackgrounds =["bg1","bg2","bg3","bg4","bg5"];
        this.fightBackgrounds =["bg1","bg2"];
  }

  init(data){
    this.data = data;
    // console.log('init', this.data.head + " :::: " + this.animalFix("dog"));
console.log(this.data);


    // this.animalFix("dog");
    this.charHead = this.animalFix(data.head);
    this.charBod = this.animalFix(data.bod);
    this.charLegs = this.animalFix(data.legs);
    }


animalFix(str){


    switch(str){
      case "dog":
  return 0;
      break;
      case "mantis":
      return 1;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "axolotl":
      return 2;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "bat":
      return 3;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "duck":
      return 4;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "pangolin":
      return 5;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "robo":
      return 6;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      case "slime":
      return 7;
      // "dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
      break;
      default:
      return 100;
    }
}
//AWESOME !
    create(){
    // this.add.text(20, 20, "Battle Scene!", {font: "25px Arial", fill: "yellow"});
    // this.add.text(20, 20, "Battle Scene!", {font: "25px Arial", fill: "yellow"});
    this.countdown = this.add.container(0,0);
    this.music1=this.sound.add("music_001");
    this.music2=this.sound.add("music_002");
    this.music3=this.sound.add("music_003");
    this.music4=this.sound.add("music_004");
    this.music5=this.sound.add("music_005");
    this.musicSounds = [this.music1,this.music2,this.music3,this.music4,this.music5];
  this.battleActive = false;
    this.musicCount=0;
    // this.countdown.this.add.image(320,288,"count3");
    // this.countdown = this.add.image(320,288,"count3");
    var countdown= this.add.container(320, 288);
    var count1 = this.add.image(0,0,"count1");
    var count2 = this.add.image(0,0,"count2");
    var count3 = this.add.image(0,0,"count3");
    var fight = this.add.image(0,0,"fight");

    this.battleCount=0;
    count1.setScale(0);
    count2.setScale(0);
    count3.setScale(0);
    fight.setScale(0);
    countdown.add(count1);
    countdown.add(count2);
    countdown.add(count3);
    countdown.add(fight);

    this.character = new Character(this,"a","b","c","Cool");
    this.character2 = new Character(this,"a","d","x","ok");
    this.winScreen = this.add.image(320,100,"win");
    this.winScreen.setScale(.25);
  this.winScreen.visible=false;
    this.loseScreen = this.add.image(320,100,"lose");
    this.loseScreen.setScale(.25);

    // this.loseScreen.alpha = .5;
    this.loseScreen.visible=false;

    this.character = new Character(this,1,"b","c","Cool");
    this.character2 = new Character(this,1,"d","x","ok");
    // this.character.setDepth(2);
    //   this.character2.setDepth(3);
//add background --- randomly assign

    //    // gsap.set(this.ball, { x:1200, opacity:1});
    // tl.to(this.character2, 1,{x:800, ease:Expo.easeNone,delay:.05});
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    var particles = this.add.particles('count1');
    particles.setPosition( 320, 288);
 //    var particles = this.add.particles('heart');
 //
 //    particles.setPosition( 320, 288);
 // var emitter = particles.createEmitter({
 //       speed: 1000,
 //       speed: 100,
 //       scale: { start: 1, end: 0 },
 //
 //       blendMode: 'ADD'
 //   });
 //   particles.setDepth(0);


   // emitter.positsion.y=500;
     var timeline = this.tweens.createTimeline();
    timeline.play();

    timeline.add({
        targets: count3,
        scale: 10,
        rotation:.5,
        ease: 'Power1',
        duration: 1000,
        delay:0,
        alpha: {
      getStart: () => 1,
      getEnd: () => 0
    }
    });
  timeline.add({
      targets: count2,
      scale: 10,
      rotation:.5,
      ease: 'Power1',
      duration: 1000,
      delay:0,
      alpha: {
    getStart: () => 1,
    getEnd: () => 0
  }
  });

timeline.add({
      targets: count1,
      scale: 10,
      rotation:.5,
      ease: 'Power1',
      duration: 1000,
      delay:0,
      alpha: {
    getStart: () => 1,
    getEnd: () => 0
  }
  });
  timeline.add({
      targets: fight,
      scale: 3,
      rotation:0,
      ease: 'Power1',
      duration: 1000,
      delay:0,
      alpha: {
    getStart: () => 1,
    getEnd: () => 0

  }
    });
// timeline.setCallBack(onComplete,fightEm);
this.timedEvent = this.time.delayedCall(4100, this.fightEm, [], this);
}
  // this.fightEm();
  // setTimeout(this. fightEm, 5000);

  fightEm(){
    // this.character.reposition(320-50,288);
    //  this.character2.reposition(320+50,288,576,0);
    // this.character.makeRandomChar();
    // this.character2.makeRandomChar();
    // this.character.reposition(320-50,450);
    //  this.character2.reposition(320+50,450,576,0);
    // this.character.makeRandomChar();
    // this.character2.makeRandomChar();
    this.winScreen.visible=false;
    this.loseScreen.visible=false;

    if(!this.battleActive){

      this.buildBackground();
      this.character.reposition(320-50,475);
       this.character2.reposition(320+50,475,576,0);

       this.character2.flipIt();

       // this.charHead = animalFix(data.head);
       // this.charBod = animalFix(data.bod);
       // this.caarFeet = animalFix(data.legs);
      this.character.makeRandomChar( this.charHead, this.charBod,this.charLegs);
      this.character2.makeRandomChar("r","r","r");

      this.battleActive= true;
    this.battleMode();
    }

  }
  stopAllSounds(){
this.music1.stop();
this.music1.stop();
this.music2.stop();
this.music3.stop();
this.music4.stop();
this.music5.stop();
  }
  battleMode(){

    this.timedEvent = this.time.delayedCall(1000+Math.random()*1000, this.battleTime, [], this);
    // this.music.removeAll();
    // this.music.stop();
// this.music.remove(true);
  // this.music.stop();
  // this.music.removeAll(true);

    console.log("MUSIC "+ this.musicSounds[this.musicCount] + " : " + this.musicCount);

    this.stopAllSounds();
    this.musicCount++;
    this.musicSounds[this.musicCount].setLoop(true);
    this.musicSounds[this.musicCount].play();
      if(this.musicCount>=4){
        this.musicCount=0;
      }

  }
battleTime ()
  {

    // music.play();

    this.battleCount++;
        console.log("battle continues! "+ this.battleCount);

        switch(this.battleCount){
          case 1:

          case 2:

          case 3:

          case 4:

          case 5:

          case 6:
          this.timedEvent = this.time.delayedCall(1000+Math.random()*1000, this.battleTime, [], this);

          break;
          case 7:
          this.battleCount=0;

      this.timedEvent.destroy();

          this.endBattle();
    //  this.musicSounds[this.musicCount].stop();
          break;

          default:break;
        }
  }
  endBattle(){
    // this.fightBg.alpha = .5;
    if(Math.random()>.5){
      console.log("WINNER :)");
      this.character.winIt(false);
      this.character2.killIt();
      this.winScreen.visible=true;
      this.winScreen.alpha =1;
      this.winScreen.setDepth(1);
    }else{
        console.log("LOSER :( ");
        this.character2.winIt(true);
        this.character.killIt();
        this.loseScreen.alpha =1;
        this.loseScreen.visible=true;
        this.loseScreen.setDepth(1);
    }
    this.battleActive = false;

  }
  // onCompleteHandler (tween, targets)
  // {

  buildBackground(){
       this.fightBg = this.add.image(320,288,this.fightBackgrounds[Math.floor(Math.random()*this.fightBackgrounds.length)]);
       this.fightBg.opacity=.7;
       // this.fightBg.opacity=.7;
       this.fightBg.setScale(.25);
       //this.fightBg.sendtoBack();
          this.fightBg.setDepth(0);

     }

  update() {
    if(this.cursorKeys.space.isDown){
    // this.fightEm();
    if(!this.battleActive){
        // this.fightEm();
          // this.scene.start("TitleScene");
          this.stopAllSounds();
          this.scene.start("BuildScene");
    }
   // this.buildBackground();
   //    this.character.reposition(320-50,288);
   //     this.character2.reposition(320+50,288,576,0);
   //    this.character.makeRandomChar();
   //    this.character2.makeRandomChar();



    }
  }
}
