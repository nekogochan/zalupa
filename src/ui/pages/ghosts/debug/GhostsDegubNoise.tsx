import fuckNiggers from "$/shaders/ghosts/debug/noise.glsl?raw";
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";

export function GhostsDebugNoise() {
    return <Box fullSize style={{overflow: "hidden"}}>
        <GlslCanvas shaderCode={fuckNiggers}/>
    </Box>;
}