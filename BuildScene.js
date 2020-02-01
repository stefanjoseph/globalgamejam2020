class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    this.layers = [];
    this.num_layers = 3;

    var rot = 5;
    var scale = 1.0;

    for(var i = 0; i < this.num_layers; i++) {
      this.layers.push( {image: this.add.image(400,400, "ball"), rotationSpeed: rot} );
      this.layers[i].image.setScale(scale, scale);
      rot *= -1;
      scale *= 0.75;
    }

    // this.circle = new Phaser.Geom.Circle(400, 200, 50);

    // var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
    // graphics.fillCircleShape(this.circle);

  }


  update(){
    // Phaser.Math.RotateAroundDistance(ball2, ball1.x, ball1.y, angle1, distance1);

    this.layers.forEach(function (layerPair, index) {
      layerPair.image.angle = layerPair.image.angle + layerPair.rotationSpeed;
    });

    // console.log(this.ball.rotation);

  }

}

//body part attributes
//section
//animal
//current layer
//compass_position
//
