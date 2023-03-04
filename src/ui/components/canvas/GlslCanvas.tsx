import shader_vertex_default from "$/shaders/vertex/default.glsl?raw"
import {Box, Box_props} from "@/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "@/ui/hooks/UseEffectOnce";
import {executePeriodically} from "@/util/AsyncUtils";
import {uuid} from "@/util/CryptoUtil";
import {maybe} from "@/util/Option";
import * as PIXI from "pixi.js";

type v2 = [number, number];
type v3 = [number, number, number];
const X = 0;
const Y = 1;
const Z = 2;

export type GlslCanvas_props = Box_props & {
    shaderCode: string,
    imageUrls?: string[],
    pixiAppPostConsume?: (app: PIXI.Application) => void,
    uniformPostProcessors?: {
        u_time?: (value: number) => number,
        u_resolution?: (value: v3) => v3,
        u_mouse?: (value: v2) => v2
    }
}

export type GlslCanvas_uniforms = {
    [key in `u_texture_${number}`]: PIXI.Texture
} & {
    u_time: number,
    u_mouse: v2,
    u_resolution: v3,
}

export function GlslCanvas({id, pixiAppPostConsume, shaderCode, uniformPostProcessors, imageUrls = [], ...rest}: GlslCanvas_props) {
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
            u_resolution: [0.0, 0.0, 0.0]
        } as GlslCanvas_uniforms;

        const maybeWithPP = (prop: keyof (typeof uniforms & typeof uniformPostProcessors)) => {
            return maybe(uniformPostProcessors)
                .map(x => x[prop as keyof typeof x] as Function)
                .map(f => (x: any) => uniforms[prop] = f(x))
                .orElse(x => uniforms[prop] = x)
                .get();
        }

        const setUMouse = maybeWithPP("u_mouse");
        const setUTime = maybeWithPP("u_time");
        const setURes = maybeWithPP("u_resolution");

        setURes([w, h, w / h]);

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
            setUMouse([nx, h - ny]);
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
            setUTime(time);
        });

        pixiAppPostConsume?.call(undefined, app);

        return () => {
            app.destroy(true);
            stopMousePosHandling();
        };
    });

    return <Box fullSize className={"GlslCanvas"} id={boxId} {...rest}/>
}