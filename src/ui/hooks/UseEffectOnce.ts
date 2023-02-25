import {EffectCallback, useEffect, useState} from "react";

export function useEffectOnce(fn: EffectCallback) {
    useEffect(fn, []);
}

export function useTimeout(delay: number, fn: () => void) {
    useEffectOnce(() => {
        let timeoutId = setTimeout(fn, delay);
        return () => clearTimeout(timeoutId);
    });
}

export function remember<T>(fn: () => T) {
    const [state] = useState(fn());
    return state;
}