import {initDoubleArr} from "../ArrayUtil";
import {ColorData} from "./ColorData";
import {PlainImageData} from "./PlainImageData";
import {RgbImageData} from "./RgbImageData";

export function imageDataToRgb(imageData: ImageData) {
    let id = new PlainImageData(imageData);
    let rgb = RgbImageData.emptyOfSize(imageData.width, imageData.height)
    id.forEach((x, y, r, g, b) => {
        rgb.red.set(x, y, r);
        rgb.green.set(x, y, g);
        rgb.blue.set(x, y, b);
    });
    return rgb;
}

export function grayscaleDataToRgb(data: ColorData) {
    let f = () => data.clone();
    return new RgbImageData(f(), f(), f());
}

export function emptyRgbData(width: number, height: number) {
    return grayscaleDataToRgb(new ColorData(initDoubleArr(width, height)));
}
