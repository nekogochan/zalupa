import texture_random from "$/textures/ghosts-noise-from-phone.png"
import shader_spaceBackground from "$/shaders/ghosts/index.glsl?raw"
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import "./Ghosts.scss"

export function Ghosts() {
    return <Box fullSize className={"Ghosts"}>
        <GlslCanvas shaderCode={shader_spaceBackground} imageUrls={[texture_random]}/>
    </Box>;
}