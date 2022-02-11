import { IMainScene } from "../../scenes/main.js";
import { INullablePoint } from "../../struct/point.js";
import { IPower, Power } from "../../struct/power.js";

export interface CharacterParams {
    pos?: INullablePoint;
    scale?: INullablePoint;
    health?: IPower;

    flipX?: boolean;
    speed?: number;

    size?: INullablePoint;
    texture: string;

    /** some characters might not need animation */
    animate?: boolean;
}

/** these properties get set by the Character class implementation, but not exposed outside */
export interface AbstractCharacterParams extends CharacterParams {
    main: IMainScene;  
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
    speed:number;

    animate:boolean;

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

        this.animate = p.animate ?? true; 

        let body = <Phaser.Physics.Arcade.Body>this.body;
        //body.setImmovable(true);
        body.setBounce(0, 0);
        
    }



    // shortcut for long ass BetweenPoints function name
    dist(c:Character) {
        return Phaser.Math.Distance.BetweenPoints(this, c);
    }
    

    update(_:number) {

        if (this.health.current > 0) {
            if (this.animate) {
                this.update_animation();
            }
        }
        // dead and not in dying state yet -> start dying
        else if (this.state != CharacterStates.DYING) {
            this.setState(CharacterStates.DYING);
            this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.destroy();
            });         
        }
        
    }


    update_animation() {

        // playing appropriate animation based on velocity...
        const velocity = this.body.velocity;
    
        if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
            if (velocity.x > 0) {
                return this.play(this.texture.key + "_right", true);
            }
            if (velocity.x < 0) {
                return this.play(this.texture.key + "_left", true);
            }
        }
        else {
            if (velocity.y > 0) {
                return this.play(this.texture.key + "_down", true);
            }
            if (velocity.y < 0) {
                return this.play(this.texture.key + "_up", true);
            }
        }

        return this.stop();
    
    }



}





// ---------------------------------------------------- //




