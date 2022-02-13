import { Enemy } from "./character/enemy.js";
export class Spawner {
    constructor(args) {
        this.rate = args.rate || 10000;
        this.count = args.count || 6;
        this.timer = this.rate;
        this.main = args.main;
        this.params = args.params;
        this.params.main = this.main;
    }
    update(delta) {
        this.timer += delta;
        if (this.timer > this.rate) {
            this.timer = 0;
            this.spawn();
        }
    }
    spawn() {
        // TODO: adjust padding? this determines how far away enemies can spawn from outside of screen. 
        //          eventually, when the world is infinitely generated, we'll want them spawning slightly outside of view
        //          and walking in
        const padding = 100;
        const offset = {
            x: this.main.player.x - this.main.scale.width / 2,
            y: this.main.player.y - this.main.scale.height / 2
        };
        for (let i = 0; i < this.count; i++) {
            let x = offset.x + (Math.random() * this.main.scale.width - padding) + padding;
            let y = offset.y + (Math.random() * this.main.scale.height - padding) + padding;
            // is this going to cause problems? does this need to be copied to a new object?
            this.params.pos = {
                x: x,
                y: y
            };
            new Enemy(this.params);
        }
    }
}
//# sourceMappingURL=spawner.js.map