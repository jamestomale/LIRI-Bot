var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
require('dotenv').config()

 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});




var spotify = new Spotify(
  id="",
  secret="",
);
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

  request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})


switch (action){
  case "my-tweets":
  showLastTweets();
  logAction();
  break;

  case "spotify-this-song":
  spotifyThisSong();
  logAction();
  break;

  case "movie-this":
  movieThis();
  logAction();
  break;

  case "do-what-it-says":
  doThis();
  logAction();
  break;
  
function showLastTweets(){

var params = {screen_name: 'ScreenName4rcb1', count: 10, exclude_replies:true, trim_user:true};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        //console.log(tweets);
        tweetsArray = tweets;

        for(i=0; i<tweetsArray.length; i++){
          console.log("Created at: " + tweetsArray[i].created_at);
          console.log("Text: " + tweetsArray[i].text);
          console.log('--------------------------------------');
        }
      }
      else{
        console.log(error);
      }
});

}

function spotifyThisSong(song){

//If user has not specified a song , default to "The Sign" by ace of base
if(song === ""){
  song = "The Sign";
}

spotify.search({ type: 'track', query: song}, function(err, data) {
  if (err) {
      console.log('Error occurred: ' + err);
      return;
  }

  var song = data.tracks.items[0];
  console.log("Artist(s)");
  for(i=0; i<song.artists.length; i++){
    console.log(song.artists[i].name);
  }

  console.log("The Song's Name");
  console.log(song.name);

console.log("Preview Link");
  console.log(song.preview_url);

  console.log("Album");
  console.log(song.album.name);

});

}

function movieThis(movieName){

console.log(movieName);

request("https://api.themoviedb.org/3/search/movie?api_key=" + tmdbKey + "&query=" + movieName, function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    //console.log(JSON.parse(body));
    
    //Get the Movie ID
    var movieID =  JSON.parse(body).results[0].id;
    //console.log(movieID);

    //Create new query using the movie ID
    var queryURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + tmdbKey + "&append_to_response=credits,releases";

    request(queryURL, function(error, response, body) {
      var movieObj = JSON.parse(body);

      console.log("Title");
      console.log(movieObj.original_title);

      console.log("Year");
      console.log(movieObj.release_date.substring(0,4));

       console.log("Rating");
       console.log(movieObj.releases.countries[0].certification);

       console.log("Country Produced");
       for(i=0, j = movieObj.production_countries.length; i<j; i++){
         console.log(movieObj.production_countries[i].name);
       }
       console.log("Languages");
       for(i=0, j = movieObj.spoken_languages.length; i<j; i++){
         console.log(movieObj.spoken_languages[i].name);
       }
       console.log("Plot");
       console.log(movieObj.overview);

       console.log("Actors");
       for(i=0, j = movieObj.credits.cast.length; i<j; i++){
         console.log(movieObj.credits.cast[i].name);
       }
      
    });


  }else{
    console.log(error);
//output data to .txt file
  }})}}