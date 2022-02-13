import { Vector } from "../../struct/vector.js";
import { Enemy } from "./enemy.js";
import { AbstractCharacterParams, Character, CharacterStates } from "./character.js";
import { Weapon } from "../weapons/weapon.js";
import { FireWand } from "../weapons/fire_wand.js";
import { Skull } from "../weapons/skull.js";

export class Player extends Character {


    weapons:Weapon[];

    constructor(p:AbstractCharacterParams) {
        super(p);

        this.weapons = [
            new FireWand({
                player: this
            }),
            new Skull({
                player: this
            })
        ];

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
            //this.update_fire(delta);

            for (let weapon of this.weapons) {
                weapon.update(delta);
            }
        }

    }

    /*private update_fire(delta:number) {
        this.fireTimer += delta;
        if (this.fireTimer >= this.fireRate) {
            this.fireTimer = 0;

            let enemies = <Enemy[]>this.main.colliders.enemies.children.entries.filter(a => a instanceof Enemy);
            let nearest = enemies.sort((a,b) => a.dist(this) - b.dist(this))[0];
            if (nearest) {
 
                new Fireball({
                    caster: this,
                    target: nearest,
                    scale: { x: 4, y: 4 },
                    speed: 600,
                    texture: "fireball"
                })
            }
        }
    }*/

    private update_input() {

        // #region setting velocity from input
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
        // #endregion

    
    }




    getNearestEnemy() {      
        let enemies = <Enemy[]>this.main.colliders.enemies.children.entries.filter(a => a instanceof Enemy);
        return enemies.sort((a,b) => a.dist(this) - b.dist(this))[0];
    }
}