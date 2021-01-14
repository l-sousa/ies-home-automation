const express = require('express')
const bodyParser = require('body-parser');
var request = require('request');
const cookieParser = require('cookie-parser');
const app = express()
const path = require('path');
const port = 3000

var authenticated = false;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var staticPath = path.join(__dirname, '/static');
app.use(express.static(staticPath));

app.all('/', (req, res) => {
    res.sendFile(__dirname + '/templates/login.html');
});

app.get('/templates/monitor.html', function (req, res, next) {

    if (authenticated === true) {
        //user is already authenticated
        res.sendFile(__dirname + '/templates/monitor.html');
    } else {
        //redirect to login
        res.sendFile(__dirname + '/templates/login.html');
    }
});

app.post('/login', (req, res) => {
    // Insert Login Code Here
    console.log(req);
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + password)
    let myParams = { 'Name': username, 'Password': password };
    let data = new URLSearchParams(myParams).toString();
    request.post({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: 'http://localhost:8080/api/login',
        body: data
    }, function (err, response, body) {
        var cookie = req.cookies.cookieName;
        if (cookie === undefined) {
            // no: set a new cookie
            res.cookie('access_token', body, { maxAge: 900000, httpOnly: false });
            console.log('cookie created successfully');
        } else {
            // yes, cookie was already present 
            console.log('cookie exists', cookie);
        }
        authenticated = true;
        res.sendFile(__dirname + '/templates/monitor.html');
    })
});

app.get('/apidocs', (req, res) => {
    res.sendFile(__dirname + '/templates/apidoc.html');
})

app.post('/logout', (req, res) => {
    // Insert Login Code Here
    res.clearCookie('access_token')
    res.sendFile(__dirname + '/templates/login.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})