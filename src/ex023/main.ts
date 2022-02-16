import FileIterator = GoogleAppsScript.Drive.FileIterator;
import File = GoogleAppsScript.Drive.File;
import Folder = GoogleAppsScript.Drive.Folder;
import FolderIterator = GoogleAppsScript.Drive.FolderIterator;
type DriveItem = File | Folder;
type GASIterator = FileIterator | FolderIterator;

function* gen(iter: GASIterator) {
    while(iter.hasNext()) {
      yield iter.next();
    }
}
function main(): void {
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const iter = gen(root.getFoldersByName("ex023_sample").next().getFiles());
    const arr2 = Array.from(iter)
        .map(file => SpreadsheetApp.openById(file.getId()))
        .map(book => book.getSheets().map(sheet => sheet.getName()))
        .map(sheets => sheets.sort())
    if(arr2.length !== 2) {
        console.error("require exactly 2 spreadsheets");
        return;
    }
    Logger.log(arr2);
    Browser.msgBox(JSON.stringify(arr2[0]) === JSON.stringify(arr2[1]) ? "一致" : "不一致");
    return;
}