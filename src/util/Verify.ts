import {maybe} from "./Option";

export function verifyEquals(...elements: any[]) {
    let first = elements[0];
    for (let i = 1; i < elements.length; i++) {
        if (elements[i] !== first) {
            throw new Error(`verification error, all must be same [${elements}]`);
        }
    }
}

export function verifyNotContainsProperty<T extends object>(obj: T, prop: keyof T) {
    if (obj[prop] !== undefined) {
        let propName = maybe(prop).map(x => x.toString()).orElse("undefined").get();
        throw new Error(`Object [${obj}] contains property [${propName}], but shouldn't`);
    }
}