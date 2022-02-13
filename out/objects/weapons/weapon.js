import { Lazy } from "../../struct/lazy.js";
export class Weapon {
    constructor(def, inst) {
        this.player = inst.player;
        this.base_stats = def.stats || {
            count: 1,
            speed: 1,
            rate: 1,
            area: 1
        };
        this.stats = {
            count: new Lazy(() => this.base_stats.count),
            speed: new Lazy(() => this.base_stats.speed),
            rate: new Lazy(() => this.base_stats.rate),
            area: new Lazy(() => this.base_stats.area)
        };
        this.timer = 0;
        this.maxLevel = def.maxLevel || 8;
        this.level = inst.level || 1;
        // NOTE: can't call setLevel from here... need to wait for the subclass constructor to finish
        //this.setLevel(inst.level);
    }
    update(delta) {
        this.timer += delta;
        if (this.timer > this.stats.rate.value) {
            this.timer = 0;
            this.fire();
        }
    }
    setLevel(level) {
        this.level = level;
        this.onLevelUp();
    }
}
//# sourceMappingURL=weapon.js.map