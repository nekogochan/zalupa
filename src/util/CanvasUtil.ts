import {ColorData} from "./image/ColorData";

type Ctx2D = CanvasRenderingContext2D;
type Ctx2D_Style = string | CanvasGradient | CanvasPattern;

export function resizeCanvas(canvas: HTMLCanvasElement, newWidth: number, newHeight: number) {
    let oldWidth = canvas.width;
    let oldHeight = canvas.height;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let imgData = ctx.getImageData(0, 0, oldWidth, oldHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.putImageData(imgData, 0, 0, 0, 0, newWidth, newHeight);
}

export function ctx2d(canvas: HTMLCanvasElement): Ctx2D {
    return canvas.getContext("2d") as Ctx2D;
}

export function withStyle(ctx: Ctx2D, style: Ctx2D_Style, fn: () => void) {
    let prevStyle = ctx.fillStyle;
    let prevStrokeStyle = ctx.strokeStyle;
    ctx.fillStyle = style;
    ctx.strokeStyle = style;
    fn();
    ctx.fillStyle = prevStyle;
    ctx.strokeStyle = prevStrokeStyle;
}

export function drawImageGreyscaleShitty(ctx: CanvasRenderingContext2D, imgData: ColorData) {
    imgData.forEach((x, y, d) => {
        let o = d.toString(16);
        ctx.fillStyle = `#${o}${o}${o}`;
        ctx.fillRect(x, y, 1, 1);
    });
}

export function drawImageGreyscale(ctx: CanvasRenderingContext2D, imgData: ColorData) {
    imgData.forEach((x, y, d) => {
        ctx.fillStyle = `rgb(${d},${d},${d})`;
        ctx.fillRect(x, y, 1, 1);
    });
}
