export const shortDescriptionsQuery = {
	"_source": ["invno", "id", "shortDescription"],
	"size": 4000,
	"sort": [
		{
			"id": {
				"order": "asc"
			}
		}
	],
	"query": {
		"bool": {
			"must": {
				"exists": {
					"field": "shortDescription"
				}
			}
		}
	}
}

export const imageSecretsQuery = {
	"_source": ["invno", "id"],
	"size": 4000,
	"sort": [
		{
			"id": {
				"order": "asc"
			}
		}
	],
	"query": {
		"bool": {
			"must_not": {
				"exists": {
					"field": "imageSecret"
				}
			}
		}
	}
}