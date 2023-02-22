export function readAsImage(file: File) {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    return img;
}