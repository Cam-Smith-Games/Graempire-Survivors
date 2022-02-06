import { Power } from "../struct/power.js";
export var CharacterStates;
(function (CharacterStates) {
    CharacterStates[CharacterStates["IDLE"] = 0] = "IDLE";
    CharacterStates[CharacterStates["RUNNING"] = 1] = "RUNNING";
    CharacterStates[CharacterStates["ATTACKING"] = 2] = "ATTACKING";
    CharacterStates[CharacterStates["DYING"] = 3] = "DYING";
})(CharacterStates || (CharacterStates = {}));
export class Character extends Phaser.Physics.Arcade.Sprite {
    // TODO: team attribute? for acquiring target
    constructor(p) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        super(p.main, ((_a = p.pos) === null || _a === void 0 ? void 0 : _a.x) || 0, ((_b = p.pos) === null || _b === void 0 ? void 0 : _b.y) || 0, p.texture);
        this.main = p.main;
        p.main.add.existing(this);
        p.main.physics.add.existing(this);
        this.setSize(((_c = p.size) === null || _c === void 0 ? void 0 : _c.x) || 32, ((_d = p.size) === null || _d === void 0 ? void 0 : _d.y) || 32);
        this.setScale(((_e = p.scale) === null || _e === void 0 ? void 0 : _e.x) || 1, ((_f = p.scale) === null || _f === void 0 ? void 0 : _f.y) || 1);
        this.health = new Power((_g = p === null || p === void 0 ? void 0 : p.health) === null || _g === void 0 ? void 0 : _g.current, (_h = p === null || p === void 0 ? void 0 : p.health) === null || _h === void 0 ? void 0 : _h.maximum);
        this.damage = 5;
        this.speed = (_j = p.speed) !== null && _j !== void 0 ? _j : 200;
        this.flipX = (_k = p.flipX) !== null && _k !== void 0 ? _k : false;
        let body = this.body;
        //body.setImmovable(true);
        body.setBounce(0, 0);
    }
    // shortcut for long ass BetweenPoints function name
    dist(c) {
        return Phaser.Math.Distance.BetweenPoints(this, c);
    }
    update(_) {
        var _a;
        if (this.state != CharacterStates.DYING) {
            // dead -> die
            if (this.health.current <= 0) {
                this.setState(CharacterStates.DYING);
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.destroy();
                });
            }
            // alive -> walk to player 
            else if ((_a = this.main) === null || _a === void 0 ? void 0 : _a.player) {
                this.scene.physics.moveToObject(this, this.main.player, this.speed);
            }
        }
    }
}
// ---------------------------------------------------- //
//# sourceMappingURL=character.js.map