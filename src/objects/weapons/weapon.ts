import { Lazy } from "../../struct/lazy.js";
import { Player } from "../character/player.js";


export interface WeaponParams {
    player:Player;
    level?:number;
}

export interface WeaponDefintiion {
    maxLevel?: number;
    stats?: IWeaponStats;
    name: string;
}



export interface IWeaponStats {
    count: number,
    speed: number,
    rate: number,
    area: number
}

export abstract class Weapon {

    player:Player;

    level: number;
    maxLevel: number;

    timer: number;


    base_stats: IWeaponStats;
    /** stats are calculated from base stats, current level, and player upgrades. values are stored in lazy accessor to prevent having to recalcualte on every single access. whenever weapon is leveled or player receives a relevant powerup, the appropriate lazy value gets reset */
    stats: {
        count: Lazy<number>,
        speed: Lazy<number>,
        rate: Lazy<number>,
        area: Lazy<number>
    }

    constructor(def:WeaponDefintiion, inst:WeaponParams) {
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


    update(delta:number) {
        this.timer += delta;
        if (this.timer > this.stats.rate.value) {
            this.timer = 0;
            this.fire();
        }
    }

    setLevel(level:number) {
        this.level = level;
        this.onLevelUp();
    }

    /** method that's called when weapon is levelled up. certain stats might need to be reset so they can be re-calculated based on level */
    protected abstract onLevelUp() : void;


    protected abstract fire() : void;
    
}