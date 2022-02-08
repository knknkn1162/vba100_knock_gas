import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function init(sht: Sheet) {
    sht.getDataRange().clear();
}

function main(): void {
    const abook = SpreadsheetApp.getActiveSpreadsheet();
    const sht1 = abook.getSheetByName('Sheet1');
    const sht2 = abook.getSheetByName('Sheet2');
    init(sht2);
    const rng = sht1.getRange(1,1, sht1.getLastRow(), sht1.getLastColumn())
    rng.copyTo(sht2.getRange(1,1), {contentsOnly: true, formatOnly: true});
}