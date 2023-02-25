import {SingleProp} from "../../ReactUtils";
import {Canvas} from "../../components/canvas/Canvas";
import {CenterBox} from "../../components/layout/box/Box";
import {remember} from "../../hooks/UseEffectOnce";
import {uuid} from "../../../util/CryptoUtil";
import {StringArtModel} from "../../../model/StringArtModel";
import {ctx2d, withStyle} from "../../../util/CanvasUtil";

export function StringArtCanvas({model}: SingleProp<StringArtModel, "model">) {
    const divId = remember(uuid);
    return <CenterBox className={"StringArtCanvas"} id={divId}>
        <Canvas canvasInitializer={(canvas) => {
            model.onImageChange = () => {
                const div = document.getElementById(divId) as HTMLDivElement;
                const ctx = ctx2d(canvas);
                const img = model.getImg();
                initCanvasSize(canvas, div, img);
                ctx.fillStyle = "white";
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.imageSmoothingQuality = "high";
                ctx.imageSmoothingEnabled = true;
                ctx.lineWidth = 0.15;
                const clear = () => withStyle(ctx, "white", () => {
                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                });
                clear();
                ctx.fillStyle = "black";
                ctx.strokeStyle = "black";
                model.canvas = canvas;
                model.onDebugDraw = (stringArt) => {
                    stringArt.nails.forEach((x, y) => {
                        ctx.fillRect(x - 2, y - 2, 5, 5);
                    });
                }
                model.onResultChange = (prevLastPoint, points) => {
                    ctx.moveTo(prevLastPoint.x, prevLastPoint.y);
                    points.map(i => model.stringArt!.nails.at(i)).forEach(({x, y}) => {
                        ctx.lineTo(x, y);
                    })
                    ctx.closePath();
                    ctx.stroke();
                };
                model.onInit = clear;
                model.init();
            }
        }}/>
    </CenterBox>
}

function initCanvasSize(canvas: HTMLCanvasElement, div: HTMLDivElement, img: HTMLImageElement) {
    let iw = img.width;
    let ih = img.height;
    let cw = iw;
    let ch = ih;
    let dw = div.scrollWidth;
    let dh = div.scrollHeight;
    let ratio = Math.min(dw / iw, dh / ih);
    cw = cw * ratio;
    ch = ch * ratio;
    canvas.width = cw;
    canvas.height = ch;
}