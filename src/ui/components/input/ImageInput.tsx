import {maybe} from "../../../core/Option";

export type ImageInput_props = {
    onChange: (_: File[]) => void
}

export function ImageInput({onChange}: ImageInput_props) {
    return <input type={"file"}
                  accept={"image/*"}
                  onChange={ev => maybe(ev.target.files)
                      .map(x => [...x])
                      .orElse([])
                      .ifPresent(onChange)}
    />
}