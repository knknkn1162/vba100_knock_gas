function transpose(arr: any[]): any[][] {
    return arr.map(v => [v]);
}

function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const salesht = book.getSheetByName("売上");
    const dbsht = book.getSheetByName("売上DB");
    const cols = salesht.getLastColumn();
    const rows = salesht.getLastRow();
    const getColumnValues = (row: number): any[] => salesht.getRange(row, 3, 1, cols-2).getValues()[0];

    const dates = getColumnValues(1);
    const deps = salesht.getRange(1,1,rows, 1)
        .getValues()
        .map((val, idx, arr) => val[0] === "" ? arr[idx-1] : val);
    
    const types = salesht.getRange(1,2, rows, 1).getValues().map(v => v[0]);
    let pos = 2;
    dbsht.getDataRange().offset(1,0).clearContent();
    // each line
    for (let idx = 2; idx <= salesht.getLastRow(); idx++) {
        Logger.log(`pos: ${pos}`);
        const data = getColumnValues(idx);
        dbsht.getRange(pos, 1, data.length, 1).setValue(deps[idx-1]);
        dbsht.getRange(pos, 2, data.length, 1).setValue(types[idx-1]);
        dbsht.getRange(pos, 3, data.length, 1).setValues(transpose(dates));
        dbsht.getRange(pos, 4, data.length, 1).setValues(transpose(data));
        pos += data.length;
    }
}