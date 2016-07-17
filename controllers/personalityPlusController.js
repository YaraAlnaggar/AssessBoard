var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var bodyParser = require('body-parser');
var personalityPlus = require('../models/personalityPlusModel');

exports.addpersonalityPlusResult=function (req,res,next) {
  // body...
   var body = req.body
   console.log(body)
  new personalityPlus(body).save()
    .then(function(user) {
        res.send("success");
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'cant create new entery' });
      }
    });
}

exports.showAllpersonalityPlusResults=function (req,res,next) {
  // body...
  new personalityPlus().fetchAll()
    .then(function(allGrades) {
        res.json(allGrades);
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'cant get the data' });
      }
    });


}

exports.showpersonalityPlusBytoken=function (req,res,next) {
  // body...
  new personalityPlus({token:req.body.token}).fetch()
    .then(function(Results) {
        res.json(Results);
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'cant get the data' });
      }
    });
    }


