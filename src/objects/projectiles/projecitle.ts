import { INullablePoint } from "../../struct/point.js";
import { Character } from "../character/character.js";
import { Enemy } from "../character/enemy";


export interface ProjectileDefinition {
    texture: string;
    damage: number;
    scale?: INullablePoint;
    destroyOnCollide?: boolean;
}

export interface ProjectileParams {

    flipX?: boolean;
    speed?: number;

    caster: Character;
    target: Character;

    /** optional offset to apply to angle (in radians) */
    angleOffset?: number;

    pos?: INullablePoint
}


export class Projectile extends Phaser.Physics.Arcade.Sprite {
    
    damage:number;
    destroyOnCollide:boolean;

    constructor(d:ProjectileDefinition, p:ProjectileParams) {
        const main = p.caster.main;
        let pos = {
            x: p.pos?.x || p.caster.x || 0,
            y: p.pos?.y || p.caster.y || 0
        };

        super(main, pos.x, pos.y, d.texture);
        main.add.existing(this);
        main.physics.add.existing(this);
        if (d.scale) {
            this.setScale(d.scale.x || 1, d.scale.y || 1);
        }

        this.damage = d.damage;
        this.destroyOnCollide = d.destroyOnCollide ?? true;

        console.log("adding projectile");
        main.colliders.projectiles.add(this);
    }


    collide(enemy:Enemy) {
        console.log("COLLIDE");

        if (enemy) {
            enemy.health.current = 0 ;//-= this.damage;
        }
        
        if (this.destroyOnCollide) {
            this.destroy();
        }
    }
}