import "./StringArtPage.scss"
import {HBox} from "../../components/layout/box/Box";
import {StringArtMenu} from "./StringArtMenu";
import {StringArtCanvas} from "./StringArtCanvas";
import {remember} from "../../hooks/UseEffectOnce";
import {StringArtModel} from "../../../model/StringArtModel";

export function StringArtPage() {
    const stringArt = remember(() => new StringArtModel())

    return (
        <HBox fullSize>
            <StringArtMenu model={stringArt}/>
            <StringArtCanvas model={stringArt}/>
        </HBox>
    )
}