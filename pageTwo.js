
//const datas = / [(0-9)]/g.exec(' (354)').input;
const { arrayUnique } = require('./filterArray');
const XLSX = require('xlsx');



const scraperObject = {
	url: 'https://www.tokopedia.com/p/buku/arsitektur-desain/buku-desain-rumah?page=2',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
	   await page.goto(this.url);
      // const dataOne = await page.$$eval('[data-testId="lstCL3ProductList"] div .css-11s9vse', allAs => allAs.map(a=> a.textContent))
       const name = await page.$$eval('[data-testId="lstCL3ProductList"] div .css-11s9vse .css-1bjwylw', allAs => allAs.map(a=> a.textContent));
       const price = await page.$$eval('[data-testId="lstCL3ProductList"] div a .css-11s9vse  .css-4u82jy', allAs => allAs.map(a=> a.textContent));
       const seller = await page.$$eval('[data-testId="lstCL3ProductList"] div a .css-16vw0vn .css-11s9vse  .css-tpww51 .css-1kr22w3', allAs => allAs.map(a=> a.textContent));
       const data = [];
       for(let i = 0 ; i < name.length;i++){
            data[i] = {
               name :  name[i],
               price : price[i],
               'address/seller' : seller[i],
            }
       }
       const file = await XLSX.readFile('./dataProduk.xlsx')
       const sheets = file.Sheets[file.SheetNames];
       const ws_name = "Page 2";
       var wscols = [
         {
            wch:6, //characters
            wpx : 400 , //width
         },
         {
            wch : 6, //characters
            wpx: 192 //width
         }, 
         {
            wch : 6, //caracter
            wpx: 200 //
         },
         {hidden: true} // hide column
      ];
    const seetToJson = XLSX.utils.sheet_to_json(sheets);
      const ws1 = XLSX.utils.json_to_sheet(seetToJson);
       const ws2 = XLSX.utils.json_to_sheet(data);
       const wb = XLSX.utils.book_new();
       ws1['!cols'] = wscols;
       ws2['!cols'] = wscols;
      await XLSX.utils.book_append_sheet(wb ,  ws1,  'Page 1');
      await   XLSX.utils.book_append_sheet(wb ,  ws2,  ws_name);
      await  XLSX.writeFile(wb, 'dataProduk.xlsx');
	}
}
module.exports = scraperObject;