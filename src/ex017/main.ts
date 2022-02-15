import Range = GoogleAppsScript.Spreadsheet.Range;

function getFullAddress(rng: Range): string {
    return `'${rng.getSheet().getName()}'!${rng.getA1Notation()}`
}

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const srcsht = book.getSheetByName("社員")
    const rngstr = getFullAddress(srcsht.getDataRange().offset(1,2))
    Logger.log(rngstr)
    book.getSheetByName("部・課マスタ")
        .getRange("A2")
        .setFormula(`=sort(unique(${rngstr}))`)
}