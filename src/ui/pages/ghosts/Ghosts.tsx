import shader_spaceBackground from "$/shaders/ghosts/index.glsl?raw"
import texture_rand from "$/textures/ghosts-rand.png";
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import "./Ghosts.scss"

export function Ghosts() {
    return <Box fullSize className={"Ghosts"}>
        <GlslCanvas shaderCode={shader_spaceBackground} imageUrls={[texture_rand]}
                    uniformPostProcessors={{
                        u_resolution: (ures) => {
                            ures[2] = 16.0;
                            return ures;
                        }
                    }}/>
    </Box>;
}