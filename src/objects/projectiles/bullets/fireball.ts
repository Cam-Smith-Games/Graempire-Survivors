
// TODO: extend Projectile class, which extends Weapon class

import { ProjectileDefinition, ProjectileParams } from "../projecitle.js";
import { Bullet } from "./bullet.js";

const definition:ProjectileDefinition = {
    texture: "fireball",
    damage: 10,
    scale: { x: 4, y: 4 },
};

export class Fireball extends Bullet {
    constructor(p:ProjectileParams) {
        super(definition, p);
    }
}