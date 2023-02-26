import spaceBackground from "$/shaders/space-background.glsl?raw"
import {Disappearing} from "@/ui/components/dynamic/disappearing/Disappearing";
import {Box} from "@/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "@/ui/hooks/UseEffectOnce";
import {uuid} from "@/util/CryptoUtil";
import * as glsl from "glsl-canvas-js/dist/esm/glsl";

export function Beauty() {
    const canvasBoxId = remember(uuid);

    useEffectOnce(() => {
        const canvasBox = document.getElementById(canvasBoxId) as HTMLDivElement;
        const canvas = document.createElement("canvas");
        canvas.width = canvasBox.offsetWidth;
        canvas.height = canvasBox.offsetHeight;
        canvas.className = "glsl-canvas";
        canvasBox.appendChild(canvas);
        const glslCanvas = new glsl.Canvas(canvas, {
            fragmentString: spaceBackground,
            alpha: false,
            antialias: true,
            extensions: ['EXT_shader_texture_lod'],
            onError: () => console.log("Всё пошло по пизде")
        });
        return () => {
            canvasBox.removeChild(canvas);
        }
    });

    return <Box fullSize className={"Beauty"}>
        <Box fullSize id={canvasBoxId}/>
        <Disappearing timeout={5000}>
            <Box fullSize className={"back-screen"}/>
        </Disappearing>
    </Box>;
}