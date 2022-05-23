const sampleForwardGeocodingData = {
	"type": "FeatureCollection",
	"query": [
		"lucena"
	],
	"features": [
		{
			"id": "place.10390842970781390",
			"type": "Feature",
			"place_type": [
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q104125"
			},
			"text": "Lucena City",
			"place_name": "Lucena City, Lucena, Philippines",
			"bbox": [
				121.554389954,
				13.888119698,
				121.69127655,
				13.993009567
			],
			"center": [
				121.61667,
				13.93333
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61667,
					13.93333
				]
			},
			"context": [
				{
					"id": "region.3876247477942150",
					"wikidata": "Q104125",
					"text": "Lucena"
				},
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "place.8541310316942150",
			"type": "Feature",
			"place_type": [
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q504598"
			},
			"text": "Lucena",
			"place_name": "Lucena, Córdoba, Spain",
			"bbox": [
				-4.68407,
				37.246703,
				-4.417005,
				37.463613
			],
			"center": [
				-4.486013,
				37.409133
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					-4.486013,
					37.409133
				]
			},
			"context": [
				{
					"id": "region.13249342866786980",
					"short_code": "ES-CO",
					"wikidata": "Q81972",
					"text": "Córdoba"
				},
				{
					"id": "country.12507185778570100",
					"wikidata": "Q29",
					"short_code": "es",
					"text": "Spain"
				}
			]
		},
		{
			"id": "place.3876247477942150",
			"type": "Feature",
			"place_type": [
				"region",
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q104125"
			},
			"text": "Lucena",
			"place_name": "Lucena, Philippines",
			"bbox": [
				121.554695081815,
				13.8902307476349,
				121.693242890144,
				13.9901137444917
			],
			"center": [
				121.61667,
				13.93333
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61667,
					13.93333
				]
			},
			"context": [
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "poi.678604923510",
			"type": "Feature",
			"place_type": [
				"poi"
			],
			"relevance": 1,
			"properties": {
				"foursquare": "4d55d2a4b4deb1f7d327097a",
				"landmark": true,
				"address": "Av. Ermano Marchetti, 1058",
				"category": "bar, pub, alcohol, liquor, beer"
			},
			"text": "Lucena Bar",
			"place_name": "Lucena Bar, Av. Ermano Marchetti, 1058, São Paulo, São Paulo 05038, Brazil",
			"center": [
				-46.702303,
				-23.513742
			],
			"geometry": {
				"coordinates": [
					-46.702303,
					-23.513742
				],
				"type": "Point"
			},
			"context": [
				{
					"id": "postcode.9905128036916520",
					"text": "05038"
				},
				{
					"id": "locality.11169248980519870",
					"text": "Lapa"
				},
				{
					"id": "place.9128493891838220",
					"wikidata": "Q174",
					"text": "São Paulo"
				},
				{
					"id": "region.7229470134838220",
					"short_code": "BR-SP",
					"wikidata": "Q175",
					"text": "São Paulo"
				},
				{
					"id": "country.16552743596682710",
					"wikidata": "Q155",
					"short_code": "br",
					"text": "Brazil"
				}
			]
		},
		{
			"id": "place.4634145201942150",
			"type": "Feature",
			"place_type": [
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q2078997"
			},
			"text": "Lucena",
			"place_name": "Lucena, Paraíba, Brazil",
			"bbox": [
				-34.989144993,
				-6.979385199,
				-34.855001348,
				-6.86516472
			],
			"center": [
				-34.9027,
				-6.9246
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					-34.9027,
					-6.9246
				]
			},
			"context": [
				{
					"id": "region.6706177242583180",
					"short_code": "BR-PB",
					"wikidata": "Q38088",
					"text": "Paraíba"
				},
				{
					"id": "country.16552743596682710",
					"wikidata": "Q155",
					"short_code": "br",
					"text": "Brazil"
				}
			]
		}
	],
	"attribution": "NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
}

const sampleReverseGeocodingData = {
	"type": "FeatureCollection",
	"query": [
		121.616,
		13.933
	],
	"features": [
		{
			"id": "poi.249108205125",
			"type": "Feature",
			"place_type": [
				"poi"
			],
			"relevance": 1,
			"properties": {
				"foursquare": "51c23c22498ef4357a5ff148",
				"landmark": true,
				"category": "breakfast spot"
			},
			"text": "Lucena Golden City Cafe & Restaurant",
			"place_name": "Lucena Golden City Cafe & Restaurant, Lucena City, Lucena 4301, Philippines",
			"center": [
				121.614334,
				13.932684
			],
			"geometry": {
				"coordinates": [
					121.614334,
					13.932684
				],
				"type": "Point"
			},
			"context": [
				{
					"id": "postcode.14800680231286410",
					"text": "4301"
				},
				{
					"id": "locality.7099783523803130",
					"text": "Barangay 9"
				},
				{
					"id": "place.10390842970781390",
					"wikidata": "Q104125",
					"text": "Lucena City"
				},
				{
					"id": "region.3876247477942150",
					"wikidata": "Q104125",
					"text": "Lucena"
				},
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "postcode.14800680231286410",
			"type": "Feature",
			"place_type": [
				"postcode"
			],
			"relevance": 1,
			"properties": {},
			"text": "4301",
			"place_name": "4301, Lucena City, Lucena, Philippines",
			"bbox": [
				121.554696,
				13.890118,
				121.693309,
				13.990113
			],
			"center": [
				121.61,
				13.94
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61,
					13.94
				]
			},
			"context": [
				{
					"id": "locality.7099783523803130",
					"text": "Barangay 9"
				},
				{
					"id": "place.10390842970781390",
					"wikidata": "Q104125",
					"text": "Lucena City"
				},
				{
					"id": "region.3876247477942150",
					"wikidata": "Q104125",
					"text": "Lucena"
				},
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "locality.7099783523803130",
			"type": "Feature",
			"place_type": [
				"locality"
			],
			"relevance": 1,
			"properties": {},
			"text": "Barangay 9",
			"place_name": "Barangay 9, Lucena City, Lucena, Philippines",
			"bbox": [
				121.611846924,
				13.931400299,
				121.619743347,
				13.935540199
			],
			"center": [
				121.61565,
				13.93319
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61565,
					13.93319
				]
			},
			"context": [
				{
					"id": "place.10390842970781390",
					"wikidata": "Q104125",
					"text": "Lucena City"
				},
				{
					"id": "region.3876247477942150",
					"wikidata": "Q104125",
					"text": "Lucena"
				},
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "place.10390842970781390",
			"type": "Feature",
			"place_type": [
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q104125"
			},
			"text": "Lucena City",
			"place_name": "Lucena City, Lucena, Philippines",
			"bbox": [
				121.554389954,
				13.888119698,
				121.69127655,
				13.993009567
			],
			"center": [
				121.61667,
				13.93333
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61667,
					13.93333
				]
			},
			"context": [
				{
					"id": "region.3876247477942150",
					"wikidata": "Q104125",
					"text": "Lucena"
				},
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "region.3876247477942150",
			"type": "Feature",
			"place_type": [
				"region",
				"place"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q104125"
			},
			"text": "Lucena",
			"place_name": "Lucena, Philippines",
			"bbox": [
				121.554695081815,
				13.8902307476349,
				121.693242890144,
				13.9901137444917
			],
			"center": [
				121.61667,
				13.93333
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					121.61667,
					13.93333
				]
			},
			"context": [
				{
					"id": "country.14303315890213680",
					"wikidata": "Q928",
					"short_code": "ph",
					"text": "Philippines"
				}
			]
		},
		{
			"id": "country.14303315890213680",
			"type": "Feature",
			"place_type": [
				"country"
			],
			"relevance": 1,
			"properties": {
				"wikidata": "Q928",
				"short_code": "ph"
			},
			"text": "Philippines",
			"place_name": "Philippines",
			"bbox": [
				116.8295833,
				4.4898406,
				126.7047199,
				21.2117484
			],
			"center": [
				120.98177916,
				14.58678841
			],
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.98177916,
					14.58678841
				]
			}
		}
	],
	"attribution": "NOTICE: © 2022 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
}

export type ForwardGeocodingData = typeof sampleForwardGeocodingData
export type ReverseGeocodingData = typeof sampleReverseGeocodingData