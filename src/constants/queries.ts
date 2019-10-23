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
	"_source": [
		"invno",
		"id",
		"imageSecret",
		"ensembleIndex"
	],
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
			"must_not": [
				{
					"exists": {
						"field": "imageSecret"
					}
				},
				{
					"term": {
						"ensembleIndex": ""
					}
				}
			]
		}
	}
}

export const provenanceQuery = {
	"_source": ["invno", "id", "provenance"],
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
					"field": "provenance"
				}
			}
		}
	}
}

export const exhibitionHistoryQuery = {
	"_source": ["invno", "id", "exhibitionHistory"],
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
					"field": "exhibitionHistory"
				}
			}
		}
	}
}