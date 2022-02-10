import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main(): void {
    SpreadsheetApp.getActiveSheet()
        .getDataRange()
        .getMergedRanges()
        .forEach(r => r.setNote("セル結合されています"))
}