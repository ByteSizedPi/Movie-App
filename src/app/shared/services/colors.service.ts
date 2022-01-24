import { Colors } from "../types/Types";
import { Injectable } from "@angular/core";
import Vibrant from "node-vibrant";

@Injectable({
  providedIn: "root",
})
export class ColorsService {
  private colors: Colors;
  constructor() {}

  getPalette = (url: string): Promise<Colors> =>
    new Vibrant(url).getPalette().then((palette) => {
      this.colors = {
        vibrant: palette.Vibrant?.getHex(),
        muted: palette.Muted?.getHex(),
        lightVibrant: palette.LightVibrant?.getHex(),
        lightMuted: palette.LightMuted?.getHex(),
        darkVibrant: palette.DarkVibrant?.getHex(),
        darkMuted: palette.DarkMuted?.getHex(),
        v_text: palette.Vibrant?.getTitleTextColor(),
        m_text: palette.Muted?.getTitleTextColor(),
        lv_text: palette.LightVibrant?.getTitleTextColor(),
        lm_text: palette.LightMuted?.getTitleTextColor(),
        dv_text: palette.DarkVibrant?.getTitleTextColor(),
        dm_text: palette.DarkMuted?.getTitleTextColor(),
      };

      return { ...this.colors };
    });

  get curColors() {
    return this.colors;
  }
}
