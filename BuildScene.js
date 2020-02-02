class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    // gsap.registerPlugin();
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
    //physics group for capture icon
    var captureGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true
    });
    //physics group for capture icon
    var bodyGroup = this.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false,
        immovable: true
    });
    //physics group for concentric circles
    var rotationGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false,
        immovable: true
    });
    this.layers = [];
    this.numLayers = 4;
    this.numParts = 3;
    var rot = 0.05;
    var scale = 1.75;
    var scaleRate = 0.85;
    this.circleCenter = {x: 320, y: 600};
    //Initializing the rotating concentric circles
    for(var i = 0; i < this.numLayers; i++){
      var randomFloat = Math.random();
      var newRot = rot*randomFloat;
      var img = rotationGroup.create(this.circleCenter.x, this.circleCenter.y);
      img.setCircle(img.width/2);
      this.layers.push({image: img, rotationSpeed: newRot, creatures: [], scale: 1});
      this.layers[i].image.setScale(scale);
      if(randomFloat - 0.5 > 0){
        rot *= -1;
      }
      this.layers[i].scale = scale;
      scaleRate -= 0.10;
      scale *= scaleRate;
    }

    //Initializing the animal parts
    var characters = ["dog","mantis","axolotl","bat","duck","mantis","pangolin","robo","slime"];
    var parts = ["Head", "Bod", "Legs"];
    for(var i = 0; i < this.numLayers - 1; i++){
      var currentAngle = 0;
      var radius = 0.85*this.layers[i].scale*(this.layers[i].image.width/2);
      console.log(radius);
      for (var j = 0; j < characters.length; j++){
        var creature = characters[j];
        var part = parts[i];
        // console.log(creature+part);
        var posX = this.circleCenter.x + radius*Math.sin(currentAngle);
        var posY = this.circleCenter.y + radius*Math.cos(currentAngle);
        var img = bodyGroup.create(posX, posY, creature+part);
        this.layers[i].creatures.push({image: img, angle: currentAngle});
        this.layers[i].creatures[j].image.setScale(0.25);
        currentAngle += ((2*Math.PI)/characters.length);
      }

    }

    //Initializing the capture token
    var gravityScale = 0.05;
    this.groupPos = {x: 350, y: -10};
    this.bodies = captureGroup.create(this.groupPos.x, this.groupPos.y);
    this.bodies.setCircle(this.bodies.width/2);
    this.bodies.setGravity( gravityScale*this.circleCenter.x - this.groupPos.x,
                            gravityScale*this.circleCenter.y - this.groupPos.y);
    this.bodies.setScale(0.1);

    this.physics.add.collider(rotationGroup, this.bodies);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update(){
    var circleCenter = this.circleCenter;

    this.layers.forEach(function (layer, index) {
      //spin them circles
      layer.image.angle = layer.image.angle + layer.rotationSpeed;
      //spin them creature parts
      layer.creatures.forEach(function(creature, index){
        var radius = 0.85*layer.scale*(layer.image.width/2);
        creature.angle = creature.angle + layer.rotationSpeed;
        creature.image.x = circleCenter.x + radius*Math.sin(creature.angle);;
        creature.image.y = circleCenter.y + radius*Math.cos(creature.angle);;
      });
    });
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
