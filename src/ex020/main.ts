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

function createBackupFolder(str: string, parent: Folder): Folder {
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const iter = gen(root.getFoldersByName(str));
    const arr = Array.from(iter)
    const isFolder = (obj: DriveItem): obj is Folder => "createFolder" in obj;
    switch(arr.length) {
        case 2:
            console.error(`${str} folders has at least two`);
            break;
        case 1:
            Logger.log(`exist folder: ${str}; do nothing`)
            if(isFolder(arr[0])) return arr[0];
        case 0:
            return root.createFolder(str)
        default:
            console.error("unkown error");
            break;
    }
    return;
}

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const datestr = Utilities.formatDate(new Date(), "JST", "yyyyMMddhhmmss");
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const dir = createBackupFolder(`BACKUP_${book.getName()}`, root);
    const fname = `${book.getName()}_${datestr}`;
    book.copy(fname);
    // The Copied file creates just in `DriveApp.getRootFolder()`, so we must move to `dir`
    DriveApp.getFilesByName(fname).next().moveTo(dir);
}