import { Actor, CollisionType, Color, Engine, Keys, vec } from "excalibur";

export class Player extends Actor {
    //propriedade do player
    private velocidade: number = 150


    //configuracao do player
    constructor () {
        super({
            pos: vec(600, 520),
            width: 32,
            height: 32,
            name:"Tadinho",
            color:Color.Red,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine: Engine<any>): void {
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