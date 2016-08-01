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
var bill = require("../models/billingHistoryModel");




exports.requestPurchase = function(req, res) {

    // var decodedAuthToken = jwt_decode(token);
    // console.log(req.tokenObject);
    if (req.tokenObject.level < 2500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    //new qouta
    // req.body.unitesRequested
    // req.body.productName
    // req.body.PaymentMethod
    // req.body.PaymentMethod_OnlineOffline
    new product({
        ServiceName: req.body.productName
    }).fetch().then(function(productRequeted) {
        console.log(productRequeted);
        new User({
            PersonalEmail: req.tokenObject.email
        }).fetch().then(function(userMakingTheRequest) {
          if(userMakingTheRequest===null)
            console.log(userMakingTheRequest);

            new qouta({
                company_id: userMakingTheRequest.attributes.companyProfiles_id,
                productsDefine_id: productRequeted.attributes.id
            }).fetch().then(function(qoutaRequested) {
                console.log(qoutaRequested);
                if (qoutaRequested === null) {
                    new qouta({
                        PurchasedUnits: 0,
                        ConsumedUnits: 0,
                        PaymentMethod: req.body.PaymentMethod,
                        isActivated: false,

                        company_id: userMakingTheRequest.attributes.companyProfiles_id,
                        productsDefine_id: productRequeted.id
                    }).save().then(function(newQouta) {
                        if (newQouta === null) return res.status(500).send();

                        console.log(req.tokenObject.sessionId + "this is the session ID");

                        new purchase({
                            ApprovedByAssess: false,
                            ApprovedByBank: false,
                            //ApprovalDate:Date.now(),
                            AmountOfTokenRequested: req.body.unitesRequested,
                            //  protionCode:
                            PaymentMethod_OnlineOffline: req.body.PaymentMethod_OnlineOffline,
                            sessionLogs_id: req.tokenObject.sessionId,
                            qoutas_id: newQouta.attributes.id


                        }).save().then(function(newPurchase) {
                            if (newQouta === null) return res.status(500).send();
                            var PaidAttr = req.body.unitesRequested * productRequeted.attributes.Price;
                            new bill({
                                Paid: PaidAttr,
                                isPaid: false,
                                Discount: 0,
                                SalexTax: 0,
                                Total: PaidAttr,
                                purchaseRequests_id: newPurchase.attributes.id
                            }).save().then(function(newBill) {
                                if (newBill === null) return res.status(500).send();
                                return res.json(newBill);
                            }).catch(function(error) {
                                console.log(error);
                                return res.status(500).send();
                            });

                        }).catch(function(error) {
                            console.log(error);
                            res.status(500).send();

                        });
                    });
                } else {
                    new purchase({
                        ApprovedByAssess: false,
                        ApprovedByBank: false,
                        //ApprovalDate:Date.now(),
                        AmountOfTokenRequested: req.body.unitesRequested,
                        RequestIsDone: false,
                        //  protionCode:
                        sessionLogs_id: req.tokenObject.sessionId,
                        qoutas_id: qoutaRequested.attributes.id,
                        PaymentMethod_OnlineOffline: req.body.PaymentMethod_OnlineOffline


                    }).save().then(function(newPurchase) {
                        if (newPurchase === null) return res.status(500).send();
                        var PaidAttr = req.body.unitesRequested * productRequeted.attributes.Price;
                        new bill({
                            Paid: PaidAttr,
                            isPaid: false,
                            Discount: 0,
                            SalexTax: 0,
                            Total: PaidAttr,
                            purchaseRequests_id: newPurchase.attributes.id

                        }).save().then(function(newBill) {
                            if (newBill === null) return res.status(500).send();
                            return res.json(newBill);
                        }).catch(function(error) {
                            console.log(error);
                            return res.status(500).send();
                        });
                        // return res.json(qoutaRequested);



                    }).catch(function(error) {
                        console.log(error);
                        res.status(500).send();

                    });
                }

            }).catch(function(error) {
                console.log(error);
                return res.status(500).send();

            });

        }).catch(function(error) {
            console.log(error);
            return res.status(500).send();
        });

    }).catch(function(error) {
        console.log(error);
        return res.status(500).send();
    });

};


exports.verifyPurchase = function(req, res) {
    //RequestID
    // companyID
    //userID
    // userEmail
    if (req.tokenObject.level < 3500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    new purchase({
        id: req.body.RequestID,
        RequestIsDone: false,
    }).fetch().then(function(toBeVerfiedPurchase) {
        if (toBeVerfiedPurchase === null) return res.status(404).send();
        toBeVerfiedPurchase.save({
            ApprovedByAssess: true,
            RequestIsDone: true,
            //  RequestDate:Date.now(),
        }).then(function(purchaseChanged) {
            if (purchaseChanged === null) return res.status(500).send();
            new qouta({
                id: purchaseChanged.attributes.qoutas_id
            }).fetch().then(function(targetQouta) {
                targetQouta.save({
                    PurchasedUnits: targetQouta.attributes.PurchasedUnits + purchaseChanged.attributes.AmountOfTokenRequested,
                    isActivated: true
                }).then(function(newQoutaMade) {
                    if (newQoutaMade === null) return res.status(404).send();
                    new bill({purchaseRequests_id:purchaseChanged.attributes.id}).save({isPaid:true}).then(function(newBill){
                      if(newBill===null)return res.status(404).send();
                      return res.json(newBill);
                    });
                }).catch(function(error) {
                    console.log(error);
                    return res.status(404).send();
                });
            }).catch(function(error) {
                console.log(error);
                return res.status(404).send();
            });
        }).catch(function(error) {
            console.log(error);
            return res.status(404).send();
        });
    }).catch(function(error) {
        console.log(error);
        return res.status(404).send();
    });
};
