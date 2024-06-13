import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npcs";

export class expoScene extends Scene {
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration:1000
        })
    }

    onInitialize(engine: Engine<any>): void {
    //ativar o modo debug
    engine.toggleDebug()

        let tiledMap = Resources.Mapa

        //definir offset para renderizacao do mapa
        let offsetX = 138
        let offsetY = 100

        tiledMap.addToScene(this, {
            pos: vec(offsetX, offsetY),
        })

        //definir zoom da camera para aumentar um pouco a vizualizacao da cena
        this.camera.zoom = 1.4

        //carregar spawn point do player
        let spawnPoint = tiledMap.getObjectsByName("spawnPoint")[0]
        
        //definicao e configuracao do player
        let Tadinho = new Player(vec(spawnPoint.x + offsetX, spawnPoint.y + offsetY))

        //z index define a camada do player
        Tadinho.z = 1

        //adicionar player na cena
        this.add(Tadinho)

        //pegar spawn point com cada objeto
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        //configurar npcs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetX, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "NpcA"
        )

        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetX, npcSpawnPointB.y + offsetY),
            Color.Chartreuse,
            "NpcB"
        )

        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetX, npcSpawnPointC.y + offsetY),
            Color.Yellow,
            "NpcC"
        )

        //adicionar os npcs
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        //focar a camera no player
        this.camera.strategy.lockToActor(Tadinho)
        this.camera.zoom = 2

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