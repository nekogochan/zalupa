export function executePeriodicallyWhileTrue(fn: () => boolean, delay: number): () => void {
    let currentTimeoutId = 0;
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