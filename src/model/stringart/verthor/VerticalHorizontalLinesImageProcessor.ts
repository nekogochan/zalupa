import {RgbDataProcessor} from "../../../core/image/RgbProcessor";
import {ColorDataProcessor} from "../../../core/image/ColorDataProcessor";

export class VerticalHorizontalLinesImageProcessor {
    ctx: CanvasRenderingContext2D;
    data: RgbDataProcessor;
    rows: number[];
    columns: number[];
    avg: number;

    constructor(ctx: CanvasRenderingContext2D, imageData: ImageData) {
        this.ctx = ctx;
        this.data = RgbDataProcessor.fromImageData(imageData);
        this.rows = new Array(this.data.height()).fill(0);
        this.columns = new Array(this.data.width()).fill(0);

        let dataGreyscale = this.data.toGreyscale();
        dataGreyscale.forEach((x, y, val) => {
            this.rows[y] += val;
            this.columns[x] += val;
        });
        this.avg = dataGreyscale.avg();
    }

    draw() {
        let {data, rows, columns, avg, ctx} = this;
        let dataGreyscale = ColorDataProcessor.emptyOfSize(data.width(), data.height());
        for (let i = 0; i < rows.length; i++) {
            // let rowVal = rows[i];
            for (let j = 0; j < data.height(); j++) {
                dataGreyscale.set(i, j, (
                    data.red.get(i, j) +
                    data.green.get(i, j) +
                    data.blue.get(i, j)
                ) / 3);
                // let columnVal = columns[j];
                // dataGreyscale.add(i, j, rowVal);
                // dataGreyscale.add(i, j, columnVal);
            }
        }
        let dataAvg = dataGreyscale.avg();
        let multiplier = avg / dataAvg;
        dataGreyscale.forEach((x, y, val) => {
            dataGreyscale.set(x, y, val * multiplier);
        })
        let asRgb = RgbDataProcessor.fromGreyscale(dataGreyscale);
        asRgb.forEach((x, y, r, g, b) => {
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, 1, 1);
        });
    }
}