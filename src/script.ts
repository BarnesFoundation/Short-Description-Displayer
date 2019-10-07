


export const script = 
`<script>
// Initial table to render
let tableToDisplay;

// Table holders
let sdTable;
let isTable;
let pTable;
let ehTable;

// Container holder
let container;

/** Once the page has loaded */
window.onload = () => {

	container = document.getElementById('tableContainer');

	// Hook up the tables
	sdTable = document.getElementById('shortDescription');
	isTable = document.getElementById('imageSecret');
	pTable = document.getElementById('provenance');
	ehTable = document.getElementById('exhibitionHistory')

	container.removeChild(isTable);
	container.removeChild(pTable);
	container.removeChild(ehTable);

	// Initial table to display
	updateDisplayedTable('shortDescription');
}

const updateDisplayedTable = (id) => {

	tableToDisplay = id;

	const children = container.children;

	// Remove all tables from the container
	for (let i = 0; i < children.length; i++) {
		container.removeChild(children[i]);
	}

	// Set the appropriate one based on the button
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

</script>`