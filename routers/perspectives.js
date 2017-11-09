var express = require('express');
var thought_catcher = express();


thought_catcher
    .get('/loading-transition',function(req, res, next) {

        res.render('presentation', { title: 'Loading Transition Example' });
    }).get('/thought-catcher',function(req, res, next) {

        res.render('thought_catcher', { title: 'Thought Catcher Example' });
    }).get('/list-display',function(req, res, next) {

        res.render('list_display', { title: 'List Display Example' });
    }).get('/portcullis',function(req, res, next) {

    res.render('portcullis', { title: 'Portcullis Example' });
});

module.exports = thought_catcher;
