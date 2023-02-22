import {maybe} from "../../../core/Option";
import {VerticalHorizontalLinesImageProcessor} from "./VerticalHorizontalLinesImageProcessor";

export class VerticalHorizontalLinesImageProcessorBuilder {
    private ctx?: CanvasRenderingContext2D;
    private htmlImg?: HTMLImageElement;

    clear() {
        this.htmlImg = this.ctx = undefined;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    setImage(htmlImg: HTMLImageElement) {
        this.htmlImg = htmlImg;
    }

    ready() {
        return maybe(this.ctx).isPresent() &&
            maybe(this.htmlImg).isPresent();
    }

    build() {
        let ctx = maybe(this.ctx).get();
        let htmlImg = maybe(this.htmlImg).get()

        let {width, height} = ctx.canvas;
        ctx.drawImage(htmlImg, 0, 0);
        let imageData = ctx.getImageData(0, 0, width, height);

        return new VerticalHorizontalLinesImageProcessor(
            ctx, imageData
        );
    }
}