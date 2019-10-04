import { Handler, Context, Callback } from 'aws-lambda';
import { TableGenerator } from './src/classes/tableGenerator';
import { TableObject } from './src/classes/tableObject';

const meta = `<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`;

const button = `<button 
	id="displayBtn"
	onclick="toggleTable()"
	></button>`;

const script = `
	<script>

		// Initial table to render
		let tableToDisplay = 'Short Description';

		// Table holders
		let sdTable;
		let isTable;

		const updateButtonText = (displayName) => {

			// Add text to the button
			const btn = document.getElementById('displayBtn');
			btn.innerHTML = displayName;
		}

		document.addEventListener('DOMContentLoaded', () => { 
			updateButtonText('Show Missing Images'); 

			const container = document.getElementById('tableContainer');
			sdTable = document.getElementById('shortDescription');
			isTable = document.getElementById('imageSecret');

			container.removeChild(isTable);
		}, false);

		// Handle button click
		const toggleTable = () => {

			let newDisplayName;
			const currentDisplayName =  document.getElementById('displayBtn').innerHTML;
			const container = document.getElementById('tableContainer');

			console.log(sdTable);
			console.log(isTable);

			if (currentDisplayName === 'Show Missing Images') {
				newDisplayName = 'Show Short Descriptions';
				container.removeChild(sdTable);
				container.appendChild(isTable);
			}

			if (currentDisplayName === 'Show Short Descriptions') {
				newDisplayName = 'Show Missing Images';
				container.removeChild(isTable);
				container.appendChild(sdTable);
			}

			updateButtonText(newDisplayName);
		}

		
	</script>`;


export const renderHTML = async (event: any, context: Context, callback: Callback) => {

	const shortDescriptionObject = new TableObject('shortDescription', 'Short Descriptions');
	const imageSecretsObject = new TableObject('imageSecret', 'Image Secrets');

	const sdTable = await new TableGenerator(shortDescriptionObject).generate();
	const isTable = await new TableGenerator(imageSecretsObject).generate();


	const body = `<html>` + 
	script + 
	meta + 
	button + 
	`<div id="tableContainer">
	${sdTable}
	${isTable}
	</div>
	` +
	`</html>`;

	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/html; charset=utf-8' },
		body,
	};

	// Use this code if you don't use the http event with the LAMBDA-PROXY integration
	// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}






