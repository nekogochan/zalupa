import rfdc from "rfdc";

const rfdcFn = rfdc()

export function deepClone<T>(t: T): T {
    return rfdcFn(t);
}
