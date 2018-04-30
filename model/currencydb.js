var request = require('request');
var baseURL = 'http://data.fixer.io/api/latest';

var APIKEY = process.env.FIXER_API;

function currencyRequest(base, to, callback) {

    // Wait for callback
    process.nextTick(function() {
        // Include API key in parameters
        queryParam = { 'access_key': APIKEY, 'base': base, 'symbols': to };

        // Request module will request data
        request({ uri: baseURL, qs: queryParam }, function(error, fixer_response, body) {

            if (!error && fixer_response.statusCode == 200) {
                console.log("FIXER RESPONSE: \n" + JSON.stringify(body));
                var fixerJSON = JSON.parse(body); // Convert to js object
                callback(null, fixerJSON);
            } else {
                // Log errors
                console.log("Error in request: " + error);
                console.log(fixer_response);
                callback(Error("Error fetching data"));
            }
        });
    });
}

module.exports = currencyRequest;
