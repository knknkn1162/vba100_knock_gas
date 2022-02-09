function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const rng = sht.getDataRange();
    const mat = rng.getValues();
    Array.from(Array(mat.length).keys())
        .filter(val => val !== 0)
        .filter(val => !(""+mat[val][0]).match(/.+-.+/))
        .forEach(val => mat[val][3] = "=RC[-2]*RC[-1]")
    rng.setValues(mat);
}