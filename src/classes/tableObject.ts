import { shortDescriptionsQuery, imageSecretsQuery } from '../constants/queries';

export type IdOptions = 'shortDescription' | 'imageSecret';

export class TableObject {

	id: string; 
	displayName: string;
	query: any;
	headerColumns: string[];

	constructor(id: IdOptions, displayName: string) {
		this.id = id;
		this.displayName = displayName;

		if (id === 'shortDescription') {
			this.query = shortDescriptionsQuery;
			this.headerColumns = ['Invno #', 'Short Description'];
		}

		if (id === 'imageSecret') {
			this.query = imageSecretsQuery;
			this.headerColumns = ['Invno #', 'Assigned Image'];
		}
	}
}