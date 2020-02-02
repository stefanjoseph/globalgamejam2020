class Character{
  constructor(scene,head,bod,legs,name){
    this.scene = scene;
    this.head = head;
    this.bod = bod;
    this.legs = legs;
    this.name = name;
    // this.charname;
    this.animal = ["dog","mantis","axolot"];
    this.headParts =[];
    this.bodParts=[];
    this.legParts=[];

    this.parts = this.scene.add.container(0,0);
    // this.parts.y = 900;
    // this.makeHead();
  }
  nameMe(name){
    this.charname = name;
  };
  makeHead(){
    // this.parts=this.scene.add.image(200,200,"dogHead");
  }

  reposition(x,y,startx=0,starty=0){
      this.parts.setDepth(2);
    this.parts.x = startx;
    this.parts.y = starty;
    this.parts.setScale(.25);
    this.scene.tweens.killAll();
    this.scene.tweens.add({
        targets: this.parts,
              x: { value: x, duration: 4000, ease: 'Power2' },
              y: { value: y, duration: 1500, ease: 'Bounce.easeOut' }
    });

  }

  makeRandomChar() {

    for(var i=0;i<this.animal.length;i++){
      this.headParts.push(this.animal[i]+"Head");
      this.bodParts.push(this.animal[i]+"Bod");
      this.legParts.push(this.animal[i]+"Legs");
    }

      var headPart = Math.floor(Math.random()*this.animal.length);
      var bodPart = Math.floor(Math.random()*this.animal.length);
      var legPart = Math.floor(Math.random()*this.animal.length);


     this.parts.removeAll(true);
        // this.setScale(2)

      this.head= this.scene.add.image(0,0,this.headParts[headPart]);
      this.bod= this.scene.add.image(0,0,this.bodParts[bodPart]);
      this.feet= this.scene.add.image(0,0,this.legParts[legPart]);

      this.parts.add([this.head,this.bod,this.feet]);


      // this.parts.add(this.scene.add.image(0,0,this.headParts[headPart]));
      // this.parts.add(this.scene.add.image(0,0,this.bodParts[bodPart]));
      // this.parts.add(this.scene.add.image(0,0,this.legParts[legPart]));


       console.log(" HEAD " +this.parts.y);
    }

}
