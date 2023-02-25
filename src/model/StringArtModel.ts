import {StringArt} from "../core/stringart/StringArt";
import {maybe} from "../util/Option";
import {Point} from "../util/math/Points";
import {toImageData} from "../util/image/ImageUtil";
import {imageDataToRgb} from "../util/image/ImageDataUtil";
import {ctx2d, drawImageGreyscale, drawImageGreyscaleShitty} from "../util/CanvasUtil";

export class StringArtModel {

    readonly stringArt: StringArt = new StringArt();
    private img?: HTMLImageElement;

    canvas!: HTMLCanvasElement;
    onResultChange?: (point: Point, indexes: number[]) => void;
    onDebugDraw?: (stringArt: StringArt) => void;
    onImageChange?: () => void;
    onInit?: () => void;

    setImg(img: HTMLImageElement) {
        this.img = img;
        maybe(this.onImageChange).ifPresent(x => x());
    }

    getImg(): HTMLImageElement {
        return maybe(this.img).get();
    }

    process(): void {
        let sa = maybe(this.stringArt).get();
        let lastPoint = sa.nails.at(sa.nails.size - 1);
        let newPointsIndexes = sa.process(500);
        maybe(this.onResultChange).get()(lastPoint, newPointsIndexes);
    }

    init(): void {
        maybe(this.img).ifPresent((img) => {
            let imgData = toImageData(img, this.canvas.width, this.canvas.height);
            let data = imageDataToRgb(imgData).toGreyscale();
            let dataClone = data.clone();
            dataClone.reverse();
            this.stringArt.init(dataClone.data);
            drawImageGreyscaleShitty(ctx2d(this.canvas), dataClone);
        });
    }

    debugDraw(): void {
        let fn = maybe(this.onDebugDraw).get();
        maybe(this.stringArt).accept(fn)
    }
}
