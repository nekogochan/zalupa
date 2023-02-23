import {SingleProp} from "../../ReactUtils";
import {StringArt} from "../../../model/stringart/StringArt";
import {Canvas} from "../../components/canvas/Canvas";
import {maybe} from "../../../core/Option";
import {ctx2d} from "../../../core/CanvasUtil";
import {CenterBox} from "../../components/layout/box/Box";
import {remember} from "../../hooks/UseEffectOnce";
import {uuid} from "../../../core/CryptoUtil";
import {max, min} from "mathjs";

export function StringArtCanvas({stringArt}: SingleProp<StringArt, "stringArt">) {
    const divId = remember(uuid);
    return <CenterBox className={"StringArtCanvas"} id={divId}>
        <Canvas canvasInitializer={(canvas) => {
            const ctx = ctx2d(canvas);
            const div = document.getElementById(divId) as HTMLDivElement;
            stringArt.data.onChange("img", (img) => {
                maybe(img)
                    .ifPresent(img => {
                        img.decode().then(() => {
                            let iw = img.width;
                            let ih = img.height;
                            let cw = iw;
                            let ch = ih;
                            let dw = div.scrollWidth;
                            let dh = div.scrollHeight;
                            let ratio = min(dw / iw, dh / ih);
                            cw = cw * ratio;
                            ch = ch * ratio;
                            canvas.width = cw;
                            canvas.height = ch;
                            ctx.drawImage(img, 0, 0, cw, ch);
                        });
                    });
            })
        }}/>
    </CenterBox>
}