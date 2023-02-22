export function verifyEquals(...elements: any[]) {
    let first = elements[0];
    for (let i = 1; i < elements.length; i++) {
        if (elements[i] !== first) {
            throw new Error(`verification error, all must be same [${elements}]`);
        }
    }
}