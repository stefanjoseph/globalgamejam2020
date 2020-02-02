class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    //physics
    var bodyGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 1,
        bounceY: 1,
        collideWorldBounds: false
    });

    var rotationGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false
    });

    this.layers = [];
    this.numLayers = 3;
    this.numParts = 3;

    var rot = 5;
    var scale = 1.37;
    this.circleCenter = {x: 320, y: 600};
    //Rotating concentric circles
    for(var i = 0; i < this.numLayers; i++){
      var img = rotationGroup.create(this.circleCenter.x, this.circleCenter.y);
      this.layers.push({image: img, rotationSpeed: rot});
      this.layers[i].image.setScale(scale, scale);
      rot *= -1;
      scale *= 0.75;
    }

    var gravityScale = 0.15;
    this.groupPos = {x: 350, y: 100};
    this.bodies = bodyGroup.create(this.groupPos.x, this.groupPos.y);
    this.bodies.setGravity( gravityScale*this.circleCenter.x - this.groupPos.x,
                            gravityScale*this.circleCenter.y - this.groupPos.y);
    this.bodies.setScale(0.25);

    this.physics.add.collider(rotationGroup, this.bodies);

  }

  update(){
    this.layers.forEach(function (layerPair, index) {
      layerPair.image.angle = layerPair.image.angle + layerPair.rotationSpeed;
    });

    var circleCenter = this.circleCenter;
    var layers = this.layers;

    this.bodies.setGravity(this.circleCenter.x - this.bodies.x,
                              this.circleCenter.y - this.bodies.y);



  }

}

//body part attributes
//section
//animal
//current layer
//compass_position
//

//instantiating body parts
// this.bodyParts = [];
// for(var i = 0; i < this.numParts; i++){
//   var x = this.layers[i].image.x + (this.layers[i].image.width/2);
//   var y = this.layers[i].image.y + (this.layers[i].image.width/2);
//   this.bodyParts.push({object: new Phaser.Geom.Circle(this.circleCenter.x, this.circleCenter.y, 5),
//                         rotationSpeed: this.layers[i].rotationSpeed,
//                         layer: i});
//
//   var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
//   graphics.fillCircleShape(this.bodyParts[i].object);
//
// }
