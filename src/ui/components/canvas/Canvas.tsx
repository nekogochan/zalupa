import {useRef} from "react";
import {maybe} from "../../../util/Option";
import {useEffectOnce} from "../../hooks/UseEffectOnce";
import {HtmlNodeProps} from "../../ReactUtils";

export type SimpleCanvas_props = HtmlNodeProps<HTMLCanvasElement> & {
    canvasInitializer: (canvas: HTMLCanvasElement) => void | (() => void)
}

export function Canvas({canvasInitializer, ...rest}: SimpleCanvas_props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffectOnce(() => {
        return canvasInitializer(maybe(canvasRef.current).get());
    });

    return <canvas {...rest}
                   ref={canvasRef}/>
}