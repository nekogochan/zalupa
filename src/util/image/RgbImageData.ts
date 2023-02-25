import {initDoubleArr} from "../ArrayUtil";
import {verifyEquals} from "../Verify";
import {ColorData} from "./ColorData";

export class RgbImageData {
    static emptyOfSize(width: number, height: number): RgbImageData {
        let f = () => new ColorData(initDoubleArr(width, height));
        return new RgbImageData(f(), f(), f());
    }

    public readonly red: ColorData;
    public readonly green: ColorData;
    public readonly blue: ColorData;

    constructor(red: ColorData, green: ColorData, blue: ColorData) {
        verifyEquals(red.width(), green.width(), blue.width());
        verifyEquals(red.height(), green.height(), blue.height());
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    width() {
        return this.red.width();
    }

    height() {
        return this.red.height();
    }

    forEach(fn: (x: number, y: number, r: number, g: number, b: number) => void) {
        let {red, green, blue} = this;
        for (let i = 0; i < red.width(); i++) {
            for (let j = 0; j < red.height(); j++) {
                fn(i, j,
                    red.get(i, j),
                    green.get(i, j),
                    blue.get(i, j)
                );
            }
        }
    }

    toGreyscale() {
        let colorProcessor = ColorData.emptyOfSize(this.width(), this.height());
        this.forEach((x, y, r, g, b) => {
            colorProcessor.set(x, y, (r + g + b) / 3);
        })
        return colorProcessor;
    }
}
