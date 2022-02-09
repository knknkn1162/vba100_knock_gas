import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Book = GoogleAppsScript.Spreadsheet.Spreadsheet;

function applyFilter(sht: Sheet, callback: () => void): void {
    try { sht.getFilter().remove(); } catch {}
    const rule = SpreadsheetApp.newFilterCriteria()
        .whenTextEqualTo("合格")
        .build();
    sht.getDataRange()
        .createFilter()
        .setColumnFilterCriteria(sht.getLastColumn(), rule);
    callback();
    sht.getFilter().remove();
    return;
}

function createSheet(book: Book): Sheet {
    const psht = book.getSheetByName("合格者");
    if(psht != null) book.deleteSheet(psht);
    const nsht = book.insertSheet("合格者");
    return nsht;
}

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const tws = book.getSheetByName("成績表");
    const sht = createSheet(book);
    applyFilter(tws, () => {
        tws.getRange("A:A").copyTo(sht.getRange(1,1));      
    });
}