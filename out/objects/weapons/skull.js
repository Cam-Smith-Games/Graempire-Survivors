import { SkullProjectile } from "../projectiles/skull.js";
import { Weapon } from "./weapon.js";
const definition = {
    name: "Skull",
    stats: {
        count: 1,
        speed: Math.PI / 800,
        rate: 500,
        area: 1
    }
};
export class Skull extends Weapon {
    constructor(args) {
        super(definition, args);
        this.angle = 0;
        this.radius = 150;
        this.sprites = [];
        this.reset_sprites();
    }
    update(delta) {
        super.update(delta);
        this.angle += delta * this.stats.speed.value;
        let angle = this.angle;
        let angle_diff = Math.PI * 2 / this.sprites.length;
        for (let i = 0; i < this.sprites.length; i++) {
            let x = this.player.x + Math.cos(angle) * this.radius;
            let y = this.player.y + Math.sin(angle) * this.radius;
            this.sprites[i].setPosition(x, y);
            //this.player.main.physics.moveTo(this.sprites[i], x, y, speed);
            angle += angle_diff;
        }
    }
    reset_sprites() {
        if (this.sprites) {
            for (let sprite of this.sprites) {
                console.log("DESTROYING SKULL...");
                sprite.destroy();
            }
        }
        this.sprites = [];
        let angle = 0;
        let count = this.stats.count.value;
        let angle_diff = Math.PI * 2 / count;
        let pos = [];
        for (let i = 0; i < count; i++) {
            let x = this.player.x + Math.cos(angle) * this.radius;
            let y = this.player.y + Math.sin(angle) * this.radius;
            pos.push({
                x: x,
                y: y
            });
            const skull = new SkullProjectile({
                caster: this.player,
                target: null,
                pos: {
                    x: x,
                    y: y
                }
            });
            //skull.setPosition(x, y);
            this.sprites.push(skull);
            angle += angle_diff;
        }
    }
    onLevelUp() {
        this.reset_sprites();
    }
    fire() {
    }
}
//# sourceMappingURL=skull.js.map