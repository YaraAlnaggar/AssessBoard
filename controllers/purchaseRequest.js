var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var purchase = require('../models/purchaseRequestsModel');
var company = require('../models/companyProfilesModel');
var qouta =require('../models/qoutasModel');
var User = require('../models/User');
var product =require('../models/productsDefineModel');


var nodemailer = require("nodemailer");
var uuid = require('node-uuid');

// var jwtDecode = require('jwt-decode');


var dotenv = require('dotenv');
dotenv.load();



exports.requestPurchase=function(req,res){

  // var decodedAuthToken = jwt_decode(token);
  // console.log(req.tokenObject);
  if(req.tokenObject.level < 2500) return res.status(401).json({msg:"you don't have the authority to do this action"});
  //new qouta
  // req.body.unitesRequested
  // req.body.productName
new product({ServiceName:req.body.productName}).fetch().then(function(productRequeted){
console.log(productRequeted);
    new User({ PersonalEmail:req.tokenObject.email }).fetch().then(function(userMakingTheRequest) {
      console.log(userMakingTheRequest);

      new qouta({ company_id:userMakingTheRequest.attributes.companyProfiles_id , productsDefine_id:productRequeted.attributes.id}).fetch().then(function(qoutaRequested) {
        console.log(qoutaRequested);
        if(qoutaRequested===null){
          new qouta({
               PurchasedUnits:req.body.unitesRequested ,
               ConsumedUnits:0,
               PaymentMethod:"Offline",
               isActivated:false,

               company_id:userMakingTheRequest.attributes.companyProfiles_id,
               productsDefine_id:productRequeted.id
             }).save().then(function(newQouta){
               if(newQouta===null)return res.status(500);

                console.log(req.tokenObject);
                console.log(req.tokenObject.sessionId+"this is the session ID");

               new purchase({
                 ApprovedByAssess:false,
                 ApprovedByBank:false,
                 //ApprovalDate:Date.now(),
                 AmountOfTokenRequested:req.body.unitesRequested,
                //  protionCode:

                sessionLogs_id:req.tokenObject.sessionId,
                qoutas_id:newQouta.attributes.id


              }).save().then(function(newPurchase){
                if(newQouta===null)return res.status(500);
                return res.json(newQouta);


              }).catch(function (error) {
                console.log(error);
                res.status(500);

              });
             });
        }else{
            qoutaRequested.save({PurchasedUnits:qoutaRequested.attributes.PurchasedUnits+req.body.unitesRequested}).then(function (newQouta) {
                if(newQouta===null)return res.status(500);

                          new purchase({
                                 ApprovedByAssess:false,
                                 ApprovedByBank:false,
                                 //ApprovalDate:Date.now(),
                                 AmountOfTokenRequested:req.body.unitesRequested,
                                //  protionCode:
                               sessionLogs_id:req.tokenObject.sessionId,
                                qoutas_id:newQouta.attributes.id


                              }).save().then(function(newPurchase){
                                if(newQouta===null)return res.status(500);
                                return res.json(newQouta);


                              }).catch(function (error) {
                                console.log(error);
                                res.status(500);

                              });
            }).catch(function(error) {
              console.log(error);
              return res.status(500);

            });
        }

      }).catch(function(error){
        console.log(error);
        return res.status(500);

      });

 }).catch(function(error){
   console.log(error);
   return res.status(500);
 });

 }).catch(function(error){
   console.log(error);
   return res.status(500);
 });

};
