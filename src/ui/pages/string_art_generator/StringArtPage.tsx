import {StringArtModel} from "../../../model/StringArtModel";
import {HBox} from "../../components/layout/box/Box";
import {remember} from "../../hooks/UseEffectOnce";
import {StringArtCanvas} from "./StringArtCanvas";
import {StringArtMenu} from "./StringArtMenu";
import "./StringArtPage.scss"

export function StringArtPage() {
    const stringArt = remember(() => new StringArtModel())

    return (
        <HBox fullSize>
            <StringArtMenu model={stringArt}/>
            <StringArtCanvas model={stringArt}/>
        </HBox>
    )
}