import { Handler, Context, Callback } from 'aws-lambda';

import { TableGenerator } from './src/classes/tableGenerator';
import { tableObjects } from './src/constants/tableObjects';
import { script } from './src/script';

const meta = `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`;

const imageSecretButton = `<button
	id="imageSecretButton"
	onclick="updateDisplayedTable('imageSecret')"
	>Show Missing Images</button>`;

const shortDescriptionButton = `<button
	id="shortDescriptionButton"
	onclick="updateDisplayedTable('shortDescription')"
	>Show Short Descriptions</button>`;

const provenanceButton = `<button
	id="provenanceButton"
	onclick="updateDisplayedTable('provenance')"
	>Show Provenances</button>`;

const exhibitionHistoryButton = `<button
	id="exhibitionHistoryButton"
	onclick="updateDisplayedTable('exhibitionHistory')"
	>Show Exhibition Histories</button>`;

const buttons = `<div>${shortDescriptionButton} ${imageSecretButton} ${provenanceButton} ${exhibitionHistoryButton}</div>`;


export const renderHTML = async (event: any, context: Context, callback: Callback) => {

	const { shortDescription, imageSecret, provenance, exhibitionHistory } = tableObjects;

	const sdTable = await new TableGenerator(shortDescription).generate();
	const isTable = await new TableGenerator(imageSecret).generate();
	const pTable = await new TableGenerator(provenance).generate();
	const ehTable = await new TableGenerator(exhibitionHistory).generate();

	const tableContainer = `<div id="tableContainer"> ${sdTable} ${isTable} ${pTable} ${ehTable} </div>`;

	const body = `<html>` +
		script +
		meta +
		buttons +
		tableContainer +
		`</html>`;

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
		body,
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}






