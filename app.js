const chalk = require('chalk');
const yargs = require('yargs');
const request = require('request');
const apiKeyOpenWeatherMap = 'c511db399def2cc952298d307a01abc8';
const apiKeyMapBox = 'pk.eyJ1IjoicGFyYXNhciIsImEiOiJjajc0dDNueWUweTZjMndwaWt3eTczNW55In0.Izs3Czy8CZvYezHnzgfy0g';

// // WEATHER DATA
// const url = `https://api.openweathermap.org/data/2.5/weather?q=Melbourne,australia&appid=${apiKeyOpenWeatherMap}&lang=Croatian&units=metric`;

// const weatherdata = request({url:url, json: true}, (error, response, body)=> {
//     // console.log('error:', error); // Print the error if one occurred
//     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     // console.log(chalk.green.blue('body:', body)); // Print the HTML for the Google homepage.

//     // const data = JSON.parse(response.body);
//     console.log(chalk.green.red(`${response.body.name} is currently ${response.body.main.temp}˚C. It humidity is ${response.body.main.humidity}`)); 
    
// });

////////////////////////////////////////
// MAPBOX - Custom search in mapbox
////////////////////////////////////////

// Query string
yargs.command({
    command: 'search',
    describe: 'Find lat & long',
    builder: {
        city: {
            describe: 'city name',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        // console.log('Add a new note', argv);
        // console.log(chalk.green.bold(`Title = ${argv.title}`));
        // console.log(chalk.blue(`Description = ${argv.description}`));
        
        const urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${argv.city}.json?access_token=${apiKeyMapBox}`;

        request ({url: urlMapBox, json: true}, (err, response, body)=>{
            console.log('Searching...',`${argv.city}\n` );
            console.log(chalk.red(`${response.body.features[0].place_name} is located at ${response.body.features[0].geometry.coordinates}`)); 
        });
    }
});

yargs.parse();


