import {EffectCallback, useEffect, useState} from "react";

export function useEffectOnce(fn: EffectCallback) {
    useEffect(fn, []);
}

export function remember<T>(fn: () => T) {
    const [state] = useState(fn());
    return state;
}