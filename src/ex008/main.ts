//import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
//import Range = GoogleAppsScript.Spreadsheet.Range;

function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const rng = sht.getDataRange().offset(1,1);
    const mat = rng.getValues();
    const cutoff5 = 350; const cutoff1 = 50;
    Array.from(Array(mat.length).keys())
        .filter(val => mat[val].reduce((p, c) => p+c) >= cutoff5)
        .filter(val => mat[val].filter(v => v >= cutoff1).length >= 5)
        .forEach(val => mat[val][5] = "合格")
    rng.setValues(mat);
}