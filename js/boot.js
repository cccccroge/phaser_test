// boot state:
// 1.preload the loading assets
// 2.load custom fonts
// 3.start loadState
var bootState = {

    preload: function()
    {
        game.load.image('loading_hint_image_1', 
        'assets/load/loading_hint_image_1.png');
        game.load.image('spinning_dot', 'assets/load/spinning_dot.png');

    },

    create: function()
    {
        // start load state
        game.state.start('load', true, false, 1);    // 1 specify which level


        // force loading fonts
        game.add.text(0, 0, "Hello, world", { 
            font: '84px Eras_Demi',
            fill: '#FFFFFF'
        });

        game.add.text(0, 0, "Hello, world", { 
            font: '84px Sim_Sun',
            fill: '#FFFFFF'
        });

    }

};