import {Points} from "../../util/math/Points";

export class StringArt {
    nails = new Points();
    resultPath: number[] = [];
    data: number[][] = [];
    currentPointIdx = 0;
    lineWeight: number = 15;

    init(data: number[][]) {
        this.data = data;
        let width = data.length;
        let height = data[0].length;
        for (let i = 0; i < width; i += 10) {
            this.nails.push(i, 0);
        }
        for (let i = 0; i < height; i += 10) {
            this.nails.push(width - 1, i);
        }
        for (let i = width - 1; i >= 0; i -= 10) {
            this.nails.push(i, height - 1);
        }
        for (let i = height - 1; i >= 0; i -= 10) {
            this.nails.push(0, i);
        }
    }

    process(number: number): number[] {
        let bestIndexes = [];
        for (let i = 0; i < number; i++) {
            bestIndexes.push(this.processOne());
        }
        this.resultPath.push(...bestIndexes);
        return bestIndexes;
    }

    private processOne(): number {
        let {x: cx, y: cy} = this.nails.at(this.currentPointIdx);
        let bestWeight = -99999999;
        let bestIdx = -1;
        const findBest = (x: number, y: number, idx: number) => {
            let w = this.weight(cx, cy, x, y);
            if (w > bestWeight) {
                bestWeight = w;
                bestIdx = idx;
            }
        };
        this.nails.forEachInRange(0, this.currentPointIdx, findBest);
        this.nails.forEachInRange(this.currentPointIdx + 1, this.nails.size, findBest);
        this.draw(bestIdx);
        return bestIdx;
    }

    private draw(idx: number) {
        let last = this.nails.at(this.currentPointIdx);
        let that = this.nails.at(idx);
        this.forEachInRange(last.x, last.y, that.x, that.y, (x, y) => {
            this.data[x][y] -= this.lineWeight;
        });
        this.currentPointIdx = idx;
    }

    private weight(fromX: number, fromY: number,
                   toX: number, toY: number) {
        let weight = 0;
        this.forEachInRange(fromX, fromY, toX, toY, (x, y) => {
            weight += this.data[x][y];
        });
        return weight;
    }

    private forEachInRange(fromX: number, fromY: number,
                           toX: number, toY: number,
                           fn: (x: number, y: number) => void): void {
        let dist = Math.hypot(toX - fromX, toY - fromY);
        let steps = Math.floor(dist);
        let dx = (toX - fromX) / steps;
        let dy = (toY - fromY) / steps;
        let x = fromX;
        let y = fromY;
        for (let i = 0; i < steps; i++) {
            let ix = Math.floor(x);
            let iy = Math.floor(y);
            fn(ix, iy);
            x += dx;
            y += dy;
        }
    }
}
