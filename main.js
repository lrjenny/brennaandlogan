/*
 * This is the Background function. Just accepts the game engine so it can draw the shelf background.
 * You shouldnt have to mess with this, unless you at some point want to animate the background (drifting
 * clouds, purring cat, steaming coffee, etc).
 */

function Background(game) {
    Entity.call(this, game, 0, 0);
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./images/shelf.png"), 0, 0, 800, 700, 1, 1, true, true);
}
Background.prototype.draw = function (ctx) {
	this.animation.drawStatic(ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

/////////////////////////////////////////////////////////////////////////////////////////

/*
 * This is the Plant function. It accepts the gameEngine, a file path to the image (example: "./images/image.png"),
 * and the x and y positions to display the plant on screen. You shouldnt have to change this to add a new plant, just
 * go to the downloadAll function (below) and supply it with the gameEngine, image path, and position. This 
 * function will handle the rest.
 */

function Plant(game, image, posx, posy) {
    this.image = image;
    this.animation = new Animation(ASSET_MANAGER.getAsset(this.image), 0, 0, 64, 64, 1, 1, true, false);
    Entity.call(this, game, posx, posy);
}

Plant.prototype = new Entity();
Plant.prototype.constructor = Background;

Plant.prototype.update = function () {
    this.animation = new Animation(ASSET_MANAGER.getAsset(this.image), 0, 0, 64, 64, 1, 1, true, false);
}

Plant.prototype.draw = function (ctx) {
	this.animation.drawStatic(ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//                         the "main" code begins here                                 //



//Declare a new asset manager. this manages all of the image files. You wont have to mess with this.
var ASSET_MANAGER = new AssetManager();

//All images need to be queueDownloaded here. Just copy one of the existing lines and change the image path
// to match the image you want to use.
ASSET_MANAGER.queueDownload("./images/shelf.png");
ASSET_MANAGER.queueDownload("./images/grass.png");
ASSET_MANAGER.queueDownload("./images/plant.png");
ASSET_MANAGER.queueDownload("./images/plant2.png");


//the download all function is where the magic happens. It takes all the queued images, downloads them to
//the browser of the person connecting to the website, and adds them to the game so the user can see them.
//Things you have to do in this function are explained in the comments inside.
ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    //All objects need to be declared here. var means variable. in JavaScript, everything is a variable.
    // next is the object name such as gameEngine for the game engine. easy enough. then set it equal to a
    // new object. example: 
    //                          var cactus = new Plant(gameEngine, "./images/cactus.png", 100, 100);

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);


    // A name can be anything you want, gameEngine should always be there. Image paths are always in the
    // same format, just with a different image name. x and y, you can play with a little. 100 pixels apart is
    // a good spacing, but you can adjust. 120 is a good y value for the first shelf. NOTE: y is inverted. The
    // smaller the Y value, the further up the screen it is. In other words, 0,0 is the top left corner.

    //  <name>               <game>        <image path>     <x>  <y>
    var grass = new Plant(gameEngine, "./images/grass.png", 150, 120);
    var plant = new Plant(gameEngine, "./images/plant.png", 250, 120);
    var plant2 = new Plant(gameEngine, "./images/plant2.png", 350, 120);

    //all objects need to be added to the game here. example: gameEngine.addEntity(objectname);
    //make sure you use the same name as when you declared it in the above step.
    gameEngine.addEntity(bg);
    gameEngine.addEntity(grass);
    gameEngine.addEntity(plant);
    gameEngine.addEntity(plant2);
 
    gameEngine.init(ctx);
    gameEngine.start();
});



//                   Dont worry about anything below this line.                        //
//            It's the animation code for drawing the images on screen.                //
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.drawStatic = function (ctx, x, y) {
    ctx.drawImage(this.spriteSheet, x, y);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
