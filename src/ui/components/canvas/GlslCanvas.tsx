import shader_vertex_default from "$/shaders/vertex/default.glsl?raw"
import {Box, Box_props} from "@/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "@/ui/hooks/UseEffectOnce";
import {executePeriodically} from "@/util/AsyncUtils";
import {uuid} from "@/util/CryptoUtil";
import {maybe} from "@/util/Option";
import * as PIXI from "pixi.js";

type v2 = [number, number];
type v3 = [number, number, number];

export type GlslCanvas_props = Box_props & {
    shaderCode: string,
    imageUrls?: string[],
    pixiAppPostConsume?: (app: PIXI.Application) => void,
    extraUniforms?: object
}

export type GlslCanvas_uniforms = {
    [key in `u_texture_${number}`]: PIXI.Texture
} & {
    u_time: number,
    u_mouse: v2,
    u_resolution: v3,
}

export function GlslCanvas({id, pixiAppPostConsume, shaderCode, extraUniforms, imageUrls = [], ...rest}: GlslCanvas_props) {
    const boxId = remember(() => maybe(id).orElseGet(uuid).get());

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
            u_mouse: [0.0, 0.0],
            u_resolution: [0.0, 0.0, 0.0],
            ...extraUniforms
        } as GlslCanvas_uniforms;

        uniforms.u_resolution = [w, h, w / h];

        imageUrls?.forEach((imageUrl, idx) => {
            console.log(idx, imageUrl);
            uniforms[`u_texture_${idx}`] = PIXI.Sprite.from(imageUrl).texture;
        });

        let lastMousePos = {
            x: 0,
            y: 0
        };
        const stopMousePosHandling = executePeriodically(() => {
            let [cx, cy] = uniforms.u_mouse;
            cy = h - cy;
            let nx = lastMousePos.x + cx * 9;
            let ny = lastMousePos.y + cy * 9;
            nx /= 10;
            ny /= 10;
            uniforms.u_mouse = [nx, h - ny];
        }, 1000 / 60);

        canvasBox.ontouchmove = canvasBox.ontouchstart = (ev) => {
            const {
                pageX: x,
                pageY: y
            } = ev.touches.item(0) as Touch;
            lastMousePos = {
                x, y
            };
        }
        canvasBox.onmousemove = ({x, y}) => {
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

        const shader = PIXI.Shader.from(shader_vertex_default, shaderCode, uniforms) as PIXI.MeshMaterial;
        const quad = new PIXI.Mesh(geometry, shader);

        app.stage.addChild(quad);

        let time = 0;
        app.ticker.add((delta) => {
            time += delta / 60;
            uniforms.u_time = time;
        });

        pixiAppPostConsume?.call(undefined, app);

        return () => {
            app.destroy(true);
            stopMousePosHandling();
        };
    });

    return <Box fullSize className={"GlslCanvas"} id={boxId} {...rest}/>
}