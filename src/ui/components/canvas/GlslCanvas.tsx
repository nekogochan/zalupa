import shader_vertexDefault from "$/shaders/default-vertex.glsl?raw"
import {Box, Box_props} from "@/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "@/ui/hooks/UseEffectOnce";
import {executePeriodically} from "@/util/AsyncUtils";
import {uuid} from "@/util/CryptoUtil";
import * as PIXI from "pixi.js";

export type GlslCanvas_props = Box_props & {
    shaderCode: string
}

export function GlslCanvas({shaderCode, ...rest}: GlslCanvas_props) {
    const boxId = remember(uuid);

    useEffectOnce(() => {
        const canvasBox = document.getElementById(boxId) as HTMLDivElement;
        const app = new PIXI.Application({
            resizeTo: canvasBox
        });
        const canvas = app.view;
        const {
            offsetWidth: w,
            offsetHeight: h
        } = canvasBox;
        canvasBox.appendChild(canvas);

        const uniforms = {
            u_time: 0.0,
            u_mouse: {
                x: 0.0,
                y: 0.0
            },
            u_resolution: [w, h, w / h]
        };

        let lastMousePos = {
            x: 0,
            y: 0
        };
        const stopMousePosHandling = executePeriodically(() => {
            const currPos = {
                x: uniforms.u_mouse.x,
                y: uniforms.u_mouse.y
            };
            currPos.y = h - currPos.y;
            const newPos = {
                x: (lastMousePos.x + currPos.x * 9) / 10,
                y: (lastMousePos.y + currPos.y * 9) / 10
            };
            uniforms.u_mouse = {
                x: newPos.x,
                y: h - newPos.y
            }
        }, 1000 / 60);
        canvasBox.onmousemove = canvasBox.onclick =  ({x, y}) => {
            lastMousePos = {x, y};
        };

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

        const shader = PIXI.Shader.from(shader_vertexDefault, shaderCode, uniforms) as PIXI.MeshMaterial;
        const quad = new PIXI.Mesh(geometry, shader);

        app.stage.addChild(quad);

        let time = 0;
        app.ticker.add((delta) => {
            time += delta / 60;
            uniforms.u_time = time;
        });

        return () => {
            app.destroy(true);
            stopMousePosHandling();
        };
    });

    return <Box fullSize className={"GlslCanvas"} id={boxId} {...rest}/>
}