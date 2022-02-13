import { Projectile } from "../projecitle.js";
export class Bullet extends Projectile {
    constructor(d, p) {
        super(d, p);
        let radians = Phaser.Math.Angle.Between(this.x, this.y, p.target.x, p.target.y) + (p.angleOffset || 0);
        this.setAngle(radians * 180 / Math.PI);
        //this.setScale(d.scale.x || 1, d.scale.y || 1);
        //main.physics.moveToObject(this, p.target, p.speed || 600);
        let dist = Phaser.Math.Distance.Between(this.x, this.y, p.target.x, p.target.y);
        let x = this.x + Math.cos(radians) * dist;
        let y = this.y + Math.sin(radians) * dist;
        p.caster.main.physics.moveTo(this, x, y, p.speed || 600);
    }
}
//# sourceMappingURL=bullet.js.map