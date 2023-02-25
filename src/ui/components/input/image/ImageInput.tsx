import {useState} from "react";
import {readAsImage} from "../../../../util/FileUtil";
import {maybe} from "../../../../util/Option";
import {remember} from "../../../hooks/UseEffectOnce";
import {Box_props, CenterBox} from "../../layout/box/Box";
import "./ImageInput.scss"

export type ImageInput_props = Box_props & {
    onFilePick: (_: HTMLImageElement) => void,
    inputInitializer?: (_: HTMLInputElement) => void;
}

export function ImageInput({onFilePick, inputInitializer, ...rest}: ImageInput_props) {
    const [img, setImg] = useState<HTMLImageElement>();
    const input = remember(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.hidden = true;
        input.multiple = false;
        input.onchange = () => {
            maybe(input.files)
                .map(x => [...x])
                .map(x => x[0])
                .map(readAsImage)
                .ifPresent(x => {
                    onFilePick(x);
                    setImg(x);
                })
        }
        maybe(inputInitializer).ifPresent(x => x(input));
        return input;
    });

    return <CenterBox {...rest}
                      fullSize
                      onClick={() => input.click()}
                      className={"ImageInput"}>
        {maybe(img)
            .map(x => <img src={x.src}/>)
            .orElseGet(() => <div className={"alt"}>Выберите изображение</div>)
            .get()}
    </CenterBox>
}