import shader_spaceBackground from "$/shaders/space-background.glsl?raw"
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import "./Beauty.scss"

export function Beauty() {
    return <Box fullSize className={"Beauty"}>
        <GlslCanvas shaderCode={shader_spaceBackground}/>
    </Box>;
}