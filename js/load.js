// load state:
// 1.load all assets for provided level
// 2.show hint and loading progress
var loadState = {

    // Level num 
    level: 0, 
    
    // Assets directory
    dir: '',        

    // Hints text array
    hint: ['連擊傷害更高，經驗值也越多。'],



    init: function(level)
    {
        if (level === 1) {

            this.level = 1;
            this.dir = 'assets/levelOne/';
        
        } else {

            console.log('unknown level number');
        }

    },

    preload: function()
    {
        // set background color
        game.stage.setBackgroundColor('#131313');

        // set hint image
        var img = game.add.image(game.width / 2, 260, 'loading_hint_image_1');
        img.anchor.set(0.5);

        // set hint text
        var hint = game.add.text(game.width / 2, 364, '{Hint}', 
        { font: '30px Eras_Demi', fill: '#bdbdbd' });
        hint.anchor.set(0.5);
        hint.x = Math.floor(hint.x) + 0.5;
        hint.y = Math.floor(hint.y) + 0.5;

        var txt = game.add.text(game.width / 2, 400, this.hint[0], 
        { font: '18px Sim_Sun', fill: '#bdbdbd', fontWeight: 'bold'});
        txt.anchor.set(0.5);
        txt.x = Math.floor(txt.x) + 0.5;
        txt.y = Math.floor(txt.y) + 0.5;

        // set progress text
        this.progress = game.add.text(game.width / 2, game.height - 100, 
            'loading...0%', { font: '18px Eras_Demi', fill: '#bdbdbd' });
        this.progress.anchor.set(0.5);
        this.progress.x = Math.floor(this.progress.x) + 0.5;
        this.progress.y = Math.floor(this.progress.y) + 0.5;

        // listen to file loaded event
        game.load.onFileComplete.add(this.updateProgress, this);
        game.load.onLoadComplete.add(this.completeLoading, this);

        // set spinning dots
        this.dots = game.add.image(game.width / 2, game.height - 60, 
            'spinning_dot');
        this.dots.anchor.set(0.5);  

        // load character
        game.load.spritesheet('green_hatter', 
            'assets/character/green_hatter.png', 300, 400);

        // load all assets for given level
        var dir = this.dir;
        if (this.level === 1) {

            game.load.tilemap('level_1', dir + 'level_1.json', null, 
                Phaser.Tilemap.TILED_JSON);
            game.load.image('forest_tileset', dir + 'forest.png');

        }

    },

    update: function()
    {
        if (this.dots) {

            this.dots.angle += 2;

        }

        if (this.enterKey.isDown) {

            game.state.start('levelOne');

        }
        
    },

    updateProgress: function(progress, fileKey, success, loadedFiles, files)
    {

        this.progress.setText('loading...' + progress + '%');

    },

    completeLoading: function()
    {
        // show continue
        var continueText = game.add.text(this.dots.x, this.dots.y,
             'press Enter to continue.', 
             { font: '18px Eras_Demi', fill: '#bdbdbd' });
        continueText.anchor.set(0.5);
        continueText.x = Math.floor(continueText.x) + 0.5;
        continueText.y = Math.floor(continueText.y) + 0.5;
        this.dots.destroy();

        // continue blink
        var tween = game.add.tween(continueText);
        tween.to({alpha: 0}, 500, null, true, 500, -1, true);

        // add key input
        this.enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    }

};