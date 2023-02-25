export const initDoubleArr = (w: number, h: number) => {
    let arr = [];
    for (let i = 0; i < w; i++) {
        let row = [];
        for (let j = 0; j < h; j++) {
            row.push(0);
        }
        arr.push(row);
    }
    return arr;
}