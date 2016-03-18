var express = require('express');
var fs = require('fs');
var pg = require('pg');
var validUrl = require('valid-url');

var app = express();
pg.defaults.ssl = true;

app.get('/', home);
app.get('/set/*', create);
app.get('/get/:id', use);

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port :{1}!'.replace('{1}', process.env.PORT));
});

// ====================================================

function home (req, res) {
    res.send(fs.readFileSync('home.html', 'utf8'));
}

function create (req, res) {
    var uri = req.url.replace('/set/', '');
    if (!validUrl.isUri(uri)){
        res.send({ "error": "Invalid URL provided!", "original_url": uri });
    } else {
        pg.connect(process.env.DATABASE_URL, function(err, client) {
            if (err) throw err;
            client.query("insert into urlminification (url) values ('{1}') returning id".replace('{1}', uri))
            .on('row', function(row) {
                res.send({ "original_url": uri, "short_url": "https://ob-url-shortener-microservice.herokuapp.com/get/" + row.id });
            });
        });
    }
}

function use (req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) throw err;
        client.query('select url from urlminification where id = {1}'.replace('{1}', req.params.id))
        .on('row', function(row) {
            res.redirect(row.url);
        });
    });
}
