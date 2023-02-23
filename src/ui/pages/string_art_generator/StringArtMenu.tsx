import {Section} from "../../components/layout/section/Section";
import {ImageInput} from "../../components/input/image/ImageInput";

export type Menu_props = {
    data: {
        img?: HTMLImageElement,
    },
    on: {
        ebnut: () => void
    }
}

export function StringArtMenu(_: Menu_props) {
    return <>
        <Section header={"Изображение"}>
            <ImageInput style={{
                width: "250px",
                height: "250px"
            }} onFilePick={x => console.log(x)}/>
        </Section>
        <Section header={"Ёбнем?"}>
            <button onClick={_.on.ebnut}>ёбнем</button>
        </Section>
    </>
}