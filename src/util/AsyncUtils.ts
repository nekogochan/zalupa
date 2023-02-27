export function executePeriodicallyWhileTrue(fn: () => boolean, delay: number): () => void {
    let currentTimeoutId!: NodeJS.Timeout;
    function fuckMySelf() {
        currentTimeoutId = setTimeout(() => {
            if (fn()) {
                fuckMySelf();
            }
        }, delay);
    }
    fuckMySelf();
    return () => clearTimeout(currentTimeoutId);
}

export function executePeriodically(fn: () => void, delay: number): () => void {
    let execute = true;
    executePeriodicallyWhileTrue(() => {
        if (execute) {
            fn();
        }
        return execute;
    }, delay);
    return () => execute = false;
}