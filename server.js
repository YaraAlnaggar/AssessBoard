var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');
// Controllers
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var companyController = require('./controllers/company');
var productController = require("./controllers/product");
var purchaseRequestsController = require("./controllers/purchaseRequest");
var activationController = require("./controllers/activations");




var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.isAuthenticated = function() {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        //console.log("token :: "+token)
        try {
            req.tokenObject = jwt.verify(token, process.env.TOKEN_SECRET);
            return req.tokenObject;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        new User({
                id: payload.sub
            })
            .fetch()
            .then(function(user) {
                req.user = user;
                next();
            });
    } else {
        next();
    }
});

app.post('/contact', contactController.contactPost);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost, userController.SendEmail);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/auth/facebook', userController.authFacebook);
app.get('/auth/facebook/callback', userController.authFacebookCallback);
app.post('/auth/google', userController.authGoogle);
app.get('/auth/google/callback', userController.authGoogleCallback);



app.post('/admin/addAdmin', userController.ensureAuthenticated, userController.signupAdmin); // add grades to user
app.post('/admin/upgradeUser', userController.ensureAuthenticated, userController.upgradeUser); // upgrade user privilages

app.get("/verify", userController.emailVerify); // verify by email

app.post("/admin/addproduct", userController.ensureAuthenticated, productController.addproduct); // add products to be used in purchase
app.post("/admin/Company", userController.ensureAuthenticated, companyController.addCompany); // add another comapny account
app.post("/admin/verfiyPurchase", userController.ensureAuthenticated, purchaseRequestsController.verifyPurchase); // verfiy purchase of a product in both online and offline
app.post("/admin/GetAllCompaines",userController.ensureAuthenticated,companyController.getAllCompaines);


app.post("/activate", userController.ensureAuthenticated, activationController.activateTokens);
app.post("/purchase", userController.ensureAuthenticated, purchaseRequestsController.requestPurchase);
app.get("/reset", userController.ensureAuthenticated,companyController.resetCompanyID);

app.get('*', function(req, res) {
    res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
