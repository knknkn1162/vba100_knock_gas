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
    const isFile = (obj: DriveItem): obj is File => !("createFolder" in obj);
    const book = SpreadsheetApp.getActiveSpreadsheet()
    const sht = book.getSheets()[0]; sht.clear();
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const dir = root.getFoldersByName(`${book.getName()}_files`).next();
    const files = Array.from(gen(dir.getFiles())).map(f => isFile(f) ? f : undefined);
    // mimetype:
    // // application/vnd.google-apps.spreadsheet
    // // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    const mat = files.map(f => [
        f.getMimeType().includes("spreadsheet") ? 
            `=Hyperlink("${f.getUrl()}", "${f.getName()}")` : `${f.getName()}`,
        f.getLastUpdated(),
        f.getSize()
    ]);
    sht.getRange(1, 1, 1, mat[0].length).setValues([["ファイル一覧", "更新日時", "サイズ"]]);
    sht.getRange(2, 1, mat.length, mat[0].length).setValues(mat);
    sht.getRange("B:B").setNumberFormat("yyyy/MM/dd HH:mm:ss");
}