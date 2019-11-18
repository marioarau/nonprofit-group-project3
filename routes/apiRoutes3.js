// import entire models folder
var db = require("../models");
var bcrypt = require('bcrypt');
var passport = require("../config/passport");

// Necessary for certain Sequelize features
const Op = db.Sequelize.Op;

// export this function that's passing an express server instance as an arguement
module.exports = function (app) {

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // post route for saving a favorite nonprofit for a user                            
    app.post("/api/update-favorite", function (req, res) {

        console.log('Entering Update Favorite:', req.body);
        // create() requires an object describing the new data we're adding to table
        console.log('donationAmt:', req.body.donationAmt);
        console.log('UserId:', req.body.UserId);
        console.log('NonprofitId:', req.body.NonprofitId);
        db.Favorites.update({
            donationAmt: req.body.donationAmt
        },
            {
                where: {
                    UserId: req.body.UserId,
                    NonprofitId: req.body.NonprofitId
                }
            }
        ).then(function (results) {
            console.log(results);
            res.json(results);
        }).catch(function (err) {
            //replace with better err handler
            console.log(err)
        });
    });

    app.get('/api/delete-favorite/favoriteId/:favoriteId', function (req, res) {
        console.log("favoriteId: ", req.params.favoriteId);
        db.Favorites.destroy({
            where: {
                id: req.params.favoriteId
            }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Favorite Record deleted successfully');
            }
            else {
                console.log('Favorite Record was not deleted');
            }
            res.json(rowDeleted);
        }, function (err) {
            console.log(err);
        });

    });
    // get route for getting favorites by userid
    // POSTMAN GET localhost:5000/api/get-user-favorites/userid/2
    app.get('/api/get-user-favorites/userid/:userid', function (req, res) {

        console.log('Entering get-user-favorites:', req.params);
        console.log("userId: ", req.params.userid);
        db.Favorites.findAll({
            where: {
                UserId: req.params.userid
            }
        }).then(function (results) {
            res.json(results);
        }).catch(function (err) {
            res.status(500);
        });
    });

    // post route for saving a favorite nonprofit for a user                            
    app.post("/api/favorite", function (req, res) {

        console.log('Entering Create Favorite:', req.body);
        // create() requires an object describing the new data we're adding to table
        console.log('donationAmt:', req.body.donationAmt);
        console.log('UserId:', req.body.userId);
        console.log('donNonprofitIdationAmt:', req.body.nonprofitId);
        db.Favorites.create({
            donationAmt: req.body.donationAmt,
            UserId: req.body.userId,
            NonprofitId: req.body.nonprofitId
        }).then(function (results) {
            res.json(results);
        }).catch(function (err) {
            //replace with better err handler
            console.log(err)
        });
    });

    // get route for getting (nonprofit) categories
    // POSTMAN localhost:5000/api/get-np-by-category/category/Youth Services
    app.get('/api/get-categories', function (req, res) {

        db.Category.findAll()
            .then(function (results) {
                res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // get route for getting nonprofits by category
    // POSTMAN localhost:5000/api/get-np-by-category/category/Youth Services
    app.get('/api/get-np-by-category/category/:category', function (req, res) {

        console.log(req.params);
        console.log("category: ", req.params.category);
        db.Nonprofit.findAll({
            where: {
                orgFocus: {
                    [Op.like]: ["%" + req.params.category + "%"]
                }
            }
        })
            .then(function (results) {
                res.json(results);
            })
            .catch(function (err) {
                res.status(500);
            });
    });

    // post route for creating a new user
    app.post("/api/register", function (req, res) {
        console.log('Create User via register:', req.body);
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            console.log('Created User via register');
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log('Error Creating User via register');
            console.log("error: ", err);
            res.status(401).json(err);
        });
    });
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("entering login api post code");
        res.json(req.user);
    });

    // get route to authenticate a user login
    app.get('/api/login', function (req, res) {

        console.log('=================')
        console.log(req.body.email);
        console.log(req.body.password);
        // reference models unit.js & find 1 unit by id passed in url
        db.User.findOne({
            where: {
                email: req.body.email
            }
            // return data as json
        }).then(function (result) {
            console.log("passwd from db: ", result.password);
            bcrypt.compare(req.body.password, result.password, function (err, res) {
                console.log(JSON.stringify(res));
                if (res) {
                    console.log("passwd matches: ", result.password);
                    return res.json({ "login": true });
                }
                else {
                    console.log("passwd does not match: ", result.password);
                    return res.json({ "login": false });
                }
            });
        }).catch(function (err) {
            res.status(500);
        });
    });

    // get route to find one user by its id
    app.get('/api/user/:id', function (req, res) {

        console.log('=================')
        console.log(req.params.id)

        // reference models unit.js & find 1 unit by id passed in url
        db.User.findOne({
            where: {
                id: req.params.id
            }
            // return data as json
        }).then(function (result) {
            return res.json(result);
        })
            .catch(function (err) {
                res.status(500);
            });
    });

}
