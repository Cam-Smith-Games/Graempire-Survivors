import { Enemy } from "../character/enemy.js";
import { Player } from "../character/player.js";
import { Fireball } from "../projectiles/fireball.js";

export interface IMainScene extends Phaser.Scene {
    player:Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    colliders: Record<string,Phaser.Physics.Arcade.Group>;
}

export class MainScene extends Phaser.Scene implements IMainScene {

    // #region enemy spawning (this will be changed. currently very simple)
    /** rate to spawn enemies (milliseconds) */
    spawnRate = 5000;
    /** time since last enemy spawn (milliseconds) */
    spawnTimer = 5000;
    /** number of monsters to spawn when it's spawn time */
    spawnCount = 10;
    // #endregion

    player: Player;


    cursors: Phaser.Types.Input.Keyboard.CursorKeys;


 
    colliders: Record<string,Phaser.Physics.Arcade.Group>;

    constructor() {
        super("???");

        this.cursors = null;
        this.colliders = {};
    }


    preload() {
        this.load.atlas("vamp", "/res/vamp.png", "/res/vamp.json");
        this.load.image("graem_happy", "/res/graem_happy.png");
        this.load.image("graem_sad", "/res/graem_sad.png");
        this.load.image("fireball", "/res/fireball.png");
    }

    create() {
        this.create_animations();

        this.physics.world.setFPS(120);

        this.player = new Player({
            main: this,
            texture: "vamp",
            scale: { x: 3, y: 3 },
            pos: {
                x: this.scale.width / 2,
                y: this.scale.height / 2
            },
            speed: 300
        });

    
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = <Phaser.Types.Input.Keyboard.CursorKeys>this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.colliders.enemies = this.physics.add.group({
            key: "enemies"
        });
        this.colliders.projectiles = this.physics.add.group({
            key: "projectiles"
        });


        this.physics.add.collider(this.colliders.projectiles, this.colliders.enemies, (projectile, enemy) => {
            if (projectile instanceof Fireball && enemy instanceof Enemy) {
                projectile.collide(enemy)
            }

            /*console.log("PROJECTILE COLLIDED WITH ENEMY", {
                projectile: projectile,
                enemy: enemy
            });*/
        })

        /*this.physics.add.collider(this.player, this.colliders.enemies, (player, enemy) => {
            /*console.log("PLAYER COLLIDED WITH ENEMY", {
                player: player,
                enemy: enemy
            });*
        })*/

    }

    create_animations() {

        this.anims.create({
            key: "vamp_up",
            frames: this.anims.generateFrameNames('vamp', { prefix: "up", end: 2 }),
            frameRate: 4
        });
        this.anims.create({
            key: "vamp_down",
            frames: this.anims.generateFrameNames('vamp', { prefix: "down", end: 2 }),
            frameRate: 4
        });
        this.anims.create({
            key: "vamp_left",
            frames: this.anims.generateFrameNames('vamp', { prefix: "left", end: 2 }),
            frameRate: 4
        });
        this.anims.create({
            key: "vamp_right",
            frames: this.anims.generateFrameNames('vamp', { prefix: "right", end: 2 }),
            frameRate: 4
        });
    }

    update(_:number, delta:number) {
        this.update_spawn(delta);
        this.update_input();

        this.player.update(delta);

        for (let enemy of this.colliders.enemies.children.entries) {
            enemy.update(delta);
        }

    }

    private update_spawn(delta:number) {
        this.spawnTimer += delta;
        if (this.spawnTimer > this.spawnRate) {
            this.spawnTimer = 0;

            const padding = 100;

            for (let i = 0; i < this.spawnCount; i++) {

                let x = (Math.random() * this.scale.width - padding) + padding;
                let y = (Math.random() * this.scale.height - padding) + padding;

                // todo: randomize pos
                new Enemy({
                    main: this,
                    texture: "graem_sad",
                    scale: { x: 0.15, y: 0.15 },
                    pos: { x: x, y: y },
                    speed: 100
                });
            }
        }
    }

    private update_input() {
      
    }
}