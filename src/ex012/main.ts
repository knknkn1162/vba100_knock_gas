function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const rngs = sht.getDataRange().getMergedRanges();
    for(const r of rngs) {
        const val = r.getValue();
        r.breakApart();
        const unit = Math.floor(val / r.getNumRows());
        r.setValue(unit);
        // assume that merged cells are n * 1 size
        if(val % r.getNumRows() != 0) {
            r.offset(0, 0, val % r.getNumRows(), 1).setValue(unit + 1);
        }
    }
}