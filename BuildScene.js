class BuildScene extends Phaser.Scene {
  constructor(){
    super("BuildScene");
  }

  create(){
    // gsap.registerPlugin();
    this.waitForSelection = false;
    this.selectedCreature = {head: null, bod: null, legs: null};
    this.circleCenter = {x: 320, y: 288};
    this.fightBg = this.add.image(this.circleCenter.x, this.circleCenter.y, "bg3");
    this.fightBg.setScale(.25);
    this.activeLayer = -1;
    this.cursorKeys = this.input.keyboard.createCursorKeys();

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
    //Initializing the rotating concentric circles
    //goes from outside to inside -> Depth 0, 1, 2, 3
    for(var i = 0; i < this.numLayers; i++){
      var randomFloat = Math.random();
      var newRot = rot*randomFloat + 0.03;
      if(randomFloat - 0.5 > 0){newRot *= -1;}
      var img = rotationGroup.create(this.circleCenter.x, this.circleCenter.y);
      img.setCircle(img.width/2);
      img.setScale(scale)
      this.layers.push({depth: i, image: img, rotationSpeed: newRot, creatures: [], scale: scale});
      scaleRate -= 0.10;
      scale *= scaleRate;
    }

    //Initializing the nice looking wheel
    this.wheel = this.add.image(this.circleCenter.x, this.circleCenter.y, "wheel");
    this.wheel.setScale(.25);

    //physics group for token
    var tokenGroup = this.physics.add.group({
        defaultKey: 'tokenRed',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false
    });
    //Initializing the capture token
    var gravityScale = 500;
    this.groupPos = {x: 350, y: -10};
    this.token = tokenGroup.create(this.groupPos.x, this.groupPos.y);
    this.token.setCircle(this.token.width/2);
    this.token.setGravity(gravityScale*(this.circleCenter.x - this.groupPos.x),
                          gravityScale*(this.circleCenter.y - this.groupPos.y));
    this.token.setScale(0.25);

    this.physics.add.collider(rotationGroup, this.token);

    //physics group for animal parts
    var bodyGroup = this.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: false,
        immovable: true
    });
    //Initializing the animal parts
    var characters = ["dog","mantis","axolotl","bat","duck","pangolin","robo","slime"];
    var parts = ["Head", "Bod", "Legs"];
    // var parts = ["Head", "Head", "Head"];
    // var parts = ["Bod", "Bod", "Bod"];
    // var parts = ["Legs", "Legs", "Legs"];

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
        var img = this.physics.add.image(posX, posY, creature+part);
        if (parts[i] == "Head"){
          img.body.setSize(img.width, img.height/2);
          img.setOrigin(0.5, 0.25);
          img.body.setOffset(0, 0);
        }
        else if (parts[i] == "Bod"){
          img.body.setSize(img.width, img.height/4);
          img.setOrigin(0.5, 0.6);
          img.body.setOffset(0, img.height/2);
        }
        else if (parts[i] == "Legs"){
          img.body.setSize(img.width, img.height/4);
          img.setOrigin(0.5, 0.8);
          img.body.setOffset(0, 3*img.height/4);
        }
        img.setScale(0.25);
        this.physics.add.overlap(img, this.token);
        this.layers[i].creatures.push({name: creature+part, image: img, angle: currentAngle, alive: true});
        currentAngle += ((2*Math.PI)/characters.length);
      }
      if (i == 0){
        scaleRate -= 0.10;
      }
      else if(i == 1){
        scaleRate -= 0.05;
      }
    }
  }

  update(){
    var circleCenter = this.circleCenter;
    var selectedCreaturePart = "";
    var token = this.token;
    var scaleRate = 0.9;
    var changeRate = 0.10;
    var activeLayer = this.activeLayer;
    var waitForSelection = this.waitForSelection;

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
              // console.log(creature.name + " Selected");
              selectedCreaturePart = creature.name;
              layer.creatures.forEach(function(creature, index2){
                waitForSelection = false;
                creature.alive = false;
                creature.image.destroy();
                // console.log(creature.name + " Destroyed");
              });
            }
          }
        }
      });
      scaleRate -= changeRate;
      changeRate -= 0.05;
    }

    this.waitForSelection = waitForSelection;

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
    if(this.cursorKeys.space.isDown){
      this.waitForUp = true;
    }
    else if (this.waitForUp && this.cursorKeys.space.isUp) {
      this.waitForUp = false;

      if (activeLayer < this.numLayers - 2 && !this.waitForSelection){
        this.layers[this.activeLayer+1].image.destroy();
        this.waitForSelection = true;
        if (activeLayer < this.numLayers){
          this.activeLayer += 1;
        }
      }

      if (!this.waitForSelection && activeLayer == 2){
        this.scene.start('Battle', {  head: this.selectedCreature.head,
                                      bod: this.selectedCreature.bod,
                                      legs: this.selectedCreature.legs});
      }

    }
  }
}
