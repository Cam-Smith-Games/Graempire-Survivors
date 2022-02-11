import { Enemy } from "../objects/character/enemy.js";
import { Player } from "../objects/character/player.js";
import { Fireball } from "../objects/projectiles/fireball.js";
import { Spawner } from "../objects/spawner.js";

export interface IMainScene extends Phaser.Scene {
    player:Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    colliders: Record<string,Phaser.Physics.Arcade.Group>;
}

export class MainScene extends Phaser.Scene implements IMainScene {
    player: Player;


    cursors: Phaser.Types.Input.Keyboard.CursorKeys;


 
    colliders: Record<string,Phaser.Physics.Arcade.Group>;

    spawners: Spawner[];

    constructor() {
        super("???");

        this.cursors = null;
        this.colliders = {};
        this.spawners = [];
    }


    preload() {
        this.load.atlas("vamp", "res/vamp.png", "res/vamp.json");
        this.load.atlas("bat_purp", "res/bat_purp.png", "res/bat.json");
        this.load.atlas("bat_red", "res/bat_red.png", "res/bat.json");

        this.load.image("graem_happy", "res/graem_happy.png");
        this.load.image("graem_sad", "res/graem_sad.png");
        this.load.image("fireball", "res/fireball.png");
    }

    create() {
        this.load_animations();

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

        this.spawners = [
            new Spawner({
                main: this,
                params: {
                    texture: "graem_sad",
                    scale: { x: 0.15, y: 0.15 },
                    speed: 100,
                    animate: false
                }
            }), 
            new Spawner({
                main: this,
                params: {
                    texture: "bat_purp",
                    scale: { x: 2, y: 2 },
                    speed: 100
                }
            }), 
        ];


    }

    load_atlas(key:string, frame_count:number, dirs:string[] = ["up","down","left","right"], frameRate:number = 4) {
        for (let dir of dirs) {
            console.log("LOADING " + key + "_" + dir);
            this.anims.create({
                key: key + "_" + dir,
                // end at frame_count (always start at 0)
                frames: this.anims.generateFrameNames(key, { prefix: dir, end: frame_count - 1 }),
                frameRate: frameRate
            })
        }
    }

    load_animations() {
        this.load_atlas("vamp", 3);
        this.load_atlas("bat_purp", 3, ["up", "right", "down", "left"]);
        this.load_atlas("bat_red", 3, ["up", "right", "down", "left"]);
    }

    update(_:number, delta:number) {
        this.update_input();

        this.player.update(delta);

        for (let spawner of this.spawners) spawner.update(delta);

        for (let enemy of this.colliders.enemies.children.entries) {
            enemy.update(delta);
        }

    }



    private update_input() {
      
    }
}