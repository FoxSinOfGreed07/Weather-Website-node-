const request = require('request');
const chalk = require('chalk');

const weatherReq = (CITY) => {

    const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(CITY) + '&appid=a0b30569215de879009ce297750181f2&units=metric';
    
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red.inverse('Unable to connect to Weather Service!'));
            console.log(chalk.red(error));
        }
        else if (response.body.cod == 404) {
            console.log(chalk.red.inverse('Unable to access Location!'));
            console.log(chalk.red(response));
        }
        else {

            var ob = ({
                location: response.body.name,
                temperature: response.body.main.temp,
                humidity: response.body.main.humidity
            })
            return ob
        }
    })

}

module.exports = weatherReq;