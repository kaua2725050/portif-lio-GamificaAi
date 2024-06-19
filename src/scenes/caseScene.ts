import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class caseScene extends Scene {
    private objetoInteracao: any

    private elementoTexto?: HTMLElement
    private actoraldeoes

    private listaimagens

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //criar elemento com a descricao do case
        this.elementoTexto = document.createElement("div") as HTMLElement
        this.elementoTexto.classList.add("texto-case")

         //adicionar o elemento ao container game
         let containerGame = document.querySelector(".container-game")
         containerGame?.appendChild(this.elementoTexto)

         //ao pressionar esc voltar para a exposicao
         this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Esc) {
                engine.goToScene("exposicao")
            }
         })

         //criar ator para receber as imagens
         this.actoraldeoes = new Actor({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight - 50)
         })

         //carregar imagens dos aldeoes
         let imagealdeao = Resources.Aldeao.toSprite()
         let imagealdeao2 = Resources.aldeao2.toSprite()
         let imagevillager3 = Resources.villager3.toSprite()

         this listaimagens = [imagealdeao, imagealdeao2, imagevillager3]
    }

    onActivate(context: SceneActivationContext<unknown>): void {
        //faz a caixa de texto aparecer ao entrar na cena
        this.elementoTexto!.style.opacity = "1"

        //pegar dados da cena passada
        this.objetoInteracao = context.data

        // se for a mesa a
        if (this.objetoInteracao.nomeDaMesa == "mesa_stand_a") {
            this.elementoTexto!.innerHTML = `<h2>alakazam</h2>
            <p>abracadabra e hypno</p>`

            //inserir o sprite no actor da mesa a
            this.actoraldeoes?.graphics.add(this.listaimagens![0])

            //mudar zoom
            this.actoraldeoes!.graphics.current!.scale = vec(0.2, 0.2)
        }
    
        // se for a mesa b
        if (this.objetoInteracao.nomeDaMesa == "mesa_stand_b") {
            this.elementoTexto!.innerHTML = `<h2>hamburgue</h2>
            <p>HAMBURGUER!!</p>`

            this.actoraldeoes?.graphics.add(this.listaimagens![1])

            //mudar zoom
            this.actoraldeoes!.graphics.current!.scale = vec(0.2, 0.2)
        }
    
        // se for a mesa c
        if (this.objetoInteracao.nomeDaMesa == "mesa_stand_c") {
            this.elementoTexto!.innerHTML = `<h2>lucas</h2>
            <p>hfihjvhdtryihhftyhibjvfy7tihhdtrtyihkbjvhcftyihkbjh...</p>`

            this.actoraldeoes?.graphics.add(this.listaimagens![2])

            //mudar zoom
            this.actoraldeoes!.graphics.current!.scale = vec(0.2, 0.2)
        }
    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        //faz a caixa de texto sumirr ao sir da cena
        this.elementoTexto!.style.opacity = "0"

        //adiciona o ator da mesa a
        this.add(this.actoraldeoes!)
    }
}