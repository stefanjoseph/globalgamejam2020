class Character{
  constructor(scene,head,bod,legs,name){
    this.scene = scene;
    this.head = head;
    console.log("fun" + this.head);
    this.bod = bod;
    this.legs = legs;
    this.name = name;
    this.dead = false;

    // this.charname;
    this.animal = ["dog","mantis","axolot","bat","duck","pangolin","robo","slime"];
    this.headParts =[];
    this.bodParts=[];
    this.legParts=[];
    this.headPartsOn =[];
    this.bodPartsOn=[];
    this.legPartsOn=[];
    this.parts = this.scene.add.container(0,0);
    this.partsOn = this.scene.add.container(0,0);
    // this.parts.y = 900;
    // this.makeHead();
  }
  nameMe(name){
    this.charname = name;
  };
  makeHead(){
    // this.parts=this.scene.add.image(200,200,"dogHead");
  }
  takeAction(){


  // timedEvent = this.time.addEvent({ delay: 2000, callback: onEvent, callbackScope: this });

 //  The same as above, but uses a method signature to declare it (shorter, and compatible with GSAP syntax)
 this.timedEvent = this.scene.time.delayedCall(1000, this.onEvent, [], this);
}

// update ()
// {
//  text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
// }

onEvent ()
{
 // image.setScale(0.5);

 if(this.partsOn.visible){
 this.partsOn.visible=false;
 this.parts.visible =true;
}else{
  this.partsOn.visible=true;
  this.parts.visible =false;
}
 if(!this.dead){
 this.timedEvent = this.scene.time.delayedCall(1000+Math.random()*2000, this.onEvent, [], this);
}
}


  reposition(x,y,startx=0,starty=0){
      this.parts.setDepth(2);
      this.partsOn.setDepth(3);
    this.parts.x = startx;
    this.parts.y = starty;
    this.parts.setScale(.25);

    this.partsOn.x = startx;
    this.partsOn.y = starty;
    this.partsOn.setScale(.25);
    this.partsOn.rotation= 0;
    this.parts.rotation=0;
    this.parts.opacity=1

    this.parts.alpha =1;
      this.partsOn.alpha=1;
    this.scene.tweens.killAll();
    this.scene.tweens.add({
        targets: [this.parts,this.partsOn],
              x: { value: x, duration: 4000, ease: 'Power2' },
              y: { value: y, duration: 1500, ease: 'Bounce.easeOut' }
    });
    this.takeAction();

  }




  flipIt(){
    // this.parts.flipX=false;
// this.parts.flipX = true;
this.parts.scaleX = -.25;
this.partsOn.scaleX = -.25;
  }
  winIt(){
    console.log("KIll it");
// this.partsOn.removeAll(true);
  // this.parts.removeAll(true);
   this.scene.tweens.add({
       targets: [this.parts,this.partsOn],
                y: { value: 320, duration: 2000, ease: 'Power2' },
                y: { value: 288, duration: 2000, ease: 'Power2' },
               scaleX:{ value: .5, duration: 4000, ease: 'Power2' },
               scaleY:{ value: .5, duration: 4000, ease: 'Power2' },

   });
  }
  killIt(){
    console.log("KIll it");
// this.partsOn.removeAll(true);
  // this.parts.removeAll(true);
   this.scene.tweens.add({
       targets: [this.parts,this.partsOn],
             rotation: { value: 300, duration: 4000, ease: 'Power2' },

               scaleX:{ value: 2, duration: 4000, ease: 'Power2' },
               scaleY:{ value: 2, duration: 4000, ease: 'Power2' },
               alpha: {
             getStart: () => 1,
             getEnd: () => 0
           }
   });
  }
setParts(h,b,l){
  this.head = h;
  this.bod = b;
  this.legs = l;
}
  makeRandomChar(h,b,l) {

    for(var i=0;i<this.animal.length;i++){
      this.headParts.push(this.animal[i]+"Head");
      this.bodParts.push(this.animal[i]+"Bod");
      this.legParts.push(this.animal[i]+"Legs");

      this.headPartsOn.push(this.animal[i]+"HeadOn");
      this.bodPartsOn.push(this.animal[i]+"BodOn");
      this.legPartsOn.push(this.animal[i]+"LegsOn");

    }

    //RANDO VERSION ----
      var headPart = Math.floor(Math.random()*this.animal.length);
      var bodPart = Math.floor(Math.random()*this.animal.length);
      var legPart = Math.floor(Math.random()*this.animal.length);
      console.log("THIS HEAD "+ this.head );
      //
      // var headPart = h;
      // var bodPart = b;
      // var legPart=l;
      // console.log("THIS HEAD2 "+ headPart);



     this.parts.removeAll(true);
     this.partsOn.removeAll(true);
        // this.setScale(2)
      this.head= this.scene.add.image(0,0,this.headParts[headPart]);
      this.bod= this.scene.add.image(0,0,this.bodParts[bodPart]);
      this.feet= this.scene.add.image(0,0,this.legParts[legPart]);

      this.headOn= this.scene.add.image(0,0,this.headPartsOn[headPart]);
      this.bodOn= this.scene.add.image(0,0,this.bodPartsOn[bodPart]);
      this.feetOn= this.scene.add.image(0,0,this.legPartsOn[legPart]);

      this.parts.add([this.head,this.bod,this.feet]);
      this.partsOn.add([this.headOn,this.bodOn,this.feetOn]);

      // this.parts.add(this.scene.add.image(0,0,this.headParts[headPart]));
      // this.parts.add(this.scene.add.image(0,0,this.bodParts[bodPart]));
      // this.parts.add(this.scene.add.image(0,0,this.legParts[legPart]));


       console.log(" HEAD " +this.parts.y);
      //this.killIt();
    }

}
