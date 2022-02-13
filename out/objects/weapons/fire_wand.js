import { Fireball } from "../projectiles/bullets/fireball.js";
import { Weapon } from "./weapon.js";
const definition = {
    name: "Fire Wand",
    stats: {
        count: 24,
        speed: 1200,
        rate: 100,
        area: 1
    }
};
export class FireWand extends Weapon {
    constructor(args) {
        super(definition, args);
    }
    onLevelUp() {
    }
    fire() {
        let target = this.player.getNearestEnemy();
        if (target) {
            let count = this.stats.count.value;
            let offset_amount = Math.PI / 12;
            let offset_angle = count > 1 ? -Math.floor(count / 2) * offset_amount : 0;
            for (let i = 0; i < this.stats.count.value; i++) {
                // TODO: fan out based on projectile count 
                new Fireball({
                    caster: this.player,
                    target: target,
                    speed: this.stats.speed.value,
                    angleOffset: offset_angle
                });
                offset_angle += offset_amount;
            }
        }
    }
}
//# sourceMappingURL=fire_wand.js.map