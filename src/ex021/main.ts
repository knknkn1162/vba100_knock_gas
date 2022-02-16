import FileIterator = GoogleAppsScript.Drive.FileIterator;
import Folder = GoogleAppsScript.Drive.Folder;
import File = GoogleAppsScript.Drive.File;
import FolderIterator = GoogleAppsScript.Drive.FolderIterator;
type DriveItem = Folder | File;
type GASIterator = FileIterator | FolderIterator;

function* gen(iter: GASIterator) {
    while(iter.hasNext()) {
      yield iter.next();
    }
}

function getBackupFolder(str: string, parent: Folder): Folder {
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    return root.getFoldersByName(str).next();
}
const dryrun = false;
function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const cdt = new Date(); cdt.setDate(cdt.getDate()-30);
    const pdtstr = Utilities.formatDate(cdt, "JST", "yyyyMMddhhmmss");
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const dir = getBackupFolder(`${book.getName()}_BACKUP`, root);
    const fname = `${book.getName()}_${pdtstr}`;
    Logger.log(`${fname} or before will be trashed.`);
    const removeItem = (ditem: DriveItem): void => {
        if(dryrun) {Logger.log(ditem.getName());} else {ditem.setTrashed(true)}
    }
    Array.from(gen(dir.getFiles()))
        .filter(file => file.getName() <= fname)
        .forEach(file => removeItem(file))
}