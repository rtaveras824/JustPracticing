//Your api-routes.js file should contain two routes:
//A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
//A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require('../data/friends.js');

module.exports = function(app) {
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	app.post('/api/friends', function(req, res){
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};
		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;
		var totalDifference = 0;

		//loop through scores of survery
		for (var i = 0; i < friends.length; i++){
			console.log(friends[i].name);
			totalDifference = 0;
			// loop throught to calculate difference
			for ( var j =0; j < 10; j++) {
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				if (totalDifference <= bestMatch.friendDifference){
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}	

		friends.push(userData);
		res.json(bestMatch);
	});
};