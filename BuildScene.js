class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    // gsap.registerPlugin();
    this.selectedCreature = {head: null, bod: null, legs: null};
    this.circleCenter = {x: 320, y: 288};
    this.activeLayer = -1;
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});

    //physics group for body parts
    var bodyGroup = this.physics.add.group({
        defaultKey: 'ball',
        bounceX: 0.1,
        bounceY: 0.1,
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
    //Rotating concentric circles
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
    var selectedCreaturePart = "";
    var token = this.token;
    var scaleRate = 0.9;
    var changeRate = 0.10;
    var activeLayer = this.activeLayer;

    for(var i = 0; i < this.numLayers - 1; i++){
      var layer = this.layers[i];
      //spin them creature parts
      layer.creatures.forEach(function(creature, index2){
        if(creature.alive){
          var radius = scaleRate*layer.scale*(layer.image.width/2);
          creature.angle = creature.angle + layer.rotationSpeed;
          creature.image.x = circleCenter.x + radius*Math.sin(creature.angle);
          creature.image.y = circleCenter.y + radius*Math.cos(creature.angle);

          if(creature.image.body.hitTest(token.x, token.y)){
            if(layer.depth == activeLayer){
              console.log(creature.name + " Selected");
              selectedCreaturePart = creature.name;
              layer.creatures.forEach(function(creature, index2){
                creature.alive = false;
                creature.image.destroy();
                console.log(creature.name + " Destroyed");
              });
            }
          }
        }
      });
      scaleRate -= changeRate;
      changeRate -= 0.05;
    }

    if(selectedCreaturePart.includes("Head")){
      this.add.image(circleCenter.x, circleCenter.y, selectedCreaturePart).setScale(0.25);
      this.selectedCreature.head = selectedCreaturePart.replace("Head","");
    }
    else if(selectedCreaturePart.includes("Bod")){
      this.add.image(circleCenter.x, circleCenter.y, selectedCreaturePart).setScale(0.25);
      this.selectedCreature.bod = selectedCreaturePart.replace("Bod","");
    }
    else if(selectedCreaturePart.includes("Legs")){
      this.add.image(circleCenter.x, circleCenter.y, selectedCreaturePart).setScale(0.25);
      this.selectedCreature.legs = selectedCreaturePart.replace("Legs","");
    }

    this.token.setGravity( this.circleCenter.x - this.token.x,
                            this.circleCenter.y - this.token.y);

    //Player input
    if(this.cursorKeys.down.isDown){
      this.waitForUp = true;
    }
    else if (this.waitForUp && this.cursorKeys.down.isUp) {
      this.waitForUp = false;
      if (this.layers.length > 0){
        this.layers.shift().image.destroy();
      }
      if (activeLayer < this.numLayers){
        this.activeLayer += 1;
      }

      if (activeLayer == this.numLayers){
        this.scene.start('Battle', {  head: this.selectedCreature.head,
                                      bod: this.selectedCreature.bod,
                                      legs: this.selectedCreature.legs});
      }

    }
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
