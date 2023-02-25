import {ReactNode} from "react";
import {HtmlNodeProps, SingleProp} from "../../../ReactUtils";
import "./Headers.scss"

export type Header_props = SingleProp<ReactNode, "children"> & HtmlNodeProps<HTMLElement>

export function Header({children, ...rest}: Header_props) {
    return <header {...rest}>
        {children}
    </header>;
}