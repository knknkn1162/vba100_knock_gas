import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

interface Dic {
    [key: string]: string;
}

function createFolder(str: string, parent: Folder) {
    if(parent.getFoldersByName(str).hasNext()) {
        return parent.getFoldersByName(str).next();
    } else {
        return parent.createFolder(str)
    }
}

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const root = DriveApp.getFoldersByName("spreadsheet").next();
    const folder = createFolder(`${book.getName()}`, root);
    const dic: Map<string, string> = new Map(
        book.getSheets()
            .map(v => v.getName())
            .map(str => [str, str.split("_")[0]])
    );
    // create folder only once
    Array.from(new Set(dic.values()))
        .map(v => createFolder(v, folder));
        
    book.getSheets()
        .forEach(sht => {
            const name = sht.getName()
            Logger.log(`create New Book: ${name} in ${folder}/${dic.get(name)}`);
            const nbook = SpreadsheetApp.create(name);
            sht.copyTo(nbook).setName(name);
            nbook.getSheets()
                .filter(s => s.getName() !== name)
                .forEach(s => nbook.deleteSheet(s));
            DriveApp.getFileById(nbook.getId())
                .moveTo(folder.getFoldersByName(dic.get(name)).next());
        })
}