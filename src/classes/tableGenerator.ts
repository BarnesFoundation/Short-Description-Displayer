import { TableObjectInterface } from '../constants/tableObjects';
import { elasticClient } from './elasticClient';


export class TableGenerator {

	tb: TableObjectInterface;

	constructor(tb: TableObjectInterface) {
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

		switch (id) {

			case 'shortDescription':
				filteredResults = hits.reduce(this.filterForShortDescriptions, []);
				break;

			case 'imageSecret':
				filteredResults = hits.reduce(this.filterForImageSecrets, []);
				break;

			default:
				filteredResults = hits.reduce(this.filterForSource, []);
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

	private filterForSource = (list: any[], current): any[] => {
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

			switch (this.tb.id) {

				case 'shortDescription':
					tdData = this.escapeHTML(tdData);
					break;

				default:
					tdData = record['ensembleIndex'];
					break;
			}

			let trStyle = (index % 2 == 0) ? 'background-color: #f2f2f2;;' : 'background-color: #ffffff';

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

		const subtitleStyle = `font-family: Calibre,sans-serif;`;

		const text = this.tb.subTitle(records.length);
		const subtitle = `<p style="${subtitleStyle}">${text}</p>`;

		return subtitle;
	}

	/** Generates the subtitle for the table */
	private generateTitle(): string {

		const titleStyle = `font-family: Calibre,sans-serif;`;
		const title = `<h3 style="${titleStyle}">${this.tb.title}</h3>`;

		return title;
	}
}

