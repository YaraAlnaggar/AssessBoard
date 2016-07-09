var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var bodyParser = require('body-parser');
var Grade = require('../models/Grades');

exports.addGrade=function (req,res,next) {
  // body...
   var body = req.body

  new Grade(body).save()
    .then(function(user) {
        res.send("success");
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'cant create new entery' });
      }
    });
}

