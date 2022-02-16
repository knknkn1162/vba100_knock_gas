function getFizzbuzzType(val: number): [number, string] {
    switch(true) {
        case (val%15 === 0): return [3, "fizzbuzz"];
        case (val%5 === 0): return [2, "buzz"];
        case (val%3 === 0): return [1, "fizz"];
        default: return [0, String(val)];
    }
}

function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    sht.clearContents();
    const num = 500;
    const arr2 = Array.from(Array(num).keys())
        .map(val => getFizzbuzzType(val+1))
        .map(val => Array(4).fill(val[1], val[0], val[0]+1));
    sht.getRange(1,1,arr2.length, 4).setValues(arr2);
    
}