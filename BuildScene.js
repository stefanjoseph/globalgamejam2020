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
        collideWorldBounds: false
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
    var rot = 0.02;
    var scale = 1.1;
    var scaleRate = 0.85;
    this.circleCenter = {x: 320, y: 288};
    //Initializing the rotating concentric circles
    for(var i = 0; i < this.numLayers; i++){
      var randomFloat = Math.random();
      var newRot = rot*randomFloat + 0.03;
      var img = rotationGroup.create(this.circleCenter.x, this.circleCenter.y);
      img.setCircle(img.width/2);
      img.setScale(scale)
      this.layers.push({image: img, rotationSpeed: newRot, creatures: [], scale: scale});
      if(randomFloat - 0.5 > 0){
        rot *= -1;
      }
      scaleRate -= 0.10;
      scale *= scaleRate;
    }

    //Initializing the animal parts
    var characters = ["dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
    var parts = ["Head", "Bod", "Legs"];
    var scaleRate = 0.9;
    for(var i = 0; i < this.numLayers - 1; i++){
      var currentAngle = 0;
      var radius = scaleRate*this.layers[i].scale*(this.layers[i].image.width/2);
      // var radius = (this.layers[i].image.width/2);

      for (var j = 0; j < characters.length; j++){
        var creature = characters[j];
        var part = parts[i];
        var posX = this.circleCenter.x + radius*Math.sin(currentAngle);
        var posY = this.circleCenter.y + radius*Math.cos(currentAngle);
        var img = bodyGroup.create(posX, posY, creature+part);
        if (parts[i] == "Head"){
          img.setOrigin(0.5, 0.25);
        }
        else if (parts[i] == "Legs"){
          img.setOrigin(0.5, 0.8);
        }
        img.setScale(0.25);
        this.layers[i].creatures.push({image: img, angle: currentAngle});
        currentAngle += ((2*Math.PI)/characters.length);

        var a = this.circleCenter.x - img.x;
        var b = this.circleCenter.y - img.y;
        var c = Math.sqrt( a*a + b*b );
        console.log(c);

      }
      if (i == 0){
        scaleRate -= 0.10;
      }
      else if(i == 1){
        scaleRate -= 0.05;
      }
    }

    //Initializing the capture token
    var gravityScale = 500;
    this.groupPos = {x: 350, y: -10};
    this.bodies = captureGroup.create(this.groupPos.x, this.groupPos.y);
    this.bodies.setCircle(this.bodies.width/2);
    this.bodies.setGravity( gravityScale*(this.circleCenter.x - this.groupPos.x),
                            gravityScale*(this.circleCenter.y - this.groupPos.y));
    this.bodies.setScale(0.05);

    this.physics.add.collider(rotationGroup, this.bodies);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update(){
    var circleCenter = this.circleCenter;
    var scaleRate = 0.9;
    var changeRate = 0.10
    this.layers.forEach(function (layer, index) {
      //spin them creature parts
      layer.creatures.forEach(function(creature, index){
        // var radius = 0.85*layer.scale*(layer.image.width/2);
        var radius = scaleRate*layer.scale*(layer.image.width/2);

        creature.angle = creature.angle + layer.rotationSpeed;
        creature.image.x = circleCenter.x + radius*Math.sin(creature.angle);
        creature.image.y = circleCenter.y + radius*Math.cos(creature.angle);
      });
      scaleRate -= changeRate;
      changeRate -= 0.05;
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
