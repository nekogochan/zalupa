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