class Scene2 extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    this.circle = new Phaser.Geom.Circle(400, 300, 100);

    var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    graphics.fillCircleShape(this.circle);
  }


  update(){

    this.circle.angle = this.circle.angle+10;

  }

}

//body part attributes
//section
//animal
//current layer
//compass_position
//
