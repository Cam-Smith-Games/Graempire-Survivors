import { AbstractCharacterParams, Character, CharacterStates } from "./character.js";

export class Enemy extends Character {


    constructor(p:AbstractCharacterParams) {
        super(p);
        p.main.colliders.enemies.add(this);
    }


    update(delta:number) {
       super.update(delta);

        if (this.state == CharacterStates.DYING) {
            // todo: death anim
            this.destroy();
        }
        else if (this.main?.player) {
            this.scene.physics.moveToObject(this, this.main.player, this.speed);
        }
      
    }
}