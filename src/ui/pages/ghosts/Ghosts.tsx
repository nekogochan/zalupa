import shader_spaceBackground from "$/shaders/ghosts/index.glsl?raw"
import texture_noise from "$/textures/ghosts-noise.png";
import texture_rand from "$/textures/ghosts-rand.png";
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import "./Ghosts.scss"

export function Ghosts() {
    return <Box fullSize className={"Ghosts"}>
        <GlslCanvas shaderCode={shader_spaceBackground} imageUrls={[texture_rand]}/>
    </Box>;
}