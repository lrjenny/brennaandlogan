/*
 * This is the Background function. Just accepts the game engine so it can draw the shelf background.
 * You shouldnt have to mess with this, unless you at some point want to animate the background (drifting
 * clouds, purring cat, steaming coffee, etc).
 */

function Background(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./images/shelf.png"), 0, 0, 800, 700, 1, 1, true, true);
    Entity.call(this, game, 0, 0);
}

Background.prototype.update = function () {}

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
    this.game = game;
    this.happy = false;
    this.count = 0;
    this.animation = new Animation(ASSET_MANAGER.getAsset(this.image), 0, 0, 64, 64, 1, 1, true, false);
    Entity.call(this, game, posx, posy);
}

Plant.prototype = new Entity();
Plant.prototype.constructor = Plant;

Plant.prototype.update = function () {
    if(this.game.space) this.happy = true;
    if(this.happy) {
        this.game.addEntity(new Effect(this.game, this.x + 5, this.y - 10))
        this.happy = false;
    }
}

Plant.prototype.draw = function (ctx) {
	this.animation.drawStatic(ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}



function Effect(game, posx, posy) {
    this.xStart = posx;
    this.yStart = posy;
    this.goRight = true;
    this.image = Math.floor(Math.random() * 2) == 1 ? "./images/heart.png" : "./images/smile.png";
    this.animation = new Animation(ASSET_MANAGER.getAsset(this.image), 0, 0, 14, 12, 1, 1, true, false);
    Entity.call(this, game, posx, posy);
}

Effect.prototype = new Entity();
Effect.prototype.constructor = Effect;

Effect.prototype.update = function () {
    if(this.x > this.xStart + 40) {
        this.goRight = false;
    }
    if(this.x < this.xStart) {
        this.goRight = true;
    }

    if(this.goRight) {
        this.x+=3;
    } else {
        this.x-=3;
    }

    this.y-=1;
    if(this.y < this.yStart - 40) {
        this.removeFromWorld = true;
    }
}

Effect.prototype.draw = function (ctx) {
	this.animation.drawStatic(ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}