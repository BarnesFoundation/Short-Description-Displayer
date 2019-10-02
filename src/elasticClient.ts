import { Client } from '@elastic/elasticsearch';
import { Config } from './config';

const { esCloudId: id, esUser: username, esPassword: password, esPort } = Config;

// Setup the client
export const elasticClient = new Client({
	cloud: {
		id,
		username,
		password
	}
});