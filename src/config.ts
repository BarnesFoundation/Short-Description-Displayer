import dotenv from 'dotenv';

dotenv.config();

export const Config = {
	esCloudId: process.env.ELASTICSEARCH_CLOUD_ID,
	esHost: process.env.ELASTICSEARCH_HOST,
	esUser: process.env.ELASTICSEARCH_USER,
	esPassword: process.env.ELASTICSEARCH_PASSWORD,
	esPort: process.env.ELASTICSEARCH_PORT
}