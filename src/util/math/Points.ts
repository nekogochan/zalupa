export type Point = {
    x: number,
    y: number
}

export class Points {
    x: number[] = [];
    y: number[] = [];

    get size() {
        return this.x.length;
    }

    push(x: number, y: number) {
        this.x.push(x);
        this.y.push(y);
    }

    forEach(fn: (x: number, y: number) => void) {
        this.forEachInRange(0, this.size, fn);
    }

    forEachInRange(fromIdx: number, toIdx: number, fn: (x: number, y: number, idx: number) => void): void {
        for (let i = fromIdx; i < toIdx; i++) {
            fn(this.x[i], this.y[i], i);
        }
    }

    at(idx: number): Point {
        return {
            x: this.x[idx],
            y: this.y[idx]
        };
    }
}