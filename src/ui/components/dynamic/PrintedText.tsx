import {useState} from "react";
import {executePeriodicallyWhileTrue} from "../../../util/AsyncUtils";
import {arraySequence} from "../../../util/helpers/Sequence";
import {splitByRegexWithSeparators} from "../../../util/StringUtils";
import {remember, useEffectOnce} from "../../hooks/UseEffectOnce";
import {HtmlNodeProps} from "../../ReactUtils";

export enum DynamicText_AppendType {
    LETTER,
    WORD
}

function splitByAppendType(text: string, type: DynamicText_AppendType) {
    switch (type) {
        case DynamicText_AppendType.LETTER:
            return text.split('');
        case DynamicText_AppendType.WORD:
            return splitByRegexWithSeparators(text, /\S+/);
    }
}

export type DynamicText_props = HtmlNodeProps<HTMLParagraphElement> & {
    text: string,
    delay: number,
    appendType?: DynamicText_AppendType,
    onComplete?: () => void
}

export function PrintedText({
                                text, onComplete, delay,
                                appendType = DynamicText_AppendType.LETTER, ...rest
                            }: DynamicText_props) {
    const [currentText, setCurrentText] = useState("");
    const fullTextParts = remember(() => arraySequence(splitByAppendType(text, appendType)));

    useEffectOnce(() => {
        return executePeriodicallyWhileTrue(
            () => {
                return fullTextParts.next()
                    .ifPresent(newWord => setCurrentText(x => x + newWord))
                    .ifEmpty(() => onComplete?.apply(null))
                    .isPresent()
            },
            delay
        );
    });

    return <p {...rest}>{currentText}</p>
}