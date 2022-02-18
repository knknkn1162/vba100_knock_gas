function main(): void {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    let mat: string[][] = [];
    const rng = book.getSheetByName("名簿").getDataRange();
    rng.offset(0, 0, Math.trunc(rng.getNumRows()/2)*2 + 1, rng.getNumColumns())
        .getValues()
        .slice(1)
        .forEach((arr, idx, all) => {
            if(idx % 2 === 0) {
                mat.push([arr[1], all[idx+1][1] ]);
                mat.push([arr[2], all[idx+1][2] ]);
            }
    });
    const cols = mat[0].length;
    const tsht = book.getSheetByName("名札");
    tsht.clearContents();
    tsht.getRange("A1").offset(0,0, mat.length, cols).setValues(mat);

    // format copy
    for(let i = 3; i <= tsht.getDataRange().getNumRows(); i++) {
        tsht.getRange(i-2,1,1,cols).copyFormatToRange(tsht, 1, cols, i, i);
        tsht.setRowHeight(i, tsht.getRowHeight(i-2));
    }
}