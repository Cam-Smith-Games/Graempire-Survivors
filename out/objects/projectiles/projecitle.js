export class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(d, p) {
        var _a, _b, _c;
        const main = p.caster.main;
        let pos = {
            x: ((_a = p.pos) === null || _a === void 0 ? void 0 : _a.x) || p.caster.x || 0,
            y: ((_b = p.pos) === null || _b === void 0 ? void 0 : _b.y) || p.caster.y || 0
        };
        super(main, pos.x, pos.y, d.texture);
        main.add.existing(this);
        main.physics.add.existing(this);
        if (d.scale) {
            this.setScale(d.scale.x || 1, d.scale.y || 1);
        }
        this.damage = d.damage;
        this.destroyOnCollide = (_c = d.destroyOnCollide) !== null && _c !== void 0 ? _c : true;
        console.log("adding projectile");
        main.colliders.projectiles.add(this);
    }
    collide(enemy) {
        console.log("COLLIDE");
        if (enemy) {
            enemy.health.current = 0; //-= this.damage;
        }
        if (this.destroyOnCollide) {
            this.destroy();
        }
    }
}
//# sourceMappingURL=projecitle.js.map