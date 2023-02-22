import {DivProps} from "../../../types/PropsTypes";
import {VBox} from "../box/Box";
import {maybe} from "../../../../core/Option";

export type Section_props = DivProps & {
    header: string,
}

export function Section(_: Section_props) {
    return (
        <VBox className={"Section"}>
            <label className={"header"}>{_.header}</label>
            {maybe(_.children)
                .map(x => <div className={"content"} children={x}/>)
                .orElseGet(() => <></>)
                .get()}
        </VBox>
    )
}