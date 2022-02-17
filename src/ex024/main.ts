function conv(str: string): string {
    return str.replaceAll(/[Ａ-Ｚａ-ｚ０-９]/g,
        s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
            .toUpperCase()
    );
}

function main(): void {
    const sht = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const rng = sht.getRange("A1");
    const str = conv(rng.getValue());
    rng.offset(0,1).setValue(str);
}