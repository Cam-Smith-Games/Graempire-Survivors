import { Enemy } from "../objects/character/enemy.js";
import { Player } from "../objects/character/player.js";
import { Chunk } from "../objects/chunk.js";
import { Projectile } from "../objects/projectiles/projecitle.js";
import { Spawner } from "../objects/spawner.js";
import { roundTo } from "../util/math.js";
export class MainScene extends Phaser.Scene {
    constructor() {
        super("???");
        this.cursors = null;
        this.colliders = {};
        this.spawners = [];
    }
    // called by phaser when scene gets created
    create() {
        this.load_animations();
        this.physics.world.setFPS(120);
        this.CHUNK_SIZE = Math.max(this.scale.width, this.scale.height);
        this.colliders.enemies = this.physics.add.group({
            key: "enemies"
        });
        this.colliders.projectiles = this.physics.add.group({
            key: "projectiles"
        });
        // NOTE: overlap vs collider. collider does not allow overlapping 
        this.physics.add.overlap(this.colliders.projectiles, this.colliders.enemies, (projectile, enemy) => {
            console.log("PROJECTILE COLLIDED WITH ENEMY", {
                projectile: projectile,
                enemy: enemy
            });
            if (projectile instanceof Projectile && enemy instanceof Enemy) {
                projectile.collide(enemy);
            }
            else {
            }
        });
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
        // background repeats across 3x3 chunk grid surrounding player
        this.bg = this.add.tileSprite(this.player.x, this.player.y, this.CHUNK_SIZE, this.CHUNK_SIZE, "grass");
        this.bg.setDepth(-1);
        this.bg.setScale(3, 3);
        //this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.chunks = [];
        this.cameras.main.startFollow(this.player);
    }
    // #region load
    // preload is called by phaser before create is called
    preload() {
        this.load.atlas("vamp", "res/vamp.png", "res/vamp.json");
        this.load.atlas("bat_purp", "res/bat_purp.png", "res/bat.json");
        this.load.atlas("bat_red", "res/bat_red.png", "res/bat.json");
        this.load.image("grass", "res/grass.jpg");
        this.load.image("graem_happy", "res/graem_happy.png");
        this.load.image("graem_sad", "res/graem_sad.png");
        this.load.image("fireball", "res/fireball.png");
        this.load.image("skull", "res/skull.png");
    }
    load_atlas(key, frame_count, dirs = ["up", "down", "left", "right"], frameRate = 4) {
        for (let dir of dirs) {
            //console.log("LOADING " + key + "_" + dir);
            this.anims.create({
                key: key + "_" + dir,
                // end at frame_count (always start at 0)
                frames: this.anims.generateFrameNames(key, { prefix: dir, end: frame_count - 1 }),
                frameRate: frameRate
            });
        }
    }
    load_animations() {
        this.load_atlas("vamp", 3);
        this.load_atlas("bat_purp", 3, ["up", "right", "down", "left"]);
        this.load_atlas("bat_red", 3, ["up", "right", "down", "left"]);
    }
    // #endregion
    /** gets chunk that player is currently in */
    getChunk(x, y) {
        for (let i = 0; i < this.chunks.length; i++) {
            let chunk = this.chunks[i];
            if (chunk.x == x && chunk.y == y) {
                return chunk;
            }
        }
        // not found -> create new
        let chunk = new Chunk(this, x, y);
        this.chunks.push(chunk);
        return chunk;
    }
    update(_, delta) {
        this.player.update(delta);
        for (let spawner of this.spawners)
            spawner.update(delta);
        for (let enemy of this.colliders.enemies.children.entries)
            enemy.update(delta);
        this.update_chunks();
    }
    update_chunks() {
        // snap player position to chunk grid
        const pos = {
            x: roundTo(this.player.x, this.CHUNK_SIZE),
            y: roundTo(this.player.y, this.CHUNK_SIZE)
        };
        const near_chunks = [];
        // #region create/load chunks surrounding player
        const chunk = this.getChunk(pos.x, pos.y).load();
        // snapping background to chunk pos
        this.bg.setPosition(chunk.x, chunk.y);
        near_chunks.push(chunk);
        // load chunks surrounding current chunk
        const range = 2 * this.CHUNK_SIZE;
        for (var x = pos.x - range; x < pos.x + range; x += this.CHUNK_SIZE) {
            for (var y = pos.y - range; y < pos.y + range; y += this.CHUNK_SIZE) {
                near_chunks.push(this.getChunk(x, y).load());
            }
        }
        // #endregion
        // #region unload far chunks
        // TODO: 
        //      copy enemies from unloaded chunk into newly loaded chunks... 
        //      need to figure out how to do that. probably need to find the farthest chunk and scatter them about
        //  OR
        //      group them by their parent spawner, add to spawn temp count to add to next spawn batch
        //          (spawner has a temp number that gets added to spawn count, resets to 0 on every spawn)
        for (let chunk of this.chunks) {
            if (near_chunks.indexOf(chunk) == -1) {
                chunk.unload();
            }
        }
        // #endregion
    }
}
//# sourceMappingURL=main.js.map