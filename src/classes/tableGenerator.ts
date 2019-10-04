import { TableObject } from './tableObject';
import { elasticClient } from './elasticClient';


export class TableGenerator {

	tb: TableObject;

	constructor(tb: TableObject) {
		this.tb = tb;
	}

	generate = async (): Promise<string> => {
		const records = await this.retrieveTableRecords();

		const generatedHTMLTable = this.generateHTMLTable(records);
		const generatedSubtitle = this.generateSubtitle(records);
		const generatedTitle = this.generateTitle();

		const html = `<div id="${this.tb.id}">` + generatedTitle + generatedSubtitle + generatedHTMLTable + `</div>`;

		return html;
	}

	/** Returns the records used to populate the table */
	private retrieveTableRecords = async (): Promise<any[]> => {
		const { query: body, id } = this.tb;

		const result = await elasticClient.search({
			index: 'collection',
			body
		});

		// Extract the records payload
		const { hits }: { hits: any[] } = result.body.hits;
		let filteredResults;

		if (id === 'shortDescription') {
			filteredResults = hits.reduce(this.filterForShortDescriptions, []);
		}

		if (id === 'imageSecret') {
			filteredResults = hits.reduce(this.filterForImageSecrets, []);
		}

		return filteredResults;
	}

	private filterForShortDescriptions = (list: any[], current): any[] => {
		if (!(current._source.shortDescription.length == 0)) {
			list.push(current._source);
		}

		return list;
	}

	private filterForImageSecrets = (list: any[], current): any[] => {
		list.push(current._source);

		return list;
	}


	/** Generates the HTML table using the records list */
	private generateHTMLTable = (records: any[]): string => {

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

		const tableHeader = `<table style=${tableStyle}><tr><th style=${thStyle}>${this.tb.headerColumns[0]}</th><th style=${thStyle}>${this.tb.headerColumns[1]}</th></tr>`;
		const tableCloser = `</table>`;
		let tableBody = ``;

		// Add new row containing the invno and short description for each record
		records.forEach((record, index) => {

			const { invno } = record;

			let tdData = record[this.tb.id];
			tdData = (this.tb.id === 'shortDescription') ? this.escapeHTML(tdData) : 'None';

			let trStyle = ``
			trStyle += (index % 2 == 0) ? 'background-color: #f2f2f2;;' : 'background-color: #ffffff';

			tableBody += `<tr style="${trStyle}"><td style=${tdStyle}>${invno}</td><td style=${tdStyle}>${tdData}</td></tr>`;
		});

		const generatedHTMLTable = tableHeader + tableBody + tableCloser;

		return generatedHTMLTable;
	}

	/** Escapes HTML in the provided string */
	private escapeHTML = (htmlString: string): string => {
		return htmlString.replace(/[&<>"]/g, (tag) => {
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

	/** Generates the subtitle for the table */
	private generateSubtitle(records: any[]): string {

		let subtitle: string;
		const subtitleStyle=`font-family: Calibre,sans-serif;`;

		if (this.tb.id === 'shortDescription') {
			subtitle = `<p style="${subtitleStyle}">Total records that have a short description: ${records.length}</p>`;
		}

		if (this.tb.id === 'imageSecret') {
			subtitle = `<p style="${subtitleStyle}">Total records that do not have an associated image: ${records.length}</p>`;
		}

		return subtitle;
	}

	/** Generates the subtitle for the table */
	private generateTitle(): string {

		let title: string;
		const titleStyle=`font-family: Calibre,sans-serif;`;

		if (this.tb.id === 'shortDescription') {
			title = `<h3 style="${titleStyle}">Short Descriptions Table</h3>`;
		}

		if (this.tb.id === 'imageSecret') {
			title = `<h3 style="${titleStyle}">Missing Images Table</h3>`;;
		}

		return title;
	}
}

