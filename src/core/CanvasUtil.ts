export function resizeCanvas(canvas: HTMLCanvasElement, newWidth: number, newHeight: number) {
    let oldWidth = canvas.width;
    let oldHeight = canvas.height;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let imgData = ctx.getImageData(0, 0, oldWidth, oldHeight);
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.putImageData(imgData, 0, 0, 0, 0, newWidth, newHeight);
}