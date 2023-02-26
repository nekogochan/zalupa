import {ReactNode, useState} from "react";
import {DynamicNode} from "@/ui/components/dynamic/DynamicNode";
import {remember} from "@/ui/hooks/UseEffectOnce";

export type Replaceable_props = {
    dynamicNode: (onComplete: () => void) => DynamicNode,
    replacement: () => ReactNode
}

export function Replaceable({dynamicNode, replacement}: Replaceable_props) {
    const [shouldReplace, setShouldReplace] = useState(false);

    const dynNode = remember(() => dynamicNode(() => setShouldReplace(true)));

    return <>
        {shouldReplace ? replacement : dynNode}
    </>
}