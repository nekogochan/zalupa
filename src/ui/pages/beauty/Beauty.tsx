import "./Beauty.scss";
import * as glsl from "glsl-canvas-js/dist/esm/glsl";
import {Disappearing} from "src/ui/components/dynamic/disappearing/Disappearing";
import {Box} from "src/ui/components/layout/box/Box";
import {remember, useEffectOnce} from "src/ui/hooks/UseEffectOnce";
import {uuid} from "src/util/CryptoUtil";

export function Beauty() {
    const canvasBoxId = remember(uuid);


    useEffectOnce(() => {
        const canvasBox = document.getElementById(canvasBoxId) as HTMLDivElement;
        const canvas = document.createElement("canvas");
        canvas.width = canvasBox.offsetWidth;
        canvas.height = canvasBox.offsetHeight;
        canvas.className = "glsl-canvas";
        const glslCanvas = new glsl.Canvas(canvas);

    });

    return <Box fullSize className={"Beauty"}>
        <Box fullSize id={canvasBoxId}/>
        <Disappearing timeout={5000}>
            <Box fullSize className={"back-screen"}/>
        </Disappearing>
    </Box>;
}