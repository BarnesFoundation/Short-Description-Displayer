import { Handler, Context, Callback } from 'aws-lambda';
import { elasticClient } from './src/elasticClient';

export const renderHTML = async (event: any, context: Context, callback: Callback) => {

	const records = await retrieveRecords();
	const generatedHTMLTable = generateHTMLTable(records);
	const title = `<p style="font-family: Calibre,sans-serif;">Total records that have a short description: ${records.length}</p>`;
	const html = title + generatedHTMLTable;

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'text/html'
		},
		body: html,
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}


/** Returns the records from Elastic Search that have a short description */
const retrieveRecords = async (): Promise<any[]> => {

	const result = await elasticClient.search({
		index: 'collection',
		body: {
			"_source": ["invno", "id", "shortDescription"],
			"size": 4000,
			"sort": [
				{
					"id": {
						"order": "asc"
					}
				}
			],
			"query": {
				"bool": {
					"must": {
						"exists": {
							"field": "shortDescription"
						}
					}
				}
			}
		}
	});

	// Extract the records payload
	const { hits }: { hits: any[] } = result.body.hits;

	// Filter for the records that have a short description
	const filteredResults = hits.reduce((list, current) => {
		if (!(current._source.shortDescription.length == 0)) {
			list.push(current._source);
		}

		return list;
	}, []);

	return filteredResults;
}

/** Generates the HTML table using the provided records list */
const generateHTMLTable = (records: any[]): string => {

	const tableStyle = `"
	border-collapse: collapse; 
	font-family: Calibre,sans-serif;
	width: 100%;
	"`;

	const thStyle = `"
	padding: 12px;
	text-align: left;
	background-color: #4CAF50;
	color: white;
	border: 1px solid #ddd;
	"`;

	const tdStyle = `"
		border: 1px solid #ddd;
		padding: 12px;
	 "`;

	const tableHeader = `<table style=${tableStyle}><tr><th style=${thStyle}>Invno #</th><th style=${thStyle}>Short Description</th></tr>`;
	const tableCloser = `</table>`;
	let tableBody = ``;

	// Add new row containing the invno and short description for each record
	records.forEach((record, index) => {
		const { invno, shortDescription } = record;

		let trStyle = ``

		trStyle += (index % 2 == 0) ? 'background-color: #f2f2f2;;' : 'background-color: #ffffff';

		tableBody += `<tr style="${trStyle}"><td style=${tdStyle}>${invno}</td><td style=${tdStyle}>${escapeHTML(shortDescription)}</td></tr>`;
	});

	const generatedHTML = tableHeader + tableBody + tableCloser;

	return generatedHTML;
}

const escapeHTML = (htmlString: string): string => {
    return htmlString.replace(/[&<>"]/g,(tag) => {
		const charsToReplace = {
            '&': "&amp;",
            '<': "&lt;",
			'>': "&gt;",
			'"': "&quot;",
			"'": "&#039;"
        };

		return charsToReplace[tag] || tag;
	});
}