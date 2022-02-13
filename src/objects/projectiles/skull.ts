
// TODO: extend Projectile class, which extends Weapon class

import { Projectile, ProjectileDefinition, ProjectileParams } from "./projecitle.js";

const definition:ProjectileDefinition = {
    texture: "skull",
    scale: { x: 2.5, y: 2.5 },
    damage: 10,
    destroyOnCollide: false
};

export class SkullProjectile extends Projectile {
    constructor(p:ProjectileParams) {
        super(definition, p);
    }
}