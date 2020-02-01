class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    this.ball = this.add.image(400,400,"ball");
    // this.ball.setOrigin(0,0);

    // this.circle = new Phaser.Geom.Circle(400, 300, 100);
    // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    // graphics.fillCircleShape(this.circle);
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
