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
var config = require('../knexfile');
var knex = require('knex')(config);


var uuid = require('node-uuid');

// productName
// QuntatityToActivate


exports.activateTokens = function(req, res) {
    var arrayToken = [];

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
                            arrayToken.push({
                                TokenString: uuid.v1(),
                                sessionLogs_id: req.tokenObject.sessionId,
                                activations_id: newActivation.attributes.id
                            });

                        }

                        knex.insert(arrayToken, 'id').into('examTokens').then(function() {
                            return res.send("tokens genreated");
                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send();
                        });


                        qoutaRequested.save({
                            ConsumedUnits: qoutaRequested.attributes.ConsumedUnits + req.body.QuntatityToActivate
                        }).then(function(updatedQouta) {
                            if (updatedQouta === null) return res.status(500).send();
                            return res.json(arrayToken);
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
