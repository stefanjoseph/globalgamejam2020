class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    // gsap.registerPlugin();
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    this.ball = this.add.image(400,400,"ball");
    // this.ball.setOrigin(0,0);
      // var tl = gsap.timeline( {repeat:-1,yoyo:true});
         // gsap.set(this.ball, { x:1200, opacity:1});
         // tl.to(this.ball, 1,{x:500, ease:Expo.easeNone,delay:.05});

    // this.circle = new Phaser.Geom.Circle(400, 300, 100);
    // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    // graphics.fillCircleShape(this.circle);
        this.scene.start("Battle");
  }


  update(){

    this.ball.angle = this.ball.angle+0.5;

  }

}

//body part attributes
//section
//animal
//current layer
//compass_position
//
