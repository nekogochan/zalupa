import shader_spaceBackground from "$/shaders/ghosts/index.glsl?raw"
import texture_rand from "$/textures/ghosts-rand.png";
import {GlslCanvas} from "@/ui/components/canvas/GlslCanvas";
import {Box} from "@/ui/components/layout/box/Box";
import "./Ghosts.scss"
import {isFromMobile} from "@/util/UserInfoUtil";

export function Ghosts() {
    return <Box fullSize className={"Ghosts"}>
        <GlslCanvas shaderCode={shader_spaceBackground} imageUrls={[texture_rand]}
                    extraUniforms={{
                        u_scale: 16.0,
                        u_rand_factor: isFromMobile() ? 53758.5453 : 63358448.5453
                    }}/>
    </Box>;
}