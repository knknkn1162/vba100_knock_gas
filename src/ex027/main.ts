function transpose(arr: any[]): any[][] {
    return arr.map(v => [v]);
}

function main(): void {
    const sht = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const rng = sht.getRange("A1").offset(0,0,sht.getLastRow(),1);
    const arr = rng.getRichTextValues()
        .flat()
        .map(val => val.getLinkUrl());
    Logger.log(arr);
    rng.offset(0,1).clearContent();
    rng.offset(0,1).setValues(transpose(arr));
}