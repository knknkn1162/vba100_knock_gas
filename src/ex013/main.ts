import TextBuilder = GoogleAppsScript.Spreadsheet.RichTextValueBuilder;

function main(): void {
    const newText = (str: string): TextBuilder  => {
        return SpreadsheetApp.newRichTextValue().setText(str)
    }
    const setTextStyle = (builder: TextBuilder, pos: number, length: number): TextBuilder => {
        Logger.log(`${pos}, ${length}`)
        const style = SpreadsheetApp.newTextStyle()
            .setBold(true)
            .setForegroundColor("red")
            .build();
        return builder.setTextStyle(pos, pos + length, style);
    }
    const pat = "注意"
    const re = RegExp(pat, 'g');
    const sht = SpreadsheetApp.getActiveSheet();
    for(const rng of sht.createTextFinder(pat).findAll()) {
        const str: string = rng.getValue()
        const builder = Array.from(str.matchAll(re), m => m.index)
            .reduce((prev,val) => setTextStyle(prev, val, pat.length), newText(str))
        rng.setRichTextValue(builder.build())
    }
}