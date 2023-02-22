import {ImageDataProcessor} from "./ImageDataProcessor";
import {ColorDataProcessor} from "./ColorDataProcessor";
import {initDoubleArr} from "../ArrayUtil";
import {verifyEquals} from "../Verify";

export class RgbDataProcessor {
    static fromImageData(imageData: ImageData): RgbDataProcessor {
        let id = new ImageDataProcessor(imageData);
        let rgb = RgbDataProcessor.emptyOfSize(imageData.width, imageData.height)
        id.forEach((x, y, r, g, b) => {
            rgb.red.set(x, y, r);
            rgb.green.set(x, y, g);
            rgb.blue.set(x, y, b);
        });
        return rgb;
    }

    static emptyOfSize(width: number, height: number): RgbDataProcessor {
        let f = () => new ColorDataProcessor(initDoubleArr(width, height));
        return new RgbDataProcessor(f(), f(), f());
    }

    static fromGreyscale(data: ColorDataProcessor): RgbDataProcessor {
        return new RgbDataProcessor(
            data.clone(),
            data.clone(),
            data.clone()
        );
    }

    public readonly red: ColorDataProcessor;
    public readonly green: ColorDataProcessor;
    public readonly blue: ColorDataProcessor;

    constructor(red: ColorDataProcessor, green: ColorDataProcessor, blue: ColorDataProcessor) {
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
        let colorProcessor = ColorDataProcessor.emptyOfSize(this.width(), this.height());
        this.forEach((x, y, r, g, b) => {
            colorProcessor.set(x, y, (r + g + b) / 3);
        })
        return colorProcessor;
    }
}
