import { Handler, Context, Callback } from 'aws-lambda';
import { TableGenerator } from './src/classes/tableGenerator';
import { TableObject } from './src/classes/tableObject';

const meta = `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`;

const button = `<button 
	id="displayBtn"
	onclick="onButtonClick()"
	></button>`;

	const script = `
	<script>
		// Initial table to render
		let tableToDisplay = 'Short Description';

		document.addEventListener('DOMContentLoaded', () => {

			// Add text to the button
			const btn = document.getElementById('displayBtn');
			btn.innerHTML = tableToDisplay;

		}, false);

		// Handle button click
		const onButtonClick = () => {
			console.log('Hi from the button');
		}
	</script>`;


export const renderHTML = async (event: any, context: Context, callback: Callback) => {

	const shortDescriptionObject = new TableObject('shortDescription', 'Short Descriptions');
	const imageSecretsObject = new TableObject('imageSecret', 'Image Secrets');

	const sdTable = await new TableGenerator(shortDescriptionObject).generate();
	const isTable = await new TableGenerator(imageSecretsObject).generate();
	

	const body = `<html>` + script + meta + button + sdTable + isTable + `</html>`;

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
		body,
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}






