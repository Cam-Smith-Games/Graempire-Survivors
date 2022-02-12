import { IMainScene } from "../scenes/main.js";
import { AbstractCharacterParams, CharacterParams } from "./character/character.js";
import { Enemy } from "./character/enemy.js";

export interface SpawnerArgs {
    /** number of seconds between spawns */
    rate?: number;
    /** number of enemies to spawn */
    count?: number;
    /** params to use for spawning enemies
     * @todo just store an ID here and map to a dictionary of enemy params?
     */
    params:CharacterParams;

    main:IMainScene;
}


export class Spawner {
    rate: number;
    count: number;
    timer: number;

    main:IMainScene;
    params:AbstractCharacterParams;

    constructor(args:SpawnerArgs) {
        this.rate = args.rate || 3000;
        this.count = args.count || 6;
        this.timer = this.rate;

        this.main = args.main;

        this.params = <AbstractCharacterParams>args.params;
        this.params.main = this.main;
    }


    update(delta:number) {
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
        }

        for (let i  = 0; i < this.count; i++) {
            
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