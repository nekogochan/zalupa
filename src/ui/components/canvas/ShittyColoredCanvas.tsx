import random from "random";
import {clamp} from "../../../util/math/MathUtil";
import {remember} from "../../hooks/UseEffectOnce";
import {Canvas} from "./Canvas";

export function ShittyColoredCanvas() {
    const r = remember(() => [0]);
    const g = remember(() => [0]);
    const b = remember(() => [0]);
    const dr = remember(() => [1]);
    const dg = remember(() => [1]);
    const db = remember(() => [1]);

    function ebnut() {
        r[0] = random.int(0, 255);
        g[0] = random.int(0, 255);
        b[0] = random.int(0, 255);
        dr[0] = random.boolean() ? 1 : -1;
        dg[0] = random.boolean() ? 1 : -1;
        db[0] = random.boolean() ? 1 : -1;
    }

    function initCanvas(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        function drawNextColor() {
            r[0] += dr[0] * random.int(0, 3);
            g[0] += dg[0] * random.int(1, 4);
            b[0] += db[0] * random.int(2, 5);
            if (r[0] < 0 || r[0] > 255) dr[0] *= -1;
            if (g[0] < 0 || g[0] > 255) dg[0] *= -1;
            if (b[0] < 0 || b[0] > 255) db[0] *= -1;
            r[0] = clamp(r[0], 0, 255);
            g[0] = clamp(g[0], 0, 255);
            b[0] = clamp(b[0], 0, 255);
            ctx.fillStyle = `rgb(${[r[0], g[0], b[0]].join(',')})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ebnut();
        let intervalId = setInterval(drawNextColor, 1000 / 60);
        return () => clearInterval(intervalId);
    }

    return <Canvas canvasInitializer={initCanvas}/>
}