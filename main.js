//Declare a new asset manager. this manages all of the image files. You wont have to mess with this.
var ASSET_MANAGER = new AssetManager();


//---------------------------------------------------//

//                      STEP 1                       //

//---------------------------------------------------//
// All images need to be queueDownloaded here. Just copy one of the existing lines and change the image path
// to match the image you want to use. example: copy/paste the first line and change 'shelf' to 'cactus' or something
ASSET_MANAGER.queueDownload("./images/shelf.png");
ASSET_MANAGER.queueDownload("./images/grass.png");
ASSET_MANAGER.queueDownload("./images/plant.png");
ASSET_MANAGER.queueDownload("./images/plant2.png");


//the download all function is where the magic happens. It takes all the queued images, downloads them to
//the browser of the person connecting to the website, and adds them to the game so the user can see them.
//Things you have to do in this function are explained in the comments inside.
ASSET_MANAGER.downloadAll(function () {
    //these 4 steps prepare the html for images and add the background. you wont have to mess with these.
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);

    

    //---------------------------------------------------//

    //                      STEP 2                       //

    //---------------------------------------------------//
    // All objects need to be declared below.
    // This is where the Plants are created and stored as 'var' variables so we can add them to the gameEngine
    // as entities. What that means is pretty much all you have to do is copy/paste an existing line and fill in
    // your details for that plant. Give it a name (can be anything you want, just remember it for later), and the
    // same image path you declared above. Then you can adjust the X/Y coordinates. 120 is a good Y value for the
    // top shelf. NOTE: the origin (0,0) is in the top left corner. That means reduce the Y value to move things up,
    // and increase it to move things down.

    //  <name>               <game>        <image path>     <x>  <y>
    var grass = new Plant(gameEngine, "./images/grass.png", 150, 120);
    var plant = new Plant(gameEngine, "./images/plant.png", 250, 120);
    var plant2 = new Plant(gameEngine, "./images/plant2.png", 350, 120);



    //---------------------------------------------------//

    //                      STEP 3                       //

    //---------------------------------------------------// 
    //all objects need to be added to the game here. example: gameEngine.addEntity(objectname);
    //make sure you use the same name as when you declared it in the above step.
    gameEngine.addEntity(bg);
    gameEngine.addEntity(grass);
    gameEngine.addEntity(plant);
    gameEngine.addEntity(plant2);
 

    //these last two lines just start up the game after all the entities have been added.
    gameEngine.init(ctx);
    gameEngine.start();
});