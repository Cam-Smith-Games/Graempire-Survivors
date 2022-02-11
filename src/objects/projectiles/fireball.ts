
// TODO: extend Projectile class, which extends Weapon class

import { Enemy } from "../character/enemy";
import { Character } from "../character/character.js";
import { IMainScene } from "../../scenes/main.js";
import { INullablePoint } from "../../struct/point";
import { IPower } from "../../struct/power";

export interface ProjectileParams {
    main: IMainScene;

    scale?: INullablePoint;
    health?: IPower;

    flipX?: boolean;
    speed?: number;

    texture: string;



    caster: Character;
    target: Character;

}


export class Fireball extends Phaser.Physics.Arcade.Sprite {

    caster:Character;
    target:Character;

    constructor(p:ProjectileParams) {
        super(p.main, p.caster.x || 0, p.caster.y || 0, p.texture);
        p.main.add.existing(this);
        p.main.physics.add.existing(this);

        this.caster = p.caster;
        this.target = p.target;
        
        let angle = Phaser.Math.Angle.Between(this.x, this.y, p.target.x, p.target.y) * 180 / Math.PI;           
        this.setAngle(angle);
        this.setScale(p.scale.x || 1, p.scale.y || 1);

        p.main.colliders.projectiles.add(this);

        p.main.physics.moveToObject(this, p.target, p.speed || 600);



    }

    collide(enemy:Enemy) {
        if (enemy) {
            enemy.health.current = 0;
        }
        this.destroy();
    }
}