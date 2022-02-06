import { Fireball } from "../projectiles/fireball.js";
import { Vector } from "../struct/vector.js";
import { Enemy } from "./enemy.js";
import { AbstractCharacterParams, Character, CharacterStates } from "./character.js";

export class Player extends Character {


    // #region projecitle timer (this will be moved to a "Weapon" class. currently very simple)
    fireRate:number = 500;
    fireTimer:number = 0;
    // #endregion


    constructor(p:AbstractCharacterParams) {
        super(p);
        this.play("vamp_down");
    }



    update(delta:number) {
        super.update(delta);

        if (this.state == CharacterStates.DYING) {
            // todo: death anim -> gameover screen
            this.destroy();
        }
        else {
            this.update_input();
            this.update_fire(delta);
        }

    }

    private update_fire(delta:number) {
        this.fireTimer += delta;
        if (this.fireTimer >= this.fireRate) {
            this.fireTimer = 0;

            let enemies = <Enemy[]>this.main.colliders.enemies.children.entries.filter(a => a instanceof Enemy);
            let nearest = enemies.sort((a,b) => a.dist(this) - b.dist(this))[0];
            if (nearest) {
 
                new Fireball({
                    main: this.main,
                    caster: this,
                    target: nearest,
                    scale: { x: 4, y: 4 },
                    speed: 600,
                    texture: "fireball"
                })
            }
        }
    }

    private update_input() {
        let velocity = new Vector();
        
        if (this.main.cursors.left.isDown) {
            velocity.x = -1;
        }
        else if (this.main.cursors.right.isDown) {
            velocity.x = 1;
        }
        else {
            velocity.x = 0;
        }

        if (this.main.cursors.up.isDown) {
            velocity.y = -1;
        }
        else if (this.main.cursors.down.isDown) {
            velocity.y = 1;
        }
        else {
            velocity.y = 0;
        }

        // normalize to handle diagonal speed issue
        velocity =  velocity.unit().multiply(this.speed);

     
        this.setVelocity(velocity.x, velocity.y);

        // playing appropriate animation...
        if (velocity.x > 0) {
            this.play("vamp_right", true);
        }
        else if (velocity.x < 0) {
            this.play("vamp_left", true);
        }
        else if (velocity.y > 0) {
            this.play("vamp_down", true);
        }
        else if (velocity.y < 0) {
            this.play("vamp_up", true);
        }
        else {
            this.stop();
        }
    }
}