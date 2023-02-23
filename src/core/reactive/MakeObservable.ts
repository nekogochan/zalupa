import {maybe} from "../Option";

export type Subscription = {
    unsubscribe: () => void,
}

export type Observable<T> = T & {
    listeners: Map<keyof T, Set<(newValue: any, oldValue: any) => void>>
    onChange: <K extends keyof T, V extends T[K]>(key: K, listener: (newValue: V, oldValue: V) => void) => Subscription;
}

const ObservableHandler = {
    // @ts-ignore
    set(obj: Observable<T>, prop: keyof T, value: T[typeof prop]): boolean {
        maybe(obj.listeners.get(prop))
            .ifPresent(x => x.forEach((x: (newValue: any, oldValue: any) => void) => x(value, obj[prop])));
        return Reflect.set(obj, prop, value);
    }
};

export function makeObservable<T extends object>(object: T): Observable<T> {
    const asObservable = object as Observable<T>;
    if (asObservable.listeners !== undefined) {
        throw new Error("object contains [listeners] key, so can't override it");
    }
    if (asObservable.onChange !== undefined) {
        throw new Error("object contains [onChange] key, so can't override it");
    }
    asObservable.listeners = new Map();
    asObservable.onChange = function (key, listener) {
        return maybe(this.listeners.get(key))
            .orElseGet(() => {
                let set = new Set<(newValue: any, oldValue: any) => void>();
                this.listeners.set(key, set);
                return set;
            })
            .ifPresent(x => x.add(listener))
            .map(x => {
                return {
                    unsubscribe: () => x.delete(listener)
                } as Subscription
            })
            .get();
    }
    return new Proxy(
        asObservable,
        // @ts-ignore
        ObservableHandler
    );
}
