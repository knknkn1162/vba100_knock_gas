function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const rng = sht.getDataRange();
    const mat = rng.getValues();
    sht.getRange("B:B").setNumberFormat("MMdd");
    const ret = mat
        // exclude header
        .filter((_, idx) => idx !== 0)
        .map(val => String(val[0]).replaceAll(/ /g, "\/"))
        .map(val => val.replace("元年", "1年"))
        // year expression in 2 charas(e.g) yy/mm/dd) is ambiguous
        // wareki conversion implementation is too messy...
        .map(val => new Date(val))
        .map(val => [new Date(val.getFullYear(), val.getMonth()+1, 0)])
    rng.offset(1,1, ret.length, 1).setValues(ret);
}