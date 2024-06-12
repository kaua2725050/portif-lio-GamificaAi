import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
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

        //adicionar colisao com cada objeto
        //pegar a camada de objetos colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("objetos colisores")[0]

        //percorrer objetos com foreach e para cada objeto revnderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            //configurar o actor
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetX + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed,
            })
        //adicionar colisor
        this.add(objetoAtual)

        })
    }
    
}