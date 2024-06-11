import { Engine, FadeInOut } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScene";
import { gamificationScene } from "./scenes/gamificationScene";
import { expoScene } from "./scenes/expoScene";

const game = new Engine({
  width: 1200,
  height: 800,
  //otimizacao para pixelart
  canvasElementId: "jogo",
  pixelArt: true
})
game.addScene("bemVindo", new welcomeScene())
game.addScene("historia", new historyScene())
game.addScene("gamificado", new gamificationScene())
game.addScene("exposicao", expoScene)

game.start(loader).then(() => {
  game.goToScene("historia", {
    //adiciona transicao lenta ao trocar de cena
    sourceOut: new FadeInOut({duration: 1000})
  })
})