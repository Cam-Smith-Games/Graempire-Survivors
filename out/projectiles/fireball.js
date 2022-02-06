// TODO: extend Projectile class, which extends Weapon class
export class Fireball extends Phaser.Physics.Arcade.Sprite {
    constructor(p) {
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
    collide(enemy) {
        if (enemy) {
            enemy.health.current = 0;
        }
        this.destroy();
    }
}
//# sourceMappingURL=fireball.js.map