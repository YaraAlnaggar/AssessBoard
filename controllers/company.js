var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var company = require('../models/companyProfilesModel');
var nodemailer = require("nodemailer");
var uuid = require('node-uuid');

// var jwtDecode = require('jwt-decode');


var dotenv = require('dotenv');
dotenv.load();

exports.addCompany=function(req,res){

  // var decodedAuthToken = jwt_decode(token);
  console.log(req.tokenObject);
  if(req.tokenObject.level < 3500) return res.status(401).json({msg:"you don't have the authority to do this action"});
  //new comanpany
   new company({
      CompanyName: req.body.CompanyName,
      CompanyUniqueToken:uuid.v1()
    }).save().then(function(company) {
        res.json(company);
    });

 };
