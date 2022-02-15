function main(): void {
    const sht = SpreadsheetApp.getActiveSheet();
    const pat = "\r?\n";
    const tf = sht.createTextFinder(pat).useRegularExpression(true)
    for(const r of tf.findAll()) {
        Logger.log(r.getA1Notation())
        const nstr = String(r.getValue()).split(new RegExp(pat))
            .filter(val => val !== "")
            .join("\n")
        r.setValue(nstr);
    }
}