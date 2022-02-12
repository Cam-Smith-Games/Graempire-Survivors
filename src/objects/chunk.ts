export class Chunk {
    
    scene:Phaser.Scene;
    x:number;
    y:number;

    sprites:Phaser.GameObjects.Group;
    isLoaded: boolean;

    constructor(scene:Phaser.Scene, x:number, y:number) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.sprites = this.scene.add.group();
        this.isLoaded = false;
    }


    unload() {
        if (this.isLoaded) {
            console.log("%cUNLOADING CHUNK [" + this.x + ", " + this.y + "]", "color:red");
            this.sprites.clear(true, true);
            this.isLoaded = false;
        }

        return this;
    }

    load() {
        if (!this.isLoaded) {
            console.log("%cLOADING CHUNK [" + this.x + ", " + this.y + "]", "color:green");
            this.isLoaded = true;
        }

        return this;
    }
}