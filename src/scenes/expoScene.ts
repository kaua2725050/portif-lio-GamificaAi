import { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration:1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        let tiledMap = Resources.Mapa

        //definir offset para renderizacao do mapa
        let offsetX = 138
        let offsetY = 100

        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),
        })

        //definir zoom da camera para aumentar um pouco a vizualizacao da cena
        this.camera.zoom = 1.4

        //definicao e configuracao do player
        let Tadinho = new Player()

        //z index define a camada do player
        Tadinho.z = 1

        //adicionar player na cena
        this.add(Tadinho)
        
    }
    
}