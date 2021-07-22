module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,json,txt,png}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};