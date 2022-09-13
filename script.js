// inside this file - script.js - we are going to create our first phaser video game

// outline of the steps we are going to take to create a game in the browser

// step 1. define all of the properties for a new phaser game object that phaser how to organize game (width/height and etc.)
let config = {
  // we use an object value a list of property names and their assoc values
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: myPreloadCode,
    create: myCreateCode,
    update: myUpdateCode
  }
};

// step 2. define some variables that we will use as the game's data model to represent score, or the game objects we control
// ALL VARIABLES IN OUR GAME THAT MORE THAN ONE FUNCTION NEED TO USE MUST BE DECLARED WITH LET OUTSIDE OF CURLIES
let player;
let star;
let arrowkeys;


// step 3. define a function for the preload event for our game's scene (where we load all of the files we need)
function myPreloadCode() {
  // load all of the files that contain assets our game needs (bitmap images)
  // the image() method takes 2 arguments: (1) the made-up key name of the asset (nickname we use later on)
  // (2) the path for phaser to find the bitmap file I want to load for this asset
  this.load.image('sky','assets/sky.png');
  this.load.image('star','assets/star.png');
  this.load.image('dude','assets/bomb.png');
  console.log("preload done");
}

// step 4. define a function for the create event where we write code to layout the game objects and initialize values like score
function myCreateCode() {
  /* create a background game object
  add.image() method takes three arguments
  (1) the horizontal (x-axis) coordinate position
  (2) the vertical (y-axis) coordinate
  (3) the key (or nickname) for the asset we loaded during preload */
  this.add.image( 400, 300, "sky");

// add a player controlled game object (sprite) and save the player sprite into a "global javascript variable"
  player = this.physics.add.sprite( 100, 450, "dude" );

  star = this.physics.add.sprite( 300, 50, "star" );

  // now lets enable keyboard controls using the inputmanager for our scene
  arrowkeys = this.input.keyboard.createCursorKeys();

  // during the create event for my scene, define a collision event and ask phaser tro run my collectStar() when things collide
  // arguments for overlap()
  // (1) the variable that holds one of the sprites we want to detect collision for
  // (2) the variable that holds the other sprite we are looking for
  // (3) the name of the function that you want to have phaser run when the sprites touch
  // (4) set this to null (or nothing for now)
  // (5) give the function your current scene using this
  this.physics.add.overlap( player, star, collectStar, null, this);
  
}

// step 5. define a function for the update event that automatically is repeated over and over by the phaser game engine in a loop
function myUpdateCode() {
  // ask about the state of the arrowkeys during the update (30fps)
  if ( arrowkeys.left.isDown ) {
    player.setVelocityX(-160);
  } else if ( arrowkeys.right.isDown ) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  // ask about the state of the arrowkeys during the update (30fps)
   if ( arrowkeys.up.isDown ) {
     player.setVelocityY(-160);
   } else if ( arrowkeys.down.isDown ) {
     player.setVelocityY(160);
   } else {
     player.setVelocityY(0);
   }
}

// step 6. create a new phaser Game object to start the game
let mygame = new Phaser.Game(config);

// steps 7 and beyond. create a named function for each special phaser event you want to handle
function collectStar() {
  console.log("overlap detected.");
}