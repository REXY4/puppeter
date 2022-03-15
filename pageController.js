const pageOne = require('./pageOne');
const pageTwo = require('./pageTwo');

async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		await pageOne.scraper(browser);	
        await pageTwo.scraper(browser);
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)