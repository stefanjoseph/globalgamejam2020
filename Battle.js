class Battle extends Phaser.Scene {

  constructor(){
    super("Battle");
        this.fightBackgrounds =["bg1","bg2","bg3","bg4","bg5"];

  }

  create(){
    this.add.text(20, 20, "Battle Scene!", {font: "25px Arial", fill: "yellow"});
    this.countdown = this.add.container(0,0);
    // this.countdown.this.add.image(320,288,"count3");
    // this.countdown = this.add.image(320,288,"count3");
    var countdown= this.add.container(320, 288);
    // countdown.add.image(320,288,"count3");
    var count1 = this.add.image(0,0,"count1");
    var count2 = this.add.image(0,0,"count2");
    var count3 = this.add.image(0,0,"count3");
    var fight = this.add.image(0,0,"fight");
    count1.setScale(0);
    count2.setScale(0);
    count3.setScale(0);
      fight.setScale(0);

    countdown.add(count1);
    countdown.add(count2);
    countdown.add(count3);
    countdown.add(fight);
    // this.countdown.this.add.image(320,288,"count2");
    // this.countdown.this.add.image(320,288,"count1");
    // this.countdown.this.add.image(320,288,"fight");
    // this.countdown.visible = false;
    // this.countdown.rotation = 89;
    this.character = new Character(this,"a","b","c","Cool");
    this.character2 = new Character(this,"a","d","x","ok");
    // this.character.setDepth(2);
    //   this.character2.setDepth(3);
//add background --- randomly assign


    //     this.character.y = 200;

    // var tl = gsap.timeline( {repeat:-1,yoyo:true});
    //    // gsap.set(this.ball, { x:1200, opacity:1});
    // tl.to(this.character2, 1,{x:800, ease:Expo.easeNone,delay:.05});
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    var particles = this.add.particles('count1');
    particles.setPosition( 320, 288);
 // var emitter = particles.createEmitter({
 //       speed: 1000,
 //       scale: { start: 1, end: 0 },
 //       blendMode: 'ADD'
 //   });


   // emitter.positsion.y=500;
     // emitter.startFollow(mouse.Y);

     // var image = this.add.image(100, 100, 'count1');

  var timeline = this.tweens.createTimeline();


timeline.add({
      targets: count3,
      scale: 10,
      rotation:-.5,
      ease: 'Power1',
      duration: 1200,
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
      duration: 1100,
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
      duration: 1300,

      alpha: {
    getStart: () => 1,
    getEnd: () => 0
  }
  });
timeline.add({
      targets: fight,
      scale: 5,
      rotation:0,
      ease: 'Power1',
      duration: 1000,
      alpha: {
    getStart: () => 1,
    getEnd: () => 0,
    // onComplete:this.fightEm
  },
  // onComplete:function(){character.makeRandomChar();}
     // onComplete: this.onCompleteHandler,
  });
    timeline.play();
// timeline.setCallBack(onComplete,fightEm);

  // this.fightEm();
  // setTimeout(this. fightEm, 5000);
// delayedCall(5000, this.fightEm());
  }

  fightEm(){
    this.character.reposition(320-50,288);
     this.character2.reposition(320+50,288,576,0);
    this.character.makeRandomChar();
    this.character2.makeRandomChar();
  }
  onCompleteHandler (tween, targets)
  {
    console.log('onCompleteHandler');
    fightEm();
      // myImage.setScale(2);
  }
  buildBackground(){
       this.fightBg = this.add.image(320,288,this.fightBackgrounds[Math.floor(Math.random()*this.fightBackgrounds.length)]);
       this.fightBg.opacity=.7;
       //this.fightBg.sendtoBack();
          this.fightBg.setDepth(0);
     }

  update() {
    if(this.cursorKeys.space.isDown){
    // this.fightEm();
   this.buildBackground();
      this.character.reposition(320-50,288);
       this.character2.reposition(320+50,288,576,0);
      this.character.makeRandomChar();
      this.character2.makeRandomChar();

    }
  }


}
