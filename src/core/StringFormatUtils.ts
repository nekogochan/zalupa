const WHITESPACE_REGEX = /\s/;

export function limitSize(s: string, c: number): string {
    if (s.length < c) {
        return s;
    }
    s = s.substring(0, c - 3);
    return `${s}...`;
}