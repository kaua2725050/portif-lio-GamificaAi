import {Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec} from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene {
    //declaracao do elemento texto
    elementoTexto?: HTMLElement 

    //metodo para esmaecer um elemento HTML
    fadeOutElement(elemento: HTMLElement) {
        //pegar opacidade do elemento html
        let opacidade = parseFloat(elemento.style.opacity)

        //repetir diminuicao da opacidade
        setInterval(() => {
            //se elemento ainda està visivel
        if (opacidade > 0) {
            //diminuir a opacidade
            opacidade -= 0.01

            //atualizar a opacidade do elemento
            elemento.style.opacity = opacidade.toString()
        }
    }, 10) 
    }

onTransition(direction: "in" | "out"): Transition | undefined {
    return new FadeInOut({
        direction: direction,
        color: Color.Black,
        duration: 1000
    })
}

    onInitialize(engine: Engine<any>): void {

        //criar elemento com a descricao da empresa
        this.elementoTexto = document.createElement("div") as HTMLElement

        //definir opacidade do elemento para 1 = visivel
        this.elementoTexto.style.opacity = "1"

        //inserir elemento texto no container game
        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoTexto)

        //adicionar classe na div criada (elementoTexto)
        this.elementoTexto.classList.add("sobre-gamifica")

        //adicionar texto e paragrafo dentro do conteudo da div
        this.elementoTexto.innerHTML = `<h2>Sobre o gamifica</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.</p>`
        
        this.backgroundColor = Color.fromHex("403f4c")

        let actorlogoVertical = new Actor ({
            pos: vec(engine.drawWidth - 300, engine.halfDrawHeight)
        })

        let imagemLogoVertical = Resources.LogoVertical.toSprite()
        imagemLogoVertical.scale = vec(0.7, 0.7)

        actorlogoVertical.graphics.add(imagemLogoVertical)

        this.add(actorlogoVertical)

        //configurar a cena para monitorar o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                //criar transicao suave do elemento texto
                this.fadeOutElement(this.elementoTexto!)
                //direcionar para a proxima cena
                engine.goToScene("gamificado")
            }
        })
    }   
    
    onDeactivate(context: SceneActivationContext<undefined>): void {
        //remover elementoTexto da tela
        this.elementoTexto?.remove()
    }
}

