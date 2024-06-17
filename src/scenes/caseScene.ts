import { Actor, Color, Engine, FadeInOut, Scene, SceneActivationContext, Transition, vec } from "excalibur";
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

        let actoraldeao = new Actor ({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })

        let imagemAldeao = Resources.Aldeao.toSprite()
        imagemAldeao.scale = vec(0.7, 0.7)

        actoraldeao.graphics.add(imagemAldeao)

        this.add(actoraldeao)

    }

    onActivate(context: SceneActivationContext<unknown>): void {
        //pegar dados da cena passada
        this.objetoInteracao = context.data

        console.log(this.objetoInteracao);

        // se for a mesa a
        if (this.objetoInteracao.nomeDoAtor == "mesa_stand_a") {
            this.textoDaCena = "Essa e a descricao do case A iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
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