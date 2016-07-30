var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');
var company = require('../models/companyProfilesModel');
var nodemailer = require("nodemailer");
var sessionLog = require('../models/sessionLogsModel');
var uuid = require('node-uuid');



var dotenv = require('dotenv');
dotenv.load();


var userTempEmailId, mailOptions, host, link, userEmailSignup; // related to email varify function

function generateToken(user, sessionObject) {

    var payload = {
        iss: 'assessBoard',
        sub: user.id,
        name: user.attributes.FamilyName,
        email: user.attributes.PersonalEmail,
        level: user.attributes.UserAccountType,
        premission: "unkown",
        sessionId: sessionObject.id,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}

exports.SendEmail = function(req, res) {
    // body...

    console.log(req.body.PersonalEmail + " req.body.email val in sendEmail ");

    var smtpTransport = nodemailer.createTransport(process.env.SIGNUPMAILSERVER_URL);

    // rand=Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + req.body.userTempEmailId + "&email=" + req.body.PersonalEmail;
    mailOptions = {
        to: req.body.PersonalEmail,
        from: process.env.SIGNUPMAILSERVER_EMAIL,
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    };
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");

            smtpTransport.sendMail(mailOptions, function(error, response) {
                if (!error) {
                    console.log("the msg was sent on the second try ");
                } else {
                    console.log("failed again ");
                }
            });


            //   var msgNotSent=true;
            //   var numberOfRequests=0;
            //   while(msgNotSent && numberOfRequests<5 ){
            //   setTimeout(function () { // for the conncetion problem give it another try if it fail
            //   console.log('try sending msg again')
            //   smtpTransport.sendMail(mailOptions, function(error, response){
            //     if(!error){console.log("the msg was sent on the second try ")
            //       msgNotSent=false;
            //   }
            //     else{
            //        numberOfRequests=numberOfRequests+1;
            //       console.log("number of the failed tries : "+numberOfRequests);
            //     }
            //     })
            //   }, 2000)
            // }

        } else {
            console.log("Message sent: " + response.message);
            res.json({msg:"A email was sent Successfully to you "});
        }
    });
};


/**
 * Login required middleware
 */

exports.emailVerify = function(req, res) {
    // body...

    //if((req.protocol+"://"+req.get('host'))==("http://"+host))
    console.log("Domain is matched. Information is from Authentic email");
    varifedEmailUser = new User({
        id: req.query.id,
        PersonalEmail: req.query.email
    }).fetch().then(function(user) {

        if (user.attributes.userVerfiedByEmail === true) {
            return res.status(400).send();
        } else {
            console.log("email is verified : " + req.query.email);
            user.save({
                userVerfiedByEmail: true
            }, {
                patch: true
            }).then(function(verifedUser) {
                // body...
                return res.end("<h1>Email " + verifedUser.attributes.PersonalEmail + " has been Successfully verified</h1>");

            }).catch(function(err) {
                // body...
                console.log("user is not set to True in email verifed feild");
                console.log(err);
            });
        }
    }).catch(function(err) {

        console.log("email is not verified");
        console.log(err);
        return res.end("<h1>Bad Request</h1>");
    });

};

exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({
            msg: 'Unauthorized'
        });
    }
};
exports.upgradeUser = function(req, res) {
    // body...

    if (req.tokenObject.level < 3500) return res.status(401).json({
        msg: "you don't have the authority to do this action"
    });
    new User({
        PersonalEmail: req.body.PersonalEmail
    }).fetch().then(function(user) {
        user.save({
            UserAccountType: req.body.level
        }, {
            patch: true
        }).then(function(upgradedUser) {
            // body...
            return res.json({
                msg: "User permissions changed"
            });

        }).catch(function(err) {
            // body...
            console.log(err);
            return res.status(500).json({
                msg: "cant upgrade the user check with the IT "
            });
        });
    }).catch(function(err) {

        console.log(err);
        return res.status(404).json({
            msg: " email not matched with the user name check the input"
        });
    });



};
exports.signupAdmin = function(req, res) {
    // body...
    new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            UserType: "5000",
            userVerfiedByEmail: "True"
        }).save().then(function(user) {
            console.log("send token was reached in backend");
            res.send({
                token: generateToken(user),
                user: user
            });
        })
        .catch(function(err) {
            if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
                return res.status(400).send({
                    msg: 'The email address you have entered is already associated with another account.'
                });
            }
        });

};

// added function for getting all users data NEED TO BE REMOVED later on
exports.allUsers = function(req, res) {
    // body...
    var queryPram = req.query; // the queryPram now has all the vars that u enteried in your url
    new User({ // email:queryPram.email  ## as a example so only the user with this email will be returned
    }).fetchAll().then(function(allUsersData) {
        // body...
        res.json(allUsersData);
    });

};
///
/**
 * POST /login
 * Sign in with email and password
 */
exports.loginPost = function(req, res, next) {
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('email', 'Email cannot be blank').notEmpty();
    // req.assert('password', 'Password cannot be blank').notEmpty();
    // req.sanitize('email').normalizeEmail({ remove_dots: false });
    //
    // var errors = req.validationErrors();
    // var userIsVerfiedByEmail=false;
    // if (errors) {
    //   return res.status(400).send(errors);
    // }

    new User({
            PersonalEmail: req.body.PersonalEmail
        })
        .fetch()
        .then(function(user) {
            if (!user) {
                return res.status(401).send({
                    msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
                        'Double-check your email address and try again.'
                });
            }
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (!isMatch || user.attributes.userVerfiedByEmail === false) {
                    return res.status(401).send({
                        msg: 'Invalid email or password'
                    });
                }
                new sessionLog({
                    // LoginTime:,
                    // LogoutTime:,
                    user_id: user.attributes.id
                }).save().then(function(newSessionLog) {
                    if (!newSessionLog) return res.status(500);
                    sessionObject = newSessionLog.attributes;
                    return res.send({
                        token: generateToken(user, sessionObject),
                        user: user.toJSON()
                    });

                }).catch(function(error) {
                    console.log(error);
                    return res.status(500);
                });
            });
        });
};

/**
 * POST /signup
 */



exports.signupPost = function(req, res, next) {
    // req.assert('name', 'Name cannot be blank').notEmpty();
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('email', 'Email cannot be blank').notEmpty();
    // req.assert('password', 'Password must be at least 4 characters long').len(4);
    // req.sanitize('email').normalizeEmail({ remove_dots: false });
    //
    req.assert('companyID', 'Email cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }
    console.log("inside signup");

    var newUserCompanyID = 0;
    new company({
        CompanyUniqueToken: req.body.companyID
    }).fetch().then(function(newUserCompanyObject) {
        if (newUserCompanyObject === null) {
            if (req.body.companyID !== "none") return res.status(404).json({
                msg: "The company ID was not found recheck for the ID or  click on the check box if are not here for recruitment from a specific company"
            });
            new company({
                CompanyName: "Assess-Indviduals"
            }).fetch().then(function(NoCompanyUser) {
                if (NoCompanyUser.attributes.id === null) return res.status(500);
                newUserCompanyID = NoCompanyUser.attributes.id;
                console.log(newUserCompanyID + " the right function");
                new User({
                        FirstName: req.body.FirstName,
                        UserID: uuid.v1(),
                        FamilyName: req.body.FamilyName,
                        PersonalEmail: req.body.PersonalEmail,
                        Phone: req.body.Phone,
                        password: req.body.password,
                        UserAccountType: 1000,
                        userVerfiedByEmail: false,
                        userVerfiedByCorp: true,
                        userVerfiedByAdmin: true,
                        userVerfiedBySms: true,
                        companyProfiles_id: newUserCompanyID
                    }).save()
                    .then(function(user) {
                        console.log("send token was reached in backend");
                        req.body.userTempEmailId = user.attributes.id;
                        console.log("token sent started creating the mail");
                        next();
                    })
                    .catch(function(err) {
                        console.log(err);
                        if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
                            return res.status(400).send({
                                msg: 'The email address you have entered is already associated with another account.'
                            });
                        }
                    });

            }).catch(function(error) {
                console.log(error);
                return res.status(500).send();
            });
        } else {
            newUserCompanyID = newUserCompanyObject.attributes.id;
            new User({
                    FirstName: req.body.FirstName,
                    UserID: uuid.v1(),
                    FamilyName: req.body.FamilyName,
                    PersonalEmail: req.body.PersonalEmail,
                    Phone: req.body.Phone,
                    password: req.body.password,
                    UserAccountType: 1000,
                    userVerfiedByEmail: false,
                    userVerfiedByCorp: true,
                    userVerfiedByAdmin: true,
                    userVerfiedBySms: true,
                    companyProfiles_id: newUserCompanyID
                }).save()
                .then(function(user) {
                    console.log("send token was reached in backend");
                    req.body.userTempEmailId = user.attributes.id;
                    console.log("token sent started creating the mail");
                    next();
                })
                .catch(function(err) {
                    console.log(err);
                    if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
                        return res.status(400).send({
                            msg: 'The email address you have entered is already associated with another account.'
                        });
                    }
                });

        }
    }).catch(function(error) {
        console.log(error);
        return res.status(500).send();
    });

};


/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function(req, res, next) {
    if ('password' in req.body) {
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirm', 'Passwords must match').equals(req.body.password);
    } else {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Email cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({
            remove_dots: false
        });
    }

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var user = new User({
        id: req.user.id
    });
    if ('password' in req.body) {
        user.save({
            password: req.body.password
        }, {
            patch: true
        });
    } else {
        user.save({
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            location: req.body.location,
            website: req.body.website
        }, {
            patch: true
        });
    }
    user.fetch().then(function(user) {
        if ('password' in req.body) {
            res.send({
                msg: 'Your password has been changed.'
            });
            next();
        } else {
            res.send({
                user: user,
                msg: 'Your profile information has been updated.'
            });
        }
        res.redirect('/account');
    }).catch(function(err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send({
                msg: 'The email address you have entered is already associated with another account.'
            });
        }
    });
};

/**
 * DELETE /account
 */
exports.accountDelete = function(req, res, next) {
    new User({
        id: req.user.id
    }).destroy().then(function(user) {
        res.send({
            msg: 'Your account has been permanently deleted.'
        });
    });
};

/**
 * GET /unlink/:provider
 */
exports.unlink = function(req, res, next) {
    new User({
            id: req.user.id
        })
        .fetch()
        .then(function(user) {
            switch (req.params.provider) {
                case 'facebook':
                    user.set('facebook', null);
                    break;
                case 'google':
                    user.set('google', null);
                    break;
                case 'twitter':
                    user.set('twitter', null);
                    break;
                case 'vk':
                    user.set('vk', null);
                    break;
                default:
                    return res.status(400).send({
                        msg: 'Invalid OAuth Provider'
                    });
            }
            user.save(user.changed, {
                patch: true
            }).then(function() {
                res.send({
                    msg: 'Your account has been unlinked.'
                });
            });
        });
};

/**
 * POST /forgot
 */
exports.forgotPost = function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({
        remove_dots: false
    });

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function(done) {
            crypto.randomBytes(16, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            new User({
                    email: req.body.email
                })
                .fetch()
                .then(function(user) {
                    if (!user) {
                        return res.status(400).send({
                            msg: 'The email address ' + req.body.email + ' is not associated with any account.'
                        });
                    }
                    user.set('passwordResetToken', token);
                    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
                    user.save(user.changed, {
                        patch: true
                    }).then(function() {
                        done(null, token, user.toJSON());
                    });
                });
        },
        function(token, user, done) {
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_USERNAME,
                    pass: process.env.MAILGUN_PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'support@yourdomain.com',
                subject: '✔ Reset your password on Mega Boilerplate',
                text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.send({
                    msg: 'An email has been sent to ' + user.email + ' with further instructions.'
                });
                done(err);
            });
        }
    ]);
};

/**
 * POST /reset
 */
exports.resetPost = function(req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function(done) {
            new User({
                    passwordResetToken: req.params.token
                })
                .where('passwordResetExpires', '>', new Date())
                .fetch()
                .then(function(user) {
                    if (!user) {
                        return res.status(400).send({
                            msg: 'Password reset token is invalid or has expired.'
                        });
                    }
                    user.set('password', req.body.password);
                    user.set('passwordResetToken', null);
                    user.set('passwordResetExpires', null);
                    user.save(user.changed, {
                        patch: true
                    }).then(function() {
                        done(err, user.toJSON());
                    });
                });
        },
        function(user, done) {
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_USERNAME,
                    pass: process.env.MAILGUN_PASSWORD
                }
            });
            var mailOptions = {
                from: 'support@yourdomain.com',
                to: user.email,
                subject: 'Your Mega Boilerplate password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
                res.send({
                    msg: 'Your password has been changed successfully.'
                });
            });
        }
    ]);
};

/**
 * POST /auth/facebook
 * Sign in with Facebook
 */
exports.authFacebook = function(req, res) {
    var profileFields = ['id', 'name', 'email', 'gender', 'location'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + profileFields.join(',');

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({
        url: accessTokenUrl,
        qs: params,
        json: true
    }, function(err, response, accessToken) {
        if (accessToken.error) {
            return res.status(500).send({
                msg: accessToken.error.message
            });
        }

        // Step 2. Retrieve user's profile information.
        request.get({
            url: graphApiUrl,
            qs: accessToken,
            json: true
        }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({
                    msg: profile.error.message
                });
            }

            // Step 3a. Link accounts if user is authenticated.
            if (req.isAuthenticated()) {
                new User({
                        facebook: profile.id
                    })
                    .fetch()
                    .then(function(user) {
                        if (user) {
                            return res.status(409).send({
                                msg: 'There is already an existing account linked with Facebook that belongs to you.'
                            });
                        }
                        user = req.user;
                        user.set('name', user.get('name') || profile.name);
                        user.set('gender', user.get('gender') || profile.gender);
                        user.set('picture', user.get('picture') || 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                        user.set('facebook', profile.id);
                        user.save(user.changed, {
                            patch: true
                        }).then(function() {
                            res.send({
                                token: generateToken(user),
                                user: user
                            });
                        });
                    });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                new User({
                        facebook: profile.id
                    })
                    .fetch()
                    .then(function(user) {
                        if (user) {
                            return res.send({
                                token: generateToken(user),
                                user: user
                            });
                        }
                        new User({
                                email: profile.email
                            })
                            .fetch()
                            .then(function(user) {
                                if (user) {
                                    return res.status(400).send({
                                        msg: user.get('email') + ' is already associated with another account.'
                                    });
                                }
                                user = new User();
                                user.set('name', profile.name);
                                user.set('email', profile.email);
                                user.set('gender', profile.gender);
                                user.set('location', profile.location && profile.location.name);
                                user.set('picture', 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
                                user.set('facebook', profile.id);
                                user.set('UserType', "1000");
                                user.set('userVerfiedByEmail', "True");

                                user.save().then(function(user) {
                                    return res.send({
                                        token: generateToken(user),
                                        user: user
                                    });
                                });
                            });
                    });
            }
        });
    });
};

exports.authFacebookCallback = function(req, res) {
    res.send('Loading...');
};
/**
 * POST /auth/google
 * Sign in with Google
 */
exports.authGoogle = function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
        json: true,
        form: params
    }, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve user's profile information.
        request.get({
            url: peopleApiUrl,
            headers: headers,
            json: true
        }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({
                    message: profile.error.message
                });
            }
            // Step 3a. Link accounts if user is authenticated.
            if (req.isAuthenticated()) {
                new User({
                        google: profile.sub
                    })
                    .fetch()
                    .then(function(user) {
                        if (user) {
                            return res.status(409).send({
                                msg: 'There is already an existing account linked with Google that belongs to you.'
                            });
                        }
                        user = req.user;
                        user.set('name', user.get('name') || profile.name);
                        user.set('gender', user.get('gender') || profile.gender);
                        user.set('picture', user.get('picture') || profile.picture.replace('sz=50', 'sz=200'));
                        user.set('location', user.get('location') || profile.location);
                        user.set('google', profile.sub);
                        user.save(user.changed, {
                            patch: true
                        }).then(function() {
                            res.send({
                                token: generateToken(user),
                                user: user
                            });
                        });
                    });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                new User({
                        google: profile.sub
                    })
                    .fetch()
                    .then(function(user) {
                        if (user) {
                            return res.send({
                                token: generateToken(user),
                                user: user
                            });
                        }
                        new User({
                                email: profile.email
                            })
                            .fetch()
                            .then(function(user) {
                                if (user) {
                                    return res.status(400).send({
                                        msg: user.get('email') + ' is already associated with another account.'
                                    });
                                }
                                user = new User();
                                user.set('name', profile.name);
                                user.set('email', profile.email);
                                user.set('gender', profile.gender);
                                user.set('location', profile.location);
                                user.set('picture', profile.picture.replace('sz=50', 'sz=200'));
                                user.set('google', profile.sub);
                                user.set('UserType', "1000");
                                user.set('userVerfiedByEmail', "True");
                                user.save().then(function(user) {
                                    res.send({
                                        token: generateToken(user),
                                        user: user
                                    });
                                });
                            });
                    });
            }
        });
    });
};

exports.authGoogleCallback = function(req, res) {
    res.send('Loading...');
};
