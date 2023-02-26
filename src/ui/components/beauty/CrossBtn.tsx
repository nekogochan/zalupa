import {HtmlNodeProps} from "@/ui/ReactUtils";
import "./CrossBtn.scss";

export type CrossBtn_props = HtmlNodeProps<HTMLButtonElement> & {
    fakeHover?: boolean,
    color?: string
}

export function CrossBtn({fakeHover, color, style, children, ...rest}: CrossBtn_props) {
    let btnClassName = fakeHover ? "hover" : "";
    if (color) {
        if (!style) {
            style = {};
        }
        // @ts-ignore
        style["--color"] = color;
    }
    return <div style={style} className={"cross-btn-container"}>
        <button className={btnClassName} {...rest}>
            {children}
            <span/>
            <span/>
            <span/>
            <span/>
        </button>
    </div>
}