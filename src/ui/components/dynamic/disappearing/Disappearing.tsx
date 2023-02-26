import {Box, Box_props} from "@/ui/components/layout/box/Box";
import {useTimeout} from "@/ui/hooks/UseEffectOnce";
import {useState} from "react";
import "./Disappearing.scss";

export type Disappearing_props = Box_props & {
    timeout: number
}

export function Disappearing({timeout, children, className, style, ...rest}: Disappearing_props) {
    const [show, setShow] = useState(true);

    useTimeout(timeout, () => setShow(false));

    className = [className, "Disappearing"].filter(x => x !== undefined).join(" ");
    if (!style) {
        style = {};
    }
    // @ts-ignore
    style["--timeout"] = `${timeout}ms`;
    return <>
        {show && <Box fullSize className={className} style={style} {...rest}>{children}</Box>}
    </>
}
