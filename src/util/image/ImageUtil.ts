import {ctx2d} from "../CanvasUtil";

export function toImageData(img: HTMLImageElement, w: number, h: number): ImageData {
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    let ctx = ctx2d(canvas);
    ctx.drawImage(img, 0, 0, w, h);
    return ctx.getImageData(0, 0, w, h);
}