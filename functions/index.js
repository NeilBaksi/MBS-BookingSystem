const functions = require("firebase-functions");
const rp = require("request-promise-native");
const cors = require("cors")({
	origin: true
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getDistance = functions.https.onRequest((request, response) => {
	cors(request, response, () => {});
	var destination = request.query.dest;
	var options = {
		uri:
			"https://maps.googleapis.com/maps/api/distancematrix/json?origins=%225%20Baywater%20Dr,%20Wentworth%20Point%20NSW%202127,%20Australia%22&destinations=" +
			destination +
			"&key=AIzaSyBhVWygAuZE8hyaosyAHDXWJ-RrlfJakak",
		method: "GET"
	};
	rp(options)
		.then(res => {
			console.log(res);
			return response.send(res);
		})
		.catch(console.error);
	return;
});
