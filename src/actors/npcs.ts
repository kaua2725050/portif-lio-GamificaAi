import { Actor, Animation, CollisionType, Engine, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";

export class Npc extends Actor {
    constructor(posicao: Vector, nome: string) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name: nome,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(_engine: Engine<any>): void {
        //carregar os sprites
        const spriteNpcA = SpriteSheet.fromImageSource({
            image: Resources.playerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 56,
                rows: 20
            }
        })

        const spriteNpcB = SpriteSheet.fromImageSource({
            image: Resources.NpcBSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 56,
                rows: 20
            }
        })

        const spriteNpcC = SpriteSheet.fromImageSource({
            image: Resources.NpcCSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 32,
                columns: 56,
                rows: 20
            }
        })

        //definir sprite de acordo com o npc
        let spriteDefinido

        if (this.name == "npc_a") {
            spriteDefinido = spriteNpcA
        } else if (this.name == "npc_b") {
            spriteDefinido = spriteNpcB
        } else if (this.name == "npc_c") {
            spriteDefinido = spriteNpcC
        }

        //criar animacao
        if (spriteDefinido) {
            const downIdle = new Animation({
                frames: [
                    { graphic: spriteDefinido.getSprite (18, 1)},
                    { graphic: spriteDefinido.getSprite (18, 1)},
                    { graphic: spriteDefinido.getSprite (18, 1)},
                    { graphic: spriteDefinido.getSprite (18, 1)},
                    { graphic: spriteDefinido.getSprite (18, 1)},
                ]
            })
        }
    } 

}