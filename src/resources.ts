import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import { TiledResource } from "@excaliburjs/plugin-tiled";
import logo from "./images/logo.png";
import logoVertical from "./images/logo-vertical.png";
import controle from "./images/controle.png"

import pngTilesetPath from "./maps/Room_Builder_32x32.png?url"

import tsxParedesPath from "./maps/tileset_Room?url"
import tsxGenericPath from "./maps/tileset_generic?url"
import tsxEstoquePath from "./maps/tileset_basement?url"
import tsxBiblioteca from "./maps/tileset_biblioteca?url"

import tmxMapaPath from "./maps/mapa.tmx?url"


export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  LogoVertical: new ImageSource (logoVertical),
  Controle: new ImageSource (controle),
  Mapa: new TiledResource(tmxMapaPath, {
    pathMap: [
      {path: "mapa.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_Room", output: tsxParedesPath},
      {path: "tileset_generic", output: tsxGenericPath},
      {path: "tileset_basement", output: tsxEstoquePath},
      {path: "tileset_biblioteca", output: tsxBiblioteca}

    ]
  })
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);

}
