import store from "../store";
import BaseRect from "./baserect";

import { InitiativeData, ServerAsset } from "../api_types";
import { GlobalPoint } from "../geom";
import { g2lx, g2ly, g2lz } from "../units";

export default class Asset extends BaseRect {
    type = "asset";
    img: HTMLImageElement;
    src: string = "";
    constructor(img: HTMLImageElement, topleft: GlobalPoint, w: number, h: number, uuid?: string) {
        super(topleft, w, h);
        if (uuid !== undefined) this.uuid = uuid;
        this.img = img;
    }
    asDict() {
        return Object.assign(this.getBaseDict(), {
            src: this.src,
        });
    }
    fromDict(data: ServerAsset) {
        super.fromDict(data);
        this.src = data.src;
    }
    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        try {
            ctx.drawImage(this.img, g2lx(this.refPoint.x), g2ly(this.refPoint.y), g2lz(this.w), g2lz(this.h));
        } catch (error) {
            console.warn(`Shape ${this.uuid} could not load the image ${this.src}`);
        }
    }
    getInitiativeRepr(): InitiativeData {
        return {
            uuid: this.uuid,
            visible: !store.state.IS_DM,
            group: false,
            src: this.src,
            owners: this.owners,
            has_img: true,
            effects: [],
        };
    }
}
