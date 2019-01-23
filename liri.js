
//---------require statements---------------------
require("dotenv").config();
//obtain spotify keys from local drive
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
//additional require statements
var axios = require("axios");
var fs = require("fs");
var spotify_object = new Spotify(keys.spotify);

//------------process.argv------------------------
var command = process.argv[2];
var askLiri = process.argv.slice(3).join(" ");


//-----switch statement to commands to Liri-------
switch (command) {

    case "concert-this":
        concertThis()
        break;

    case "spotify-this-song":
        spotifySong()
        break;

    case "movie-this":

        if (!askLiri) {
            askLiri = "Mr Nobody";
        }
        movieThis()
        break;

    case "do-what-it-says":
        dowhatever()
        break;
};

//--------FUNCTIONS TO CALL MOVIE API---------------------------------------------------

//function to call Movies 
function movieThis() {
    var URL = "http://www.omdbapi.com/?t=" + askLiri + "&y=&plot=short&apikey=trilogy"
    axios.get(URL).then(
        function (response) {

            var movieLog =
                "\n*******************( MOVIE DATABASE )*******************\n" +

                "\nMovie Name: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nCountry Produced: " + response.data.Country +
                "\nActors: " + response.data.Actors +
                "\nPlot of the Movie: " + response.data.Plot +
                "\nLanguage: " + response.data.Language +
                "\nInternet Movie Database Rating: " + response.data.Ratings[0].Value +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nMetacritic Rating: " + response.data.Ratings[2].Value +

                "\n******************( MOVIE DATABASE )*******************\n"
            console.log(movieLog);
            logToFile(movieLog);

        }
    )
};


//function to call Bands in town
function concertThis() {
    var URL = "https://rest.bandsintown.com/artists/" + askLiri + "/events?app_id=codingbootcamp";
    axios.get(URL).then(
        function (response) {
            var data = response.data[0]

            var concertLog =
                "\n*******************( BANDS IN TOWN )*******************\n" +

                "\nNAME OF VENUE: " + data.venue.name +
                "\nLOCATION: " + data.venue.city +
                "\nDATE: " + data.datetime +

                "\n*******************( BANDS IN TOWN )*******************\n"
            console.log(concertLog);
            logToFile(concertLog);



        }
    )


};

function logToFile(data) {
    fs.appendFile("some.txt", data, function(err) {
        if(err) {
            console.log("Some Error");
        } else {
            console.log("Content Added");
        }
    });
}

//function to call Spotify

function spotifySong() {

    spotify_object.search({ type: 'track', query: askLiri }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //   console.log(JSON.stringify(data,null,2)); 
        var spotifylog = 
            "\n*******************( SPOTIFY THIS )*******************\n" +
            "\nARTIST NAME :" + data.tracks.items[0].album.artists[0].name +
            "\nSONG PREVIEW :" + data.tracks.items[0].album.artists[0].external_urls.spotify +
            "\n*******************( SPOTIFY THIS )*******************\n"

        console.log(spotifylog) ;
        
        logToFile(spotifylog);
    });
}















