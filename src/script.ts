


export const script = 
`<script>
// Table that is displayed
let tableToDisplay;

// Table holders
let sdTable;
let isTable;
let pTable;
let ehTable;

// Container holder
let container;

/** Once the page has loaded */
const onLoad = () => {

	// Get the container
	container = document.getElementById('tableContainer');

	// Hook up the tables
	sdTable = document.getElementById('shortDescription');
	isTable = document.getElementById('imageSecret');
	pTable = document.getElementById('provenance');
	ehTable = document.getElementById('exhibitionHistory');

	// Initial table to display
	updateDisplayedTable('shortDescription');
}

/** Updates the table presently displayed */
const updateDisplayedTable = (id) => {

	tableToDisplay = id;
	const children = container.children;
	const childrenToRemove = [];

	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		childrenToRemove.push(child);
	}

	// Remove the childs
	childrenToRemove.forEach((child) => { 
		container.removeChild(child); 
	});

	// Append the appropriate one based on the button
	switch (id) {
		case 'shortDescription':
			container.appendChild(sdTable);
			break;

		case 'imageSecret':
			container.appendChild(isTable);
			break;

		case 'provenance':
			container.appendChild(pTable);
			break;

		case 'exhibitionHistory':
			container.appendChild(ehTable);
			break;

		default:
			null;
	}
}

window.addEventListener('DOMContentLoaded', onLoad);

</script>`