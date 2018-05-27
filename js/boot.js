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

        // force loading fonts
        game.add.text(0, 0, "Hello, world", { 
            font: '1px Eras_Demi',
            fill: '#000000'
        });

        game.add.text(0, 0, "Hello, world", { 
            font: '1px Sim_Sun',
            fill: '#000000'
        });

    },

    create: function()
    {

        game.state.start('load', true, false, 1);    // 1 specify which level

    }

};