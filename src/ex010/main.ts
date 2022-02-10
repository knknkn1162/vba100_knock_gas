function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const mat = sht.getDataRange().getValues();
    const rows = Array.from(Array(mat.length).keys())
        .filter(val => String(mat[val][3]).match(/(削除|不要)/))
        .filter(val => mat[val][2] === "")
    Logger.log(rows)
    rows.reverse()
        .map(val => val + 1)
        .forEach(val => sht.deleteRow(val))
}