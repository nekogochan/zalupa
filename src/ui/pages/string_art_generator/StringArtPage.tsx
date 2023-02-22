import {CenterBox, HBox, VBox} from "../../components/layout/box/Box";
import {Canvas} from "../../components/canvas/Canvas";
import random from "random";
import {clamp} from "../../../core/math/MathUtil";
import {Menu} from "./Menu";

export function StringArtPage() {
    let r = 0;
    let g = 0;
    let b = 0;
    let dr = 1;
    let dg = 1;
    let db = 1;

    function ebnut() {
        r = random.int(0, 255);
        g = random.int(0, 255);
        b = random.int(0, 255);
        dr = random.boolean() ? 1 : -1;
        dg = random.boolean() ? 1 : -1;
        db = random.boolean() ? 1 : -1;
    }

    function initCanvas(canvas: HTMLCanvasElement) {
        canvas.width = 1000;
        canvas.height = 1000;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        function drawNextColor() {
            r += dr * random.int(0, 3);
            g += dg * random.int(1, 4);
            b += db * random.int(2, 5);
            if (r < 0 || r > 255) dr *= -1;
            if (g < 0 || g > 255) dg *= -1;
            if (b < 0 || b > 255) db *= -1;
            r = clamp(r, 0, 255);
            g = clamp(g, 0, 255);
            b = clamp(b, 0, 255);
            console.log(r, g, b);
            ctx.fillStyle = `rgb(${[r, g, b].join(',')})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ebnut();
        let intervalId = setInterval(drawNextColor, 1000 / 60);
        return () => clearInterval(intervalId);
    }

    return (
        <HBox fullSize>
            <VBox fullSize style={{width: "300px"}}>
                <Menu data={{}} on={{ebnut: ebnut}}/>
            </VBox>
            <CenterBox>
                <Canvas canvasInitializer={initCanvas}/>
            </CenterBox>
        </HBox>
    )
}