/* global Phaser*/
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
    });
//Variables
    var platforms;
    var player;
    var cursors;
    var stars;
    var score = 0;
    var scoreText;
    function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('diamond','assets/diamond.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }
    function create() {
//Background and stars
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'diamond');
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
//Platforms
    //Ground
    var ground = platforms.create(0, game.world.height - 30, 'ground');
    ground.scale.setTo(5.0, 1);
    ground.body.immovable = true;
    //Platform 1
    var ledge = platforms.create(50, 330, 'ground');
    ledge.scale.setTo(1.5, 0.5);
    ledge.body.immovable = true;
    //Platform 2
    ledge = platforms.create(50, 450, 'ground');
    ledge.scale.setTo(1.7, 0.5);
    ledge.body.immovable = true;
    //Platform 3
    ledge = platforms.create(0, 210, 'ground');
    ledge.scale.setTo(1.0, 0.5);
    ledge.body.immovable = true;
    //Platform 4
    ledge = platforms.create(240, 210, 'ground');
    ledge.scale.setTo(3.0, 0.5);
    ledge.body.immovable = true;
//Player plysics
    player = game.add.sprite(0, game.world.height - 111, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 1000; i++) {
//Star physics
        var star = stars.create(i * 0.8, 0, 'diamond');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.8 + Math.random() * 0.2;
        star.body.collideWorldBounds = true;
    }
    scoreText = game.add.text(260, 230, 'Calories gained: 0', { fontsize: '32px', fill: '#000'});
    }
//Player position
    function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    }
//Star collector
    function collectStar(player, star){
    score+= +220;
    star.kill();
    scoreText.text = "Calories gained: " + score; + "Calories gained:";
    }