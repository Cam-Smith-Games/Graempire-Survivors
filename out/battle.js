import { Knight } from "./character/knight.js";
import { RaidGroup, TargetPriority } from "./group.js";
export class BattleScene extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        /** this is separate from actually pausing the scene. the scene can be pauses separately from the battle itself */
        this.paused = true;
        this.characters = [];
        this.groups = [
            new RaidGroup({
                name: "Melees",
                priority: TargetPriority.LOWEST_HP
            })
        ];
    }
    preload() {
        this.load.atlas("knight", "/res/knight.png", "/res/knight.json");
    }
    create() {
        console.log("Creating BattleScene...");
        createAnimations(this);
        let y = 0;
        for (let i = 0; i < 8; i++) {
            y += 125;
            const knight1 = new Knight({
                battle: this,
                group: this.groups[0],
                pos: {
                    x: 100,
                    y: y
                },
                health: {
                    maximum: 20 + (Math.random() * 20)
                }
            });
            const knight2 = new Knight({
                battle: this,
                group: this.groups[0],
                pos: {
                    x: this.scale.width - 100,
                    y: y
                },
                health: {
                    maximum: 20 + (Math.random() * 20)
                },
                flipX: true
            });
            //knight1.target = knight2;
            //knight2.target = knight1;
            this.characters.push(knight1);
            this.characters.push(knight2);
        }
        // #region collision
        // world bounds
        const world = new Phaser.Geom.Rectangle(0, 0, this.scale.width, this.scale.height);
        // making characters collide with other characters
        let characters = this.physics.add.group(this.characters, {
            customBoundsRectangle: world,
            collideWorldBounds: true
        });
        this.physics.add.collider(characters, characters);
        // #endregion
        // #region TOOLBAR EVENTS
        // weird async issues going on here... have to trigger pause after it's completely created (outside of create function) so need to wait for the create event
        //this.events.on(Phaser.Scenes.Events.CREATE, () => {});
        //this.events.on('pause', function () { console.log('Scene A paused'); });
        //this.events.on('resume', function () { console.log('Scene A resumed'); });
        $("#btnPause").on("click", () => {
            console.log("pausing...");
            //game.scene.pause(this);
            this.paused = true;
            for (let c of this.characters) {
                c.body.velocity.x = 0;
                c.body.velocity.y = 0;
            }
            this.anims.pauseAll();
        }).trigger("click");
        $("#btnPlay").on("click", () => {
            console.log("playing...");
            //game.scene.resume(this);
            this.paused = false;
            this.anims.resumeAll();
        });
        $("#btnReset").on("click", () => {
            console.error("TODO");
        });
        // #endregion
        // faster physics = more accurate collisions
        this.physics.world.setFPS(120);
    }
    update(_, delta) {
        if (!this.paused) {
            for (let i = this.characters.length - 1; i > -1; i--) {
                let c = this.characters[i];
                // if character was destroyed, remove from list
                if (!c.scene || !c.body) {
                    this.characters.splice(i, 1);
                }
                else {
                    c.update(delta);
                }
            }
        }
    }
}
function createAnimations(scene) {
    // #region knight
    scene.anims.create({
        key: "knight_idle",
        frames: scene.anims.generateFrameNames('knight', { prefix: "idle", end: 3 }),
        frameRate: 4,
        repeat: -1
    });
    scene.anims.create({
        key: "knight_run",
        frames: scene.anims.generateFrameNames('knight', { prefix: "run", start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
    });
    scene.anims.create({
        key: "knight_attack",
        frames: scene.anims.generateFrameNames('knight', { prefix: "attack", end: 2 }),
        frameRate: 16
        //repeat: -1
    });
    scene.anims.create({
        key: "knight_death",
        frames: scene.anims.generateFrameNames('knight', { prefix: "death", end: 0 }),
        frameRate: 4
        //repeat: -1
    });
    // #endregion
}
//# sourceMappingURL=battle.js.map