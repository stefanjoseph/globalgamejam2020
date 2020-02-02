class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    // gsap.registerPlugin();
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    //physics group for body parts
    var bodyGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false
    });

    //physics group for concentric circles
    var rotationGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false
    });

    this.layers = [];
    this.numLayers = 4;
    this.numParts = 3;

    var rot = 5;
    var scale = 1.37;
    var scaleRate = 0.85;
    this.circleCenter = {x: 320, y: 600};
    //Initializing the rotating concentric circles
    for(var i = 0; i < this.numLayers; i++){
      var img = rotationGroup.create(this.circleCenter.x, this.circleCenter.y).setImmovable();
      this.layers.push({image: img, rotationSpeed: rot});
      this.layers[i].image.setScale(scale, scale);
      rot *= -1;
      scaleRate -= 0.10;
      scale *= scaleRate;
    }

    var gravityScale = 0.05;
    this.groupPos = {x: 350, y: -10};
    this.bodies = bodyGroup.create(this.groupPos.x, this.groupPos.y);
    this.bodies.setGravity( gravityScale*this.circleCenter.x - this.groupPos.x,
                            gravityScale*this.circleCenter.y - this.groupPos.y);
    this.bodies.setScale(0.1);

    this.physics.add.collider(rotationGroup, this.bodies);


    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update(){
    this.layers.forEach(function (layerPair, index) {
      layerPair.image.angle = layerPair.image.angle + layerPair.rotationSpeed;
    });

    var circleCenter = this.circleCenter;
    var layers = this.layers;

    this.bodies.setGravity(this.circleCenter.x - this.bodies.x,
                              this.circleCenter.y - this.bodies.y);

    //Player input
    if(this.cursorKeys.down.isDown){
      this.waitForUp = true;
    }
    else if (this.waitForUp && this.cursorKeys.down.isUp) {
      this.waitForUp = false;
      if (this.layers.length > 1){
        this.layers.shift().image.destroy();
      }
    }
  }
}
