function main(): void {
    const sht = SpreadsheetApp.getActiveSheet()
    Logger.log(sht.getDataRange().getA1Notation());
    sht.getDataRange().offset(1,1).clearContent()
}