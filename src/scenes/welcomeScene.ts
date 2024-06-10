import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {

textoIniciar?: Label
//ao entrar ou sair da cena adiciona transicao
onTransition(direction: "in" | "out"): Transition | undefined {
    return new FadeInOut({
        direction: direction,
        color: Color.Black,
        duration: 1000
    })
}

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        //configurando objeto para frase de bem vindo
        let fraseBemVindo = new Label({
            text:"Bem vindo ao portifolio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300), //posicao X = metade da tela, posicao Y

            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })
        })

        this.add(fraseBemVindo)

        // frase de enter
        //let textoIniciar = new Label({
        //    text:"Pressione \"Enter\" para iniciar",
        //    width: 200,
        //    height: 50,
        //    pos: vec(engine.drawWidth / 2, 630),
        //    font: new Font({
        //        color: Color.White,
        //        size: 20,
        //        textAlign: TextAlign.Center,
        //        family: "Anta",
        //    })
     //})

     //this.add(textoIniciar)

     //this.textoIniciar?.actions.repeatForever( context =>{
      //  this.textoIniciar?.actions.fade(0, 1000)
      //  this.textoIniciar?.actions.fade(1, 1000)
     //})
        

        let actorLogo = new Actor({
            pos: vec(engine.drawWidth / 2, 430)
        })

        //utilizar imagem do logo
        let imageLogo = Resources.Logo.toSprite()

        //aplicar zoom a imagem de 40% em x e y
        imageLogo.scale = vec(0.4, 0.4)

        //configurar o ator logo
        actorLogo.graphics.add(imageLogo)

        //carrega o ator logo
        this.add(actorLogo)

        this.textoIniciar = new Label({
            text: "Pressione \"Enter\" para iniciar...",
            height: 50,
            width: 200,
            pos: vec(engine.halfDrawWidth, 630),
            font: new Font ({
                color: Color.White,
                family: "Anta",
                size: 20,
                textAlign: TextAlign.Center
            })
        })

        this.add(this.textoIniciar)


//monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Enter) {
                //vai para a cena historia
                engine.goToScene("historia")
            }
        })

    }

    onPreUpdate(_engine: Engine<any>, _delta: number): void {
        this.textoIniciar?.actions.fade(0, 1000)
        this.textoIniciar?.actions.fade(1, 1000)
    }

}