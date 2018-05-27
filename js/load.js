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
        this.dots = game.add.image(game.width / 2, game.height - 60, 'spinning_dot');
        this.dots.anchor.set(0.5);  

        // load all assets for given level
        var dir = this.dir;
        if (this.level === 1) {

            game.load.image('img1', dir + 'back_to_menu.png');
            game.load.image('img1', dir + 'credit.png');
            game.load.image('img1', dir + 'fall.png');
            game.load.image('img1', dir + 'gameover.png');
            game.load.image('img1', dir + 'green_hatter.png');
            game.load.image('img1', dir + 'green_hatter_large.png');
            game.load.image('img1', dir + 'health_bar.png');
            game.load.image('img1', dir + 'hell.png');
            game.load.image('img1', dir + 'idle.png');
            game.load.image('img1', dir + 'jump_down.png');
            game.load.image('img1', dir + 'jump_off.png');
            game.load.image('img1', dir + 'leaderboard.png');
            game.load.image('img1', dir + 'lighter.png');
            game.load.image('img1', dir + 'menu_background.png');
            game.load.image('img1', dir + 'platform_cracked_dirt.png');
            game.load.image('img1', dir + 'platform_normal_rock.png');
            game.load.image('img1', dir + 'platform_spiking_ground.png');
            game.load.image('img1', dir + 'play.png');
            game.load.image('img1', dir + 'run.png');
            game.load.image('img1', dir + 'small_cracked_dirt.png');
            game.load.image('img1', dir + 'spiderweb_spritesheet.png');
            game.load.image('img1', dir + 'try_again.png');

        }

    },

    update: function()
    {
        if (this.dots) {

            this.dots.angle += 2;

        }
        
    },

    updateProgress: function(progress, fileKey, success, loadedFiles, files)
    {

        this.progress.setText('loading...' + progress + '%');

    },

    completeLoading: function()
    {
        var continueText = game.add.text(this.dots.x, this.dots.y,
             'press Enter to continue.', 
             { font: '18px Eras_Demi', fill: '#bdbdbd' });
        continueText.anchor.set(0.5);
        continueText.x = Math.floor(continueText.x) + 0.5;
        continueText.y = Math.floor(continueText.y) + 0.5;
        this.dots.destroy();


        var tween = game.add.tween(continueText);
        tween.to({alpha: 0}, 500, null, true, 500, -1, true);
    }

};