// TODO: extend Projectile class, which extends Weapon class
import { Projectile } from "./projecitle.js";
const definition = {
    texture: "fireball",
    damage: 10,
    scale: { x: 4, y: 4 },
};
export class Fireball extends Projectile {
    constructor(p) {
        super(definition, p);
    }
}
//# sourceMappingURL=fireball%20copy.js.map