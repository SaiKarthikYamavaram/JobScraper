const { GoogleSpreadsheet } = require("google-spreadsheet");

class Sheet {
	constructor() {
		this.doc = new GoogleSpreadsheet(
			"1-QLBfLd2GmCQeSGtdn2ipoFJ-ZrcG2VBlcsi9yLJhss"
		);
	}
	async load() {
		await this.doc.useServiceAccountAuth(
			require("./dazzling-botany-290007-bb87dfea50ad.json")
		);

		await this.doc.loadInfo(); // loads document properties and worksheets
	}
	async addRows(rows) {
		const sheet = this.doc.sheetsByIndex[0];
		await sheet.addRows(rows);
	}
}

module.exports = Sheet;
// Test Code
// (async function () {
// 	const sheet = new Sheet();
// 	await sheet.load();
// 	await sheet.addRows([
// 		{
// 			title: "SDE",
// 			location: "Hyderabad",
// 		},
// 		{
// 			title: "Dessigner",
// 			location: "Bangalore",
// 		},
// 	]);
// })();
