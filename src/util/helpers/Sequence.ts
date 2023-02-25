import {maybe, Option} from "../Option";

export type Sequence<T> = {
    next: () => Option<T>
}

export function arraySequence<T>(array: T[]): Sequence<T> {
    return new ArraySequence(array);
}

class ArraySequence<T> implements Sequence<T> {
    array: T[];
    idx = 0;

    constructor(array: T[]) {
        this.array = array;
    }

    next(): Option<T> {
        return maybe(this.array[this.idx])
            .ifPresent(() => this.idx++);
    }
}