import { shortDescriptionsQuery, imageSecretsQuery, provenanceQuery, exhibitionHistoryQuery } from '../constants/queries';

export interface TableObjectInterface {
	id: string,
	title: string,
	subTitle: (recordsNumber) => string,
	headerColumns: string[],
	columns: string[],
	query: any
}

export const tableObjects: { [key:string]: TableObjectInterface } = {

	'shortDescription' : {
		id: 'shortDescription',
		title: 'Short Descriptions Table',
		subTitle: (recordsNumber) => { return `Total records that have a short description: ${recordsNumber}`; },
		headerColumns: ['Invno #', 'Short Description'],
		columns: ['invno', 'shortDescription'],
		query: shortDescriptionsQuery
	},

	'imageSecret' : {
		id: 'imageSecret',
		title: 'Missing Images Table',
		subTitle: (recordsNumber) => { return `Total records that do not have an associated image: ${recordsNumber}. Any records that have no image and no ensemble index have been filtered out from this table`; },
		headerColumns: ['Invno #', 'Ensemble Index'],
		columns: ['invno', 'ensembleIndex'],
		query: imageSecretsQuery
	},

	'provenance': {
		id: 'provenance',
		title: 'Provenance Table',
		subTitle: (recordsNumber) => { return `Total records: ${recordsNumber}`; },
		headerColumns: ['Invno #', 'Associated Provenance Text'],
		columns: ['invno', 'provenance'],
		query: provenanceQuery
	},

	'exhibitionHistory': {
		id: 'exhibitionHistory',
		title: 'Exhibition History Table',
		subTitle: (recordsNumber) => { return `Total records: ${recordsNumber}`; },
		headerColumns: ['Invno #', 'Associated Exhibition History Text'],
		columns: ['invno', 'exhibitionHistory'],
		query: exhibitionHistoryQuery
	}
}