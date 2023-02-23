import {SingleProp} from "../../ReactUtils";
import {StringArt} from "../../../model/stringart/StringArt";
import {Canvas} from "../../components/canvas/Canvas";
import {ShittyColoredCanvas} from "../../components/canvas/ShittyColoredCanvas";
import {maybe} from "../../../core/Option";

export function StringArtCanvas({stringArt}: SingleProp<StringArt, "stringArt">) {
    return <>
        {maybe(stringArt.data.img)
            .map(x => <Canvas canvasInitializer={() => undefined}/>)
            .orElseGet(() => <ShittyColoredCanvas/>)
            .get()}
    </>
}