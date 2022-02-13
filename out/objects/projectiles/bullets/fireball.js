// TODO: extend Projectile class, which extends Weapon class
import { Bullet } from "./bullet.js";
const definition = {
    texture: "fireball",
    damage: 10,
    scale: { x: 4, y: 4 },
};
export class Fireball extends Bullet {
    constructor(p) {
        super(definition, p);
    }
}
//# sourceMappingURL=fireball.js.map