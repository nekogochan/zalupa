export type Option<T extends NonNullable<Exclude<any, void>>> = {
    get(): NonNullable<T>,
    getOrElseThrow(err?: any): NonNullable<T>,
    orElse(newVal: T): Option<T>,
    orElseGet(getNewVal: () => T): Option<T>,
    map<R>(mapper: (x: NonNullable<T>) => R): Option<R>,

    accept(fn: (x: NonNullable<T>) => void): Option<T>,
    ifPresent(fn: (x: NonNullable<T>) => void): Option<T>,
    ifEmpty(fn: () => void): Option<T>,

    isPresent(): boolean,
    isEmpty(): boolean
}

class Some<T> implements Option<T> {
    val: NonNullable<T>;

    constructor(val: NonNullable<T>) {
        this.val = val;
    }

    get(): NonNullable<T> {
        return this.val;
    }

    ifEmpty(fn: () => void): Option<T> {
        return this;
    }

    ifPresent(fn: (x: NonNullable<T>) => void): Option<T> {
        fn(this.val);
        return this;
    }

    map<R>(mapper: (x: NonNullable<T>) => R): Option<R> {
        return maybe(mapper(this.val) as NonNullable<R>);
    }

    orElse(newVal: T): Option<T> {
        return this;
    }

    orElseGet(getNewVal: () => T): Option<T> {
        return this;
    }

    getOrElseThrow(err: any): NonNullable<T> {
        return this.val;
    }

    isEmpty(): boolean {
        return false;
    }

    isPresent(): boolean {
        return true;
    }

    accept(fn: (x: NonNullable<T>) => void): Option<T> {
        fn(this.val);
        return this;
    }
}

class None<T> implements Option<T> {
    get(): NonNullable<T> {
        throw new Error("no value present");
    }

    ifEmpty(fn: () => void): Option<T> {
        fn();
        return this;
    }

    ifPresent(fn: (x: NonNullable<T>) => void): Option<T> {
        return this;
    }

    map<R>(mapper: (x: NonNullable<T>) => R): Option<R> {
        return none();
    }

    orElse(newVal: T): Option<T> {
        return maybe(newVal);
    }

    orElseGet(getNewVal: () => T): Option<T> {
        return maybe(getNewVal());
    }

    getOrElseThrow(err?: any): NonNullable<T> {
        throw maybe(err)
            .orElseGet(() => new Error("no value present"))
            .get();
    }

    isEmpty(): boolean {
        return true;
    }

    isPresent(): boolean {
        return false;
    }

    accept(fn: (x: NonNullable<T>) => void): Option<T> {
        throw new Error("no value present");
    }
}

const noneInstance = new None();

export function some<T>(val: NonNullable<T>): Option<T> {
    return new Some(val);
}

export function none<T>(): Option<T> {
    return noneInstance as Option<T>;
}

export function maybe<T>(val: T | undefined | null): Option<T> {
    return val === undefined || val === null
        ? none()
        : some(val);
}