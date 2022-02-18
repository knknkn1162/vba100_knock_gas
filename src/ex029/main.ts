import Blob = GoogleAppsScript.Base.Blob;
import Image = GoogleAppsScript.Spreadsheet.OverGridImage

function setCenter(img: Image, boxheight: number, boxwidth: number): void {
    const scale = Math.max(img.getHeight() / boxheight, img.getWidth() / boxwidth);
    Logger.log(`scale: ${scale}`);
    img.setHeight(Math.trunc(img.getHeight() / scale));
    img.setWidth(Math.trunc(img.getWidth() /scale));
    img.setAnchorCellXOffset((boxwidth - img.getWidth()) / 2);
    img.setAnchorCellYOffset((boxheight - img.getHeight()) / 2);
}

function main(): void {
    // sample: 1iYbl9ppBABlz5wZKzstOhxSE1p6gtHzp
    const str = Browser.inputBox("idを入力")
    const blob = DriveApp.getFileById(str).getBlob();
    const sht = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const rng = sht.getRange("B2");
    const img = sht.insertImage(blob, rng.getRow(),rng.getColumn());
    setCenter(img, sht.getRowHeight(rng.getRow()), sht.getColumnWidth(rng.getColumn());
}