import {ReactNode, useState} from "react";
import {useTimeout} from "src/ui/hooks/UseEffectOnce";

export type Delayed_props = {
    delay: number,
    children: ReactNode | ReactNode[]
};

export function Delayed({delay, children}: Delayed_props) {
    let [show, setShow] = useState(false);

    useTimeout(delay, () => setShow(true));

    return <>
        {show && children}
    </>
}