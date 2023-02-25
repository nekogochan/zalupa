export class PlainImageData {

    imageData: ImageData;

    constructor(data: ImageData) {
        this.imageData = data;
    }

    width() {
        return this.imageData.width;
    }

    height() {
        return this.imageData.height;
    }

    data() {
        return this.imageData.data;
    }

    at(row: number, column: number, color: 0 | 1 | 2 | 3): number {
        return this.data()[this.idxAt(row, column, color)];
    }

    set(row: number, column: number, color: 0 | 1 | 2 | 3, val: number) {
        this.data()[this.idxAt(row, column, color)] = val;
    }

    r(x: number, y: number): number {
        return this.at(x, y, 0);
    }

    g(x: number, y: number): number {
        return this.at(x, y, 1);
    }

    b(x: number, y: number): number {
        return this.at(x, y, 2);
    }

    a(x: number, y: number): number {
        return this.at(x, y, 3);
    }

    forEach(fn: (x: number,
                 y: number,
                 r: number,
                 g: number,
                 b1: number,
                 a: number) => void) {
        let i = 0;
        for (let y = 0; y < this.height(); y++) {
            for (let x = 0; x < this.width(); x++) {
                fn(
                    x,
                    y,
                    this.data()[i++],
                    this.data()[i++],
                    this.data()[i++],
                    this.data()[i++]
                )
            }
        }
    }

    private idxAt(row: number, column: number, color: 0 | 1 | 2 | 3) {
        return row * (this.width() * 4) + column * 4 + color;
    }
}