export function savePixiCanvasAsImage(app: PIXI.Application, fileName: string): void {
    app.renderer.extract.canvas(app.stage).toBlob((b) => {
        const a = document.createElement('a');
        document.body.append(a);
        a.download = fileName;
        a.href = URL.createObjectURL(b as Blob);
        a.click();
        a.remove();
    }, 'image/png');
}