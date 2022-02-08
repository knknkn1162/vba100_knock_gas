import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
function intersect(sht: Sheet, rows: number, columns: number): Range {
    const rng = sht.getDataRange();
    return rng.offset(rows, columns, rng.getNumRows()-rows, rng.getNumRows()-columns)
}

function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    intersect(sht, 1, 1).clearContent();
}