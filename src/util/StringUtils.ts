import {some} from "./Option";

const WHITESPACE_REGEX = /\s/;

export function limitSize(s: string, c: number): string {
    if (s.length < c) {
        return s;
    }
    s = s.substring(0, c - 3);
    return `${s}...`;
}

export function splitByRegexWithSeparators(text: string, regexp: RegExp): string[] {
    const result = [];
    regexp = new RegExp(regexp, "g"); // clone
    let shit: RegExpExecArray | null;
    let nextTextStartIdx = 0;
    while ((shit = regexp.exec(text)) != null) {
        let ws = shit[0];
        result.push(text.substring(nextTextStartIdx, shit.index));
        result.push(ws);
        nextTextStartIdx = shit.index + ws.length;
    }
    some(text.substring(nextTextStartIdx))
        .filter(s => s.length !== 0)
        .ifPresent(s => result.push(s));
    return result;
}