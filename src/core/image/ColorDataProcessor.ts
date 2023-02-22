import {maybe} from "../Option";
import {initDoubleArr} from "../ArrayUtil";
import {deepClone} from "../CommonUtil";

export class ColorDataProcessor {
    static emptyOfSize(width: number, height: number) {
        return new ColorDataProcessor(initDoubleArr(width, height));
    }

    constructor(data: number[][]) {
        this.data = data;
    }

    private readonly data: number[][];

    width() {
        return this.data.length;
    }

    height() {
        return maybe(this.data[0]).map(x => x.length).orElse(0).get();
    }

    get(x: number, y: number) {
        return this.data[x][y];
    }

    set(x: number, y: number, val: number) {
        this.data[x][y] = val;
    }

    add(x: number, y: number, val: number) {
        this.data[x][y] += val;
    }

    forEach(fn: (x: number, y: number, val: number) => void) {
        if (maybe(this.data[0]).isEmpty()) {
            return;
        }
        for (let x = 0; x < this.data.length; x++) {
            for (let y = 0; y < this.data[0].length; y++) {
                fn(x, y, this.data[x][y]);
            }
        }
    }

    avg(): number {
        let x = 0;
        this.forEach((_1, _2, val) => x += val);
        x /= this.width();
        x /= this.height();
        return x;
    }

    clone(): ColorDataProcessor {
        return new ColorDataProcessor(deepClone(this.data));
    }
}