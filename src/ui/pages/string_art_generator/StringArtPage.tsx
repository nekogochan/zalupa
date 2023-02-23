import "./StringArtPage.scss"
import {HBox} from "../../components/layout/box/Box";
import {StringArtMenu} from "./StringArtMenu";
import {StringArtCanvas} from "./StringArtCanvas";
import {remember} from "../../hooks/UseEffectOnce";
import {StringArt} from "../../../model/stringart/StringArt";

export function StringArtPage() {
    const stringArt = remember(() => new StringArt())

    return (
        <HBox fullSize>
            <StringArtMenu stringArt={stringArt}/>
            <StringArtCanvas stringArt={stringArt}/>
        </HBox>
    )
}