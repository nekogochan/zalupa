import "./Headers.scss"
import {ReactNode} from "react";
import {HtmlNodeProps, SingleProp} from "src/ui/ReactUtils";

export type Header_props = SingleProp<ReactNode, "children"> & HtmlNodeProps<HTMLElement>

export function Header({children, ...rest}: Header_props) {
    return <header className={"Header"} {...rest}>
        {children}
    </header>;
}