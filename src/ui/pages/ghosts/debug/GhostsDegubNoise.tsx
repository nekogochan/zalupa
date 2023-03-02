import fuckNiggers from "$/shaders/ghosts/debug/noise.glsl?raw";
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import {holder} from "@/ui/hooks/UseEffectOnce";
import {maybe} from "@/util/Option";
import {savePixiCanvasAsImage} from "@/util/PixiUtil";

export function GhostsDebugNoise() {
    const pixiAppHolder = holder<PIXI.Application>();

    const saveImage = () => {
        maybe(pixiAppHolder.val).accept(x => savePixiCanvasAsImage(x, "ghosts-debug.png"));
    }

    return <Box>
        <Box style={{width: "3000px", height: "3000px", overflow: "hidden", position: "absolute", zIndex: -1}}>
            <GlslCanvas pixiAppPostConsume={x => pixiAppHolder.val = x} shaderCode={fuckNiggers}/>
        </Box>
        <button onClick={saveImage}>
            <h1>Сохранить как картинку</h1>
        </button>
    </Box>;
}