import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any

    private textoDaCena: string = ""

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //primeiroaldeao
        let actoraldeao = new Actor ({

            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })

        let imagemAldeao = Resources.Aldeao.toSprite()
        imagemAldeao.scale = vec(0.7, 0.7)

        actoraldeao.graphics.add(imagemAldeao)


        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                //vai para a cena historia
                engine.goToScene("exposicao")
            }
        })

        if (this.objetoInteracao == "mesa_stand_a") {
            this.add(actoraldeao)
        }


        //segundo aldeao
        let actoraldeao2 = new Actor ({

            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })

        let imagemAldeao2 = Resources.aldeao2.toSprite()
        imagemAldeao2.scale = vec(0.7, 0.7)

        actoraldeao2.graphics.add(imagemAldeao2)

        if (this.objetoInteracao == "mesa_stand_b") {
            this.add(actoraldeao2)
        }


        //terceiro aldeao
        let actorvillager3 = new Actor ({

            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })

        let imagemvillager3 = Resources.villager3.toSprite()
        imagemvillager3.scale = vec(0.7, 0.7)

        actorvillager3.graphics.add(imagemvillager3)

        

        if (this.objetoInteracao == "mesa_stand_b") {
            this.add(actorvillager3)
        }

    }

    onActivate(context: SceneActivationContext<unknown>): void {
        //pegar dados da cena passada
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);

        // se for a mesa a
        if (this.objetoInteracao.nomeDoAtor == "mesa_stand_a") {
            this.textoDaCena = "Essa e a descricao do case A"
        }
    
        // se for a mesa b
        if (this.objetoInteracao.nomeDoAtor == "mesa_stand_b") {
            this.textoDaCena = "Essa e a descricao do case B"
        }
    
        // se for a mesa c
        if (this.objetoInteracao.nomeDoAtor == "mesa_stand_c") {
           this.textoDaCena = "Essa e a descricao do case C"
        }
    }
}