export function getRandom() {
    const min = 0;
    const max = 18446744073709;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}