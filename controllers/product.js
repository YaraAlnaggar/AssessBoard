var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var product = require('../models/productsDefineModel');
var nodemailer = require("nodemailer");
var uuid = require('node-uuid');

// var jwtDecode = require('jwt-decode');


var dotenv = require('dotenv');
dotenv.load();

exports.addproduct = function(req, res) {

    // var decodedAuthToken = jwt_decode(token);
    console.log(req.tokenObject);
    if (req.tokenObject.level < 3500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    //new comanpany
    new product({
        ServiceName: req.body.ServiceName,
        Price: req.body.Price,
    }).save().then(function(product) {
        res.json(product);
    }).catch(function(error){
      console.log(error);
      return res.status(400).send();
    });

};
