import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const datestr = Utilities.formatDate(new Date(), "JST", "yyyyMMddhhmmss");
    Logger.log(datestr);
    //const newSS = SpreadsheetApp.create(`${book.getName()}_${datestr}`);

    Logger.log(DriveApp.getRootFolder().getName())
}