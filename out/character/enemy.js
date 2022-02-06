import { Character, CharacterStates } from "./_character.js";
export class Enemy extends Character {
    constructor(p) {
        super(p);
        p.main.colliders.enemies.add(this);
    }
    update(delta) {
        var _a;
        super.update(delta);
        if (this.state == CharacterStates.DYING) {
            // todo: death anim
            this.destroy();
        }
        else if ((_a = this.main) === null || _a === void 0 ? void 0 : _a.player) {
            this.scene.physics.moveToObject(this, this.main.player, this.speed);
        }
    }
}
//# sourceMappingURL=enemy.js.map