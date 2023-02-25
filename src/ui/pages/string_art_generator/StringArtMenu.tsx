import {Section} from "../../components/layout/section/Section";
import {ImageInput} from "../../components/input/image/ImageInput";
import {VBox} from "../../components/layout/box/Box";
import {SingleProp} from "../../ReactUtils";
import {StringArtModel} from "../../../model/StringArtModel";

export function StringArtMenu({model}: SingleProp<StringArtModel, "model">) {
    return <VBox className={"StringArtMenu"}>
        <Section header={"Изображение"}>
            <ImageInput style={{
                width: "250px",
                height: "250px"
            }} onFilePick={x => {
                x.decode().then(() => model.setImg(x));
            }}/>
        </Section>
        <Section header={"Чёб ебнуть"}>
            <VBox spacing={10}>
                <button onClick={model.process.bind(model)}>ну рисуй ёпта</button>
                <button onClick={model.debugDraw.bind(model)}>Покажи гвозди</button>
                <button onClick={model.init.bind(model)}>Сбрось всё к хуям</button>
            </VBox>
        </Section>
    </VBox>
}