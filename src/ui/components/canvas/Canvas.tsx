import {useRef} from "react";
import {maybe} from "../../../core/Option";
import {useEffectOnce} from "../../hooks/UseEffectOnce";

type SimpleCanvas_props = {
    canvasInitializer: (canvas: HTMLCanvasElement) => void | (() => void)
}

export function Canvas(_: SimpleCanvas_props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffectOnce(() => {
        return  _.canvasInitializer(maybe(canvasRef.current).get());
    });

    return <canvas ref={canvasRef}/>
}