var levelOneState = {

    create: function()
    {
        // create tilemap and world
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 2000;

        this.map = game.add.tilemap('level_1');
        this.map.addTilesetImage('forest', 'forest_tileset');
        var layer = this.map.createLayer('layer_1');
        layer.resizeWorld();

        game.physics.p2.convertCollisionObjects(this.map, 'layer_collision');

        game.camera.setPosition(0, 360);

        

        // add character
        this.player = game.add.sprite(50, 50, 'green_hatter');
        this.player.scale.setTo(0.35);

        this.player.animations.add('idle',
            Phaser.ArrayUtils.numberArray(0, 49), 62.5, true);
        this.player.animations.add('run',
            Phaser.ArrayUtils.numberArray(50, 111), 150, true);
        this.player.animations.add('jump_off',
            Phaser.ArrayUtils.numberArray(150, 164), 62.5, false);
        this.player.animations.add('fall',
            Phaser.ArrayUtils.numberArray(200, 261), 62.5, true);
        this.player.animations.add('jump_down',
            Phaser.ArrayUtils.numberArray(300, 336), 350, false);

        game.physics.p2.enable(this.player, false);
        this.player.body.damping = 0.8;
        this.player.body.fixedRotation = true;
        this.player.body.clearShapes();     // clear default rectangle shape
        this.player.body.addCapsule(55, 25, 0, 5,
            Phaser.Math.degToRad(90));
        this.player.body.collideWorldBounds = true;
        this.player.body.onBeginContact.add(this.playerCollide, this);
        this.player.body.onEndContact.add(this.playerNotCollide, this);

        this.playerSpeed = 300;
        this.playerJumpSpeed = 750;
        //this.playerOnGround = false;

        this.PLAYERSTATE = {
            IDLE: 1,
            RUNNING: 2,
            JUMPING_OFF: 3,
            FALLING: 4,
            JUMPING_DOWN: 5
        };
        this.playerState = this.PLAYERSTATE.IDLE;

        // record key input
        this.keyRecord = {
            'LEFT': false,
            'RIGHT': false,
            'SPACEBAR': false
        }




    },

    update: function()
    {
        // check input
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            this.keyRecord['LEFT'] = true;
        else
            this.keyRecord['LEFT'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            this.keyRecord['RIGHT'] = true;
        else
            this.keyRecord['RIGHT'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            this.keyRecord['SPACEBAR'] = true;
        else
            this.keyRecord['SPACEBAR'] = false;

        // change state
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                /*-- IDLE to RUNNING --*/
                if (this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']
                    && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.RUNNING;

                } else if (this.keyRecord['RIGHT']
                    && !this.keyRecord['LEFT']
                    && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.RUNNING;

                }
                /*-- IDLE to JUMPING_OFF --*/
                else if ((this.keyRecord['SPACEBAR']
                    && this.isPlayerOnGround())) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.player.body.velocity.y -= this.playerJumpSpeed;
                    //this.playerOnGround = false;

                }

                /*-- IDLE to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

            case this.PLAYERSTATE.RUNNING:
                /*-- RUNNING to IDLE: not pressed --*/
                if (!this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.IDLE;

                }
                /*-- RUNNING to IDLE: presse both --*/
                else if (this.keyRecord['LEFT']
                    && this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.IDLE;

                }
                /*-- RUNNING to JUMPING_OFF --*/
                else if (this.keyRecord['SPACEBAR']
                      && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.player.body.velocity.y -= this.playerJumpSpeed;
                    //this.playerOnGround = false;

                }

                /*-- RUNNING to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

            case this.PLAYERSTATE.JUMPING_OFF:
                /*-- JUMING_OFF to FALLING --*/
                this.player.animations.currentAnim.onComplete.add(
                    function () {

                        this.playerState = this.PLAYERSTATE.FALLING;

                    }, this
                );
                break;

            case this.PLAYERSTATE.FALLING:
                /*-- FALLING to JUMPING_DOWN --*/
                if (this.isPlayerOnGround()) {
  
                    this.playerState = this.PLAYERSTATE.JUMPING_DOWN;

                }
                break;

            case this.PLAYERSTATE.JUMPING_DOWN:
                this.player.animations.currentAnim.onComplete.add(
                    function () {
                        /*-- JUMING_DOWN to RUNNING --*/
                        if (this.keyRecord['LEFT']
                            && !this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        } else if (!this.keyRecord['LEFT']
                            && this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        }
                        /*-- JUMING_DOWN to IDLE --*/
                        else {

                            this.playerState = this.PLAYERSTATE.IDLE;

                        }
                    }, this
                );
                /*-- JUMPING_DOWN to JUMPING_OFF --*/
                if (this.keyRecord['SPACEBAR'] && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.player.body.velocity.y -= this.playerJumpSpeed;
                    //this.playerOnGround = false;

                }
                /*-- JUMPING_DOWN to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

        }

        // update player
        /*-- velocity: x --*/
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                this.player.body.velocity.x = 0;
                break;

            case this.PLAYERSTATE.RUNNING:
                if (this.keyRecord['LEFT'])
                    this.player.body.velocity.x = -this.playerSpeed;
                else
                    this.player.body.velocity.x = this.playerSpeed;
                break;

            case this.PLAYERSTATE.JUMPING_OFF:
            case this.PLAYERSTATE.FALLING:
            case this.PLAYERSTATE.JUMPING_DOWN:
                if (this.keyRecord['LEFT'])
                    this.player.body.velocity.x = -this.playerSpeed;
                else if (this.keyRecord['RIGHT'])
                    this.player.body.velocity.x = this.playerSpeed;
                else
                    this.player.body.velocity.x = 0;
                break;

        }

        /*-- animation --*/
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                this.player.animations.play('idle');
                break;

            case this.PLAYERSTATE.RUNNING:
                this.player.animations.play('run');
                break;

            case this.PLAYERSTATE.JUMPING_OFF:
                this.player.animations.play('jump_off');
                break;

            case this.PLAYERSTATE.FALLING:
                this.player.animations.play('fall');
                break;

            case this.PLAYERSTATE.JUMPING_DOWN:
                this.player.animations.play('jump_down');
                break;

        }

        /*-- sprite direction --*/
        if (this.keyRecord['RIGHT'] && !this.keyRecord['LEFT']
            && this.player.scale.x > 0)
            this.player.scale.x *= -1;
        if (this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']
            && this.player.scale.x < 0)
            this.player.scale.x *= -1;

    },

    playerCollide: function(bodyA, bodyB, shapeA, shapeB, equation) {

        this.playerOnGround = true;
        this.lastCollideBody = bodyA;

    },


    playerNotCollide: function (bodyA, bodyB, shapeA, shapeB) {

        if (bodyA === this.lastCollideBody) {

            this.playerOnGround = false;
            
        }
        
    },

    isPlayerOnGround: function ()
    {
        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {

            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {

                var yAxis = p2.vec2.fromValues(0, 1);
                var d = p2.vec2.dot(c.normalA, yAxis);
                if (Math.abs(d) > 0.5) result = true;

            }

        }

        return result;

    }

};