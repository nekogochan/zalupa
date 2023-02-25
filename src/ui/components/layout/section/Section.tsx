import {maybe} from "../../../../util/Option";
import {HtmlNodeProps} from "../../../ReactUtils";
import {VBox} from "../box/Box";
import "./Section.scss"

export type Section_props = HtmlNodeProps<HTMLDivElement> & {
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