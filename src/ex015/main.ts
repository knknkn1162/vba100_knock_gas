import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    Array.from(Array(book.getNumSheets()).keys())
        .map(val => val+4)
        // monthIndex: beginning with 0 for January to 11 for December.
        // day: default=1
        .map(val => Utilities.formatDate(new Date(2020, val-1), "JST", "yyyy年MM月"))
        .forEach((str, idx) => {book.getSheetByName(str).activate(); book.moveActiveSheet(idx+1)} )
}