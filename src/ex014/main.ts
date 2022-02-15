function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const shts = book.getSheets()
        .filter(sht => !sht.getName().includes("社外秘"));
    for(const sht of shts) {
        const mat = sht.getDataRange().getValues();
        sht.getDataRange().setValues(mat);
        sht.showSheet();
        sht.getRange("A1").activate();
    }
    book.getSheets()
        .filter(sht => sht.getName().includes("社外秘"))
        .forEach(sht => book.deleteSheet(sht));
}