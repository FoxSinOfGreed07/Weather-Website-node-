const request = require('request');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');

const app = express();

const port = process.env.PORT || 5050;

// Setup Handlebars engine, set views and partials location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'../Templates/views'));
hbs.registerPartials(path.join(__dirname,'../Templates/partials'));

// Serve static directory 
app.use(express.static(path.join(__dirname,'../Public')));

app.get('',(req, res) =>{
    res.render('index',{
        heading : 'Weather App',
        para : 'Ikuzo!!',
        name : 'FSOG'
    });
})
app.get('/help',(req, res) =>{
    res.render('help',{
        heading : 'Help la!',
        name : 'FSOG'
    })
})
app.get('/about',(req, res) =>{
    res.render('about',{
        heading : 'About Fox',
        name : 'FSOG'
    })
})
app.get('/weatherApp',(req, res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please enter the address!'
        })
    }
    const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(req.query.address) + '&appid=a0b30569215de879009ce297750181f2&units=metric';
    
    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red.inverse('Unable to connect to Weather Service!'));
            console.log(chalk.red(error));
            res.send({
                error : 'Unable to connect to Weather Service!'
            })
        }
        else if (response.body.cod == 404) {
            console.log(chalk.red.inverse('Unable to access Location!'));
            console.log(chalk.red(error));
            res.send({
                error : 'Unable to access Location!'
            })
        }
        else {

            res.send({
                location: response.body.name,
                temperature: response.body.main.temp,
                humidity: response.body.main.humidity
            })
        }
    })

})

app.get('/help/*',(req, res) =>{
    res.render('404',{
        heading : 'Error 404 Not Found',
        errorMessage : 'Help article not found',
        name : 'FSOG'
    })
})

app.get('*',(req, res) =>{
    res.render('404',{
        heading : 'Error 404 Not Found',
        errorMessage : 'Cannot find page',
        name : 'FSOG'
    })
})

 app.listen(port,() =>{
     console.log('Server up on port ' + port);
 });
