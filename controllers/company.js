var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var company = require('../models/companyProfilesModel');
var User = require('../models/User');
var uuid = require('node-uuid');



exports.addCompany = function(req, res) {

    console.log(req.tokenObject);

    if (req.tokenObject.level < 3500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    //new comanpany
    new company({
        CompanyName: req.body.CompanyName,
        CompanyUniqueToken: uuid.v1()
    }).save().then(function(company) {
        res.json(company);
    });

};
exports.getAllCompaines=function(req,res){
  if (req.tokenObject.level < 3500) return res.status(401).json({
      msg: "you don't have the authority to do this action"
  });
  new company().fetchAll().then(function(AlLcompanies){
    if(AlLcompanies.length>=1){
      return res.json(AlLcompanies);
    }
  }).catch(function(error){
    console.log(error);
    return res.status(500).send();
  });
};
exports.resetCompanyID = function(req, res) {
    if (req.tokenObject.email < 2500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    new User({
        PersonalEmail: req.tokenObject.email
    }).fetch().then(function(targtedUser) {
        new company({
            id: targtedUser.attributes.companyProfiles_id
        }).save({
            CompanyUniqueToken: uuid.v1()
        }).then(function(newCompanyObject) {
            if (newCompanyObject === null) return res.status(500).send();
            return res.send(newCompanyObject.attributes.CompanyUniqueToken);
        }).catch(function(error) {
            console.log(error);
            return res.status(500).send();
        }).catch(function(error) {
            console.log(error);
            return res.status(500).send();
        });
    });

};
