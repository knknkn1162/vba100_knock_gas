import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main(): void {
    const sht = SpreadsheetApp.getActiveSheet()
    const rng = sht.getDataRange()
    rng.offset(1,1, rng.getNumRows()-2, rng.getNumColumns()-2).clearContent()
}