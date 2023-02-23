import {Section} from "../../components/layout/section/Section";
import {ImageInput} from "../../components/input/image/ImageInput";
import {VBox} from "../../components/layout/box/Box";
import {StringArt} from "../../../model/stringart/StringArt";
import {SingleProp} from "../../ReactUtils";

export function StringArtMenu({stringArt}: SingleProp<StringArt, "stringArt">) {
    return <VBox className={"StringArtMenu"}>
        <Section header={"Изображение"}>
            <ImageInput style={{
                width: "250px",
                height: "250px"
            }} onFilePick={x => {
                stringArt.data.img = x
            }}/>
        </Section>
        <Section header={"Ёбнем?"}>
            <button onClick={stringArt.process}>ёбнем</button>
        </Section>
    </VBox>
}