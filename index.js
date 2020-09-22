const Sheet = require("./sheet");
const fetch = require("node-fetch");
// spreadsheet key is the long id in the sheets URL

async function scrapePage(i) {
	const res = await fetch(
		`https://jobs.github.com/positions.json?search=code&page=${i}`
	);
	const json = await res.json();
	// console.log(json);
	const rows = json.map((job) => {
		return {
			company: job.company,
			title: job.title,
			location: job.location,
			date: job.created_at,
			url: job.url,
		};
	});
	// console.log(rows.length);
	return rows;
}

(async function () {
	// OR load directly from json file if not in secure environment
	try {
		const sheet = new Sheet();
		await sheet.load();
		let k = [];
		var i = 0;
		do {
			// var i = 0;
			var rows = await scrapePage(i++);
			if (rows.length === 0) break;
			k = k.concat(rows);
		} while (true);

		k = k.filter((i) => i.location.includes("India"));
		console.log(k.length);

		await sheet.addRows(k);
	} catch (error) {
		console.log(error);
	}
})();
