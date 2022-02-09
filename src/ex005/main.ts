function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const rng = sht.getRange("B2").getDataRegion().offset(1,0);
    const mat = rng.getValues();
    Array.from(Array(mat.length).keys())
        .filter(val => !mat[val].slice(0,2).includes(""))
        .forEach(val => mat[val][2] = mat[val][0] * mat[val][1]);
    rng.setValues(mat);
}