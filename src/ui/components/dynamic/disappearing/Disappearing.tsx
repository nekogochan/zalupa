import "./Disappearing.scss";
import {ReactNode, useState} from "react";
import {Box} from "src/ui/components/layout/box/Box";
import {useTimeout} from "src/ui/hooks/UseEffectOnce";

export type Disappearing_props = {
    timeout: number,
    children: ReactNode | ReactNode[]
}

export function Disappearing({children, timeout}: Disappearing_props) {
    const [show, setShow] = useState(true);

    useTimeout(timeout, () => setShow(false));

    // @ts-ignore
    const style: CSSProperties = {"--timeout": `${timeout}ms`};
    return <>
        {show && <Box fullSize className={"Disappearing"} style={style}>{children}</Box>}
    </>
}
