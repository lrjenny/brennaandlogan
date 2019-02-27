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