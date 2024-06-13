import { Actor, Animation, CollisionType, Color, Engine, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    //propriedade do player
    private velocidade: number = 150


    //configuracao do player
    constructor (posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name:"Tadinho",
            color:Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
    //configurar sprite do player
    const PlayerSpriteSheet = SpriteSheet.fromImageSource({
        image: Resources.PlayerSpriteSheet,
        grid: {
            spriteWidth: 32,
            spriteHeight: 64,
            columns: 56,
            rows: 20
        },
        spacing: {
            originOffset: {
                y: 8
            }
        }
    })

    //criar as animacoes
    const duracaoFramesAnimacao = 70
    //animacao idle
    const leftIdle = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(12, 1)},
            { graphic: PlayerSpriteSheet.getSprite(13, 1)},
            { graphic: PlayerSpriteSheet.getSprite(14, 1)},
            { graphic: PlayerSpriteSheet.getSprite(15, 1)},
            { graphic: PlayerSpriteSheet.getSprite(16, 1)},
            { graphic: PlayerSpriteSheet.getSprite(17, 1)}
        ],
        frameDuration: 70
    })
    this.graphics.add("left-idle", leftIdle)

    this.graphics.use("left-idle")


        //configurar player para minitorar eventos no teclado
        engine.input.keyboard.on("hold", (event) => {
            //detectar qual a tecla pressionada
            switch (event.key) {
                case Keys.Left:
                case  Keys.A:
                    //mover para a esquerda
                    this.vel.x = -this.velocidade
                    break;

                    case Keys.Right:
                    case Keys.D:
                        //mover para a direita
                        this.vel.x = this.velocidade
                        break;

                        case Keys.Up:
                        case Keys.W:
                            //mover para cima
                            this.vel.y = -this.velocidade
                            break;
                            case Keys.Down:
                            case Keys.S:
                                //mover para baixo
                                this.vel.y = this.velocidade
                                break;

                default:
                    //zera a valocidade do player, para a movimentacao
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        //configurar para monitorar o evento release -> soltar a tecla
        engine.input.keyboard.on("release", (event) => {
            //fazer o player parar ao soltar as teclas
            //parar movimentacao lateral ao soltar uma tcla de movimentacao lateral

            if (
                event.key == Keys.A || 
                event.key == Keys.Left ||
                event.key == Keys.D ||
                event.key == Keys.Right
            ) {
                //zerar velocidade hirizontal
                this.vel.x = 0
            }

            //parar movimentacao vertical ao soltar as teclas de movimento vertical
            if (
                event.key == Keys.W ||
                event.key == Keys.Up ||
                event.key == Keys.S ||
                event.key == Keys.Down
            ) {
                this.vel.y = 0
            }
        })
    }    
}