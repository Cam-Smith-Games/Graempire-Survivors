import { IMainScene } from "../scenes/main.js";
import { INullablePoint } from "../struct/point.js";
import { IPower, Power } from "../struct/power.js";

export interface CharacterParams {
    main: IMainScene;

    pos?: INullablePoint;
    scale?: INullablePoint;
    health?: IPower;

    flipX?: boolean;
    speed?: number;
}

/** these properties get set by the Character class implementation, but not exposed outside */
export interface AbstractCharacterParams extends CharacterParams {
    size?: INullablePoint;
    texture: string;
}

export enum CharacterStates {
    IDLE = 0,
    RUNNING = 1,
    ATTACKING = 2,
    DYING = 3
}

/** exposing a few properties of Character via an interface to avoid circular reference import issues */
export interface ICharacter extends Phaser.Physics.Arcade.Sprite {
    health: Power;
    dist: (c:ICharacter) => number;
}

export abstract class Character extends Phaser.Physics.Arcade.Sprite implements ICharacter {

    main: IMainScene;

    health: Power;
    target: Character;

    /** todo: stats, damage modifieds, etc. this will be a get variable that calculates all that stuff */
    damage:number;
    range:number;
    speed: number;


    // TODO: team attribute? for acquiring target

    constructor(p:AbstractCharacterParams) {
        super(p.main, p.pos?.x || 0, p.pos?.y || 0, p.texture);
        this.main = p.main;

        p.main.add.existing(this);
        p.main.physics.add.existing(this);

        this.setSize(p.size?.x || 32, p.size?.y || 32)
        this.setScale(p.scale?.x || 1, p.scale?.y || 1);

        this.health = new Power(p?.health?.current, p?.health?.maximum);
        this.damage = 5;

        this.speed = p.speed ?? 200;

        this.flipX = p.flipX ?? false;

        let body = <Phaser.Physics.Arcade.Body>this.body;
        //body.setImmovable(true);
        body.setBounce(0, 0);
        
    }



    // shortcut for long ass BetweenPoints function name
    dist(c:Character) {
        return Phaser.Math.Distance.BetweenPoints(this, c);
    }
    

    update(_:number) {

        if (this.state != CharacterStates.DYING) {
            // dead -> die
            if (this.health.current <= 0) {
                this.setState(CharacterStates.DYING);
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.destroy();
                });
            }
            // alive -> walk to player 
            else if (this.main?.player) {
                this.scene.physics.moveToObject(this, this.main.player, this.speed);    
            }
        }
    }



}





// ---------------------------------------------------- //




