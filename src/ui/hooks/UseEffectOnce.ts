import {EffectCallback, useEffect} from "react";

export function useEffectOnce(fn: EffectCallback) {
    useEffect(fn, []);
}