import {maybe} from "../../../core/Option";
import {useState} from "react";

export type Input_props = {
    onValueChange: (_: string) => void,
    initValue?: string,
    pattern?: string | RegExp
}
export function Input(_: Input_props) {
    let [val, set] = useState<string>(maybe(_.initValue).orElse("").get());
    const setValue = (s: string) => {
        set(s);
        _.onValueChange(s);
    };
    const handleInput = maybe(_.pattern)
        .map(x => {
            let pattern = new RegExp(x);
            return (s: string) => {
                if (s.match(pattern)) {
                    setValue(s);
                }
            }
        })
        .orElse(setValue)
        .get();
    return <input value={val} onChange={ev => handleInput(ev.target.value)}/>
}