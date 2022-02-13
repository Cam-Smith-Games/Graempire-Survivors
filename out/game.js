import { MainScene } from "./scenes/main.js";
const game = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: "#050",
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: "arcade",
        arcade: {
            //debug: true, 
            gravity: {
                y: 0
            }
        }
    },
    scene: MainScene
});
console.log("GAME: ", game);
//# sourceMappingURL=game.js.map