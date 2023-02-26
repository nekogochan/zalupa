import shader_vertexDefault from "$/shaders/default-vertex.glsl?raw"
import shader_spaceBackground from "$/shaders/space-background.glsl?raw"
import {Disappearing} from "@/ui/components/dynamic/disappearing/Disappearing";
import {Box} from "@/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "@/ui/hooks/UseEffectOnce";
import {uuid} from "@/util/CryptoUtil";
import * as PIXI from "pixi.js";
import "./Beauty.scss"

export function Beauty() {
    const canvasBoxId = remember(uuid);

    useEffectOnce(() => {
        const canvasBox = document.getElementById(canvasBoxId) as HTMLDivElement;
        const app = new PIXI.Application();
        const canvas = app.view;
        const {offsetWidth: w, offsetHeight: h} = canvasBox;
        canvas.width = w;
        canvas.height = h;
        canvasBox.appendChild(canvas);
        const uniforms = {
            u_time: 0.0,
            u_mouse: {
                x: 0.0,
                y: 0.0
            },
            u_resolution: [w, h, w / h]
        }
        canvas.onmousemove = ({x, y}) => {
            uniforms.u_mouse = {x, y};
        }

        console.log(w, h);

        // Build geometry.
        const geometry = new PIXI.Geometry()
            .addAttribute('aVertexPosition', // the attribute name
                [
                    0, 0, // x, y
                    w, 0, // x, y
                    w, h,
                    0, h
                ], // x, y
                2) // the size of the attribute
            .addAttribute('aUvs', // the attribute name
                [
                    0, 0, // u, v
                    1, 0, // u, v
                    1, 1,
                    0, 1
                ], // u, v
                2) // the size of the attribute
            .addIndex([0, 1, 2, 0, 2, 3]);

        const shader = PIXI.Shader.from(shader_vertexDefault, shader_spaceBackground, uniforms) as PIXI.MeshMaterial;
        const quad = new PIXI.Mesh(geometry, shader);

        app.stage.addChild(quad);

        let time = 0;
        app.ticker.add(() => {
            time += 1 / 60;
            uniforms.u_time = time;
        });

        return () => {
            canvasBox.removeChild(canvas);
        }
    });

    return <Box fullSize className={"Beauty"}>
        <Box fullSize className={"canvas-container"} id={canvasBoxId}/>
        <Disappearing className={"black-background"} timeout={3000}/>
    </Box>;
}