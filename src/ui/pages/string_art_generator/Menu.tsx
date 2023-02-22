import {Section} from "../../components/layout/section/Section";
import {ImageInput} from "../../components/input/ImageInput";
import {maybe} from "../../../core/Option";
import {Box} from "../../components/layout/box/Box";
import {useState} from "react";
import {readAsImage} from "../../../core/FileUtil";

export type Menu_props = {
    data: {
        img?: HTMLImageElement,
    },
    on: {
        ebnut: () => void
    }
}

export function Menu(_: Menu_props) {
    const [img, setImg] = useState(_.data.img);

    function maybeSetImg([file]: File[]) {
        maybe(file)
            .map(readAsImage)
            .ifPresent(setImg)
            .ifPresent(x => _.data.img = x);
    }

    return <>
        <Section header={"Изображение"}>
            <ImageInput onChange={maybeSetImg}/>
            {maybe(img)
                .map(x => <img src={x.src}/>)
                .map(x => <Box style={{maxHeight: "500px"}} children={x}/>)
                .orElse(<></>)
                .get()}
        </Section>
        <Section header={"Ёбнем?"}>
            <button onClick={_.on.ebnut}>ёбнем</button>
        </Section>
    </>
}