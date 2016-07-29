var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var purchase = require('../models/purchaseRequestsModel');
var company = require('../models/companyProfilesModel');
var qouta = require('../models/qoutasModel');
var User = require('../models/User');
var product = require('../models/productsDefineModel');
var activation = require('../models/activationsModel');
var token = require('../models/examTokensModel');
var uuid = require('node-uuid');



var nodemailer = require("nodemailer");
var uuid = require('node-uuid');

// var jwtDecode = require('jwt-decode');


var dotenv = require('dotenv');
dotenv.load();
// productName
// QuntatityToActivate


exports.activateTokens = function(req, res) {

    // var decodedAuthToken = jwt_decode(token);
    // console.log(req.tokenObject);
    if (req.tokenObject.level < 2500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    new product({
        ServiceName: req.body.productName
    }).fetch().then(function(productRequeted) {

        new User({
            PersonalEmail: req.tokenObject.email
        }).fetch().then(function(userMakingTheRequest) {
            new qouta({
                company_id: userMakingTheRequest.attributes.companyProfiles_id,
                productsDefine_id: productRequeted.attributes.id
            }).fetch().then(function(qoutaRequested) {
                var currentTokens = qoutaRequested.attributes.PurchasedUnits - qoutaRequested.attributes.ConsumedUnits;
                var remaining = currentTokens - req.body.QuntatityToActivate;
                if (remaining >= 0) {
                    new activation({
                        AssessmentModuleEnabled: true,
                        NumberOfTokensOrdered: req.body.QuntatityToActivate,
                        qoutas_id: qoutaRequested.attributes.id,

                    }).save().then(function(newActivation) {
                        var counter = 0;
                        for (var i = 0; i < req.body.QuntatityToActivate; i++) {
                            // var payload = {
                            //     iss: 'assessTalentMagmentExam',
                            //     name: userMakingTheRequest.attributes.CompanyName,
                            //     examType: req.body.productName,
                            //     uniqueString: uuid.v1(),
                            //     premission: "unkown",
                            //     iat: moment().unix(),
                            //     exp: moment().add(60, 'days').unix()
                            // };
                            // var tokenGenreated = jwt.sign(payload, process.env.TOKEN_SECRET);
                            new token({
                                TokenString:  uuid.v1(),
                                sessionLogs_id: req.tokenObject.sessionId,
                                activations_id: newActivation.attributes.id
                            }).save().then(function(newToken) {
                                if (newToken !== null) counter = counter + 1;

                            });


                        }
                        qoutaRequested.save({
                            ConsumedUnits: qoutaRequested.attributes.ConsumedUnits + req.body.QuntatityToActivate
                        }).then(function(updatedQouta) {
                            if (updatedQouta === null) return res.status(500).send();
                            return res.json(updatedQouta);
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send();
                        });


                    }).catch(function(error) {
                        console.log(error);
                        return res.status(500).send();
                    });
                } else {
                    return res.status(400).json({
                        msg: "no enough tokens in ur balance"
                    });
                }
            }).catch(function(error) {
                console.log(error);
                return res.status(500).send();

            }).catch(function(error) {
                console.log(error);
                return res.status(500).send();
            });


        }).catch(function(error) {
            console.log(error);
            return res.status(500).send();
        });

    }).catch(function(error) {
        return res.status(500).send();
    });
};
