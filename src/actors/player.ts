import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, SpriteSheet, Vector} from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor {
    //propriedade do player
    private velocidade: number = 120
    private ultimaDirecao: string = "down"

    private temObjetoProximo: boolean = false
    private ultimoColisor?: Collider


    //configuracao do player
    constructor (posicao: Vector) {
        super({
            pos: posicao,
            width: 35,
            height: 50,
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
                y: 0
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
        frameDuration: duracaoFramesAnimacao
    })
    this.graphics.add("left-idle", leftIdle)

    //this.graphics.use("left-idle")

    //idle direita
    const rightIdle = new Animation ({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(0, 1)},
            { graphic: PlayerSpriteSheet.getSprite(1, 1)},
            { graphic: PlayerSpriteSheet.getSprite(2, 1)},
            { graphic: PlayerSpriteSheet.getSprite(3, 1)},
            { graphic: PlayerSpriteSheet.getSprite(4, 1)},
            { graphic: PlayerSpriteSheet.getSprite(5, 1)},
        ],
        frameDuration: duracaoFramesAnimacao
    })
    this.graphics.add("rigth-idle", rightIdle)

    //up down
    const upIdle = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(6, 1)},
            { graphic: PlayerSpriteSheet.getSprite(7, 1)},
            { graphic: PlayerSpriteSheet.getSprite(8, 1)},
            { graphic: PlayerSpriteSheet.getSprite(9, 1)},
            { graphic: PlayerSpriteSheet.getSprite(10, 1)},
            { graphic: PlayerSpriteSheet.getSprite(11, 1)}
        ],
        frameDuration: duracaoFramesAnimacao
    })
    this.graphics.add("down-idle", upIdle)

    //down idle
    const downIdle = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(18, 1)},
            { graphic: PlayerSpriteSheet.getSprite(19, 1)},
            { graphic: PlayerSpriteSheet.getSprite(20, 1)},
            { graphic: PlayerSpriteSheet.getSprite(21, 1)},
            { graphic: PlayerSpriteSheet.getSprite(22, 1)},
            { graphic: PlayerSpriteSheet.getSprite(23, 1)}
        ],
        frameDuration: duracaoFramesAnimacao
    })
    this.graphics.add("up-idle", upIdle)

    //definir animacao inicial do player
    this.graphics.use(downIdle)


    //animacao de andar
    //andar para a direita
    const rigthWalk = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(12, 2)},
            { graphic: PlayerSpriteSheet.getSprite(13, 2)},
            { graphic: PlayerSpriteSheet.getSprite(14, 2)},
            { graphic: PlayerSpriteSheet.getSprite(15, 2)},
            { graphic: PlayerSpriteSheet.getSprite(16, 2)},
            { graphic: PlayerSpriteSheet.getSprite(17, 2)}
        ],
        frameDuration: duracaoFramesAnimacao

    })
    this.graphics.add("left-walk", rigthWalk)

    //andar para a esquerda
    const leftWalk = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(0, 2)},
            { graphic: PlayerSpriteSheet.getSprite(1, 2)},
            { graphic: PlayerSpriteSheet.getSprite(2, 2)},
            { graphic: PlayerSpriteSheet.getSprite(3, 2)},
            { graphic: PlayerSpriteSheet.getSprite(4, 2)},
            { graphic: PlayerSpriteSheet.getSprite(5, 2)}
        ],
        frameDuration: duracaoFramesAnimacao

    })
    this.graphics.add("rigth-walk", leftWalk)

    //andar para a cima
    const upWalk = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(6, 2)},
            { graphic: PlayerSpriteSheet.getSprite(7, 2)},
            { graphic: PlayerSpriteSheet.getSprite(8, 2)},
            { graphic: PlayerSpriteSheet.getSprite(9, 2)},
            { graphic: PlayerSpriteSheet.getSprite(10, 2)},
            { graphic: PlayerSpriteSheet.getSprite(11, 2)}
        ],
        frameDuration: duracaoFramesAnimacao

    })
    this.graphics.add("up-walk", upWalk)

    //andar para a baixo
    const downWalk = new Animation({
        frames: [
            { graphic: PlayerSpriteSheet.getSprite(18, 2)},
            { graphic: PlayerSpriteSheet.getSprite(19, 2)},
            { graphic: PlayerSpriteSheet.getSprite(20, 2)},
            { graphic: PlayerSpriteSheet.getSprite(21, 2)},
            { graphic: PlayerSpriteSheet.getSprite(22, 2)},
            { graphic: PlayerSpriteSheet.getSprite(23, 2)}
        ],
        frameDuration: duracaoFramesAnimacao

    })
    this.graphics.add("down-walk", downWalk)


        //configurar player para minitorar eventos no teclado
        engine.input.keyboard.on("hold", (event) => {
            //detectar qual a tecla pressionada
            switch (event.key) {
                case Keys.Left:
                case  Keys.A:
                    //mover para a esquerda
                    this.vel.x = -this.velocidade

                    //definir animacao
                    this.graphics.use("left-walk")

                    //guardar ultima direcao
                    this.ultimaDirecao = "left"

                    break;

                    case Keys.Right:
                    case Keys.D:
                        //mover para a direita
                        this.vel.x = this.velocidade

                        this.graphics.use("rigth-walk")

                        this.ultimaDirecao = "rigth"
                        break;

                        case Keys.Up:
                        case Keys.W:
                            //mover para cima
                            this.vel.y = -this.velocidade

                            this.graphics.use("up-walk")

                            this.ultimaDirecao = "up"
                            break;
                            case Keys.Down:
                            case Keys.S:
                                //mover para baixo
                                this.vel.y = this.velocidade

                                this.graphics.use("down-walk")

                                this.ultimaDirecao = "down"
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
            // ao parar o player definir animacao idle da ultima direcao

            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
            }
        })
    } 
    
    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
            //indicar que tem um objeto proximo
            this.temObjetoProximo = true

            //registrar o ultimo objeto colidido
            this.ultimoColisor = other
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        //detectar se o player esta distante do ultimo objeto
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 50) {
            //marcar que objeto nao esta proximo
            this.temObjetoProximo = false
            console.log("Esta longe");
        }
    }
}