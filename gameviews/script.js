// inside this file - script.js - we are going to create the beginning phase of our first phaser video game

// outline of the steps we are going to take to create a game in the browser

// step 1. define all of the properties for a new phaser game object that phaser how to organize game (width/height and etc.)
let config = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1000,
    height: 500
  },
  type: Phaser.AUTO,
  physics: {
    default: "arcade"
  },
  scene: {
    preload: myPreloadCode,
    create: myCreateCode,
    update: myUpdateCode
  }
};

// step 2. define some variables that we will use as the game's data model to represent score, or the game objects we control
// ALL VARIABLES IN OUR GAME THAT MORE THAN ONE FUNCTION NEED TO USE MUST BE DECLARED WITH LET OUTSIDE OF CURLIES
let clouds = [];
let cloudsShadow = [];
let cloudsVel = [];
let bkgnd;
let x,y;

// step 3. define a function for the preload event for our game's scene (where we load all of the files we need)
function myPreloadCode() {
  // load all of the files that contain assets our game needs (bitmap images)
  // the image() method takes 2 arguments: (1) the made-up key name of the asset (nickname we use later on)
  // (2) the path for phaser to find the bitmap file I want to load for this asset
  this.load.image( "bkgnd", "game-views-2022-poster.png" );
  this.load.image( "cloud1", "cloud1.svg" );
  this.load.image( "cloud2", "cloud2.svg" );
  this.load.image( "cloud3", "cloud3.svg" );
  this.load.image( "cloud4", "cloud4.svg" );
  this.load.image( "cloud5", "cloud5.svg" );
  this.load.image( "cloud6", "cloud6.svg" );
}

// step 4. define a function for the create event where we write code to layout the game objects and initialize values like score
function myCreateCode() {
  /* create a background game object
  add.image() method takes three arguments
  (1) the horizontal (x-axis) coordinate position
  (2) the vertical (y-axis) coordinate
  (3) the key (or nickname) for the asset we loaded during preload */
  bkgnd = this.add.image( 500, 250, "bkgnd").setInteractive();
  bkgnd.on('pointerdown', function (pointer) {
    let a = 0;
    for(let i=0;i<6;i++) {
      if ( cloudsShadow[i].alpha == 0 ) {
        cloudsShadow[i].alpha = 0.25;
        clouds[i].alpha = 0.9;
      } else {
        cloudsShadow[i].alpha = 0;
        clouds[i].alpha = 0;
      }
    }
  });

  for(let i=0;i<6;i++) {
    x = Phaser.Math.Between(100, 900);
    y = Phaser.Math.Between(25, 475);
    cloudsShadow[i] = this.physics.add.sprite( x+5, y+5, "cloud" + (i+1) );
    cloudsShadow[i].tint = 0x000000;
    cloudsShadow[i].alpha = 0.25;
    clouds[i] = this.physics.add.sprite( x, y, "cloud" + (i+1) );
    clouds[i].alpha = 0.9;
    cloudsVel[i] = Phaser.Math.FloatBetween(-1.25, 1.25);
    if (cloudsVel[i] > -0.25 && cloudsVel[i] < 0.25) {
      cloudsVel[i] = cloudsVel[i] * 2;
    }
  }

  // this.physics.add.overlap( player, star, collectStar, null, this);

  // console.log(this.physics.world.bounds.width);
}

// step 5. define a function for the update event that automatically is repeated over and over by the phaser game engine in a loop
function myUpdateCode() {

  for(let i=0;i<6;i++) {
    clouds[i].x = clouds[i].x + cloudsVel[i];
    if (clouds[i].x < -clouds[i].width/2) {
      clouds[i].x = 1000 + clouds[i].width/2;
      setCloudV(i);
    } else if (clouds[i].x > 1000 + clouds[i].width/2) {
      clouds[i].x = 0 - clouds[i].width/2;
      setCloudV(i);
    }
    cloudsShadow[i].x = clouds[i].x + 5;
  }

}

// step 6. create a new phaser game object to start the game
let mygame = new Phaser.Game( config );

// steps 7 and beyond. create a named function for each special phaser event you want to handle
function setCloudV(c) {
  clouds[c].y = Phaser.Math.Between(25, 475);
  cloudsShadow[c].y = clouds[c].y + 5;
  cloudsVel[c] = Phaser.Math.FloatBetween(-1.25, 1.25);
  if (cloudsVel[c] > -0.25 && cloudsVel[c] < 0.25) {
    cloudsVel[c] = cloudsVel[c] * 2;
  }
}