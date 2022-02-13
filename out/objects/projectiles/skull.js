// TODO: extend Projectile class, which extends Weapon class
import { Projectile } from "./projecitle.js";
const definition = {
    texture: "skull",
    scale: { x: 2.5, y: 2.5 },
    damage: 10,
    destroyOnCollide: false
};
export class SkullProjectile extends Projectile {
    constructor(p) {
        super(definition, p);
    }
}
//# sourceMappingURL=skull.js.map