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


    app.get('/api/get-user-favorites/userid/:userid', function (req, res) {
        console.log(req.params);
        console.log("category: ", req.params.category);
        qry = "SELECT `Favorites`.*, `Favorites`.id as fav_id, `Nonprofits`.*  FROM `Favorites`";
        qry = qry + " JOIN `Nonprofits` ON `Favorites`.`NonprofitId` = `Nonprofits`.`id`";
        qry = qry + "  WHERE Favorites.UserId = " + req.params.userid + " GROUP BY `Favorites`.NonprofitId limit 5";
        db.sequelize.query(qry).then(([results, metadata]) => {
            console.log("sequelize join results: ", results)
            res.json(results);
        }).catch(function (err) {
                res.status(500).send(err);
        });
    });

    // post route for creating a new favorites
    app.post("/api/favorite", function (req, res) {
            db.Favorites.create({
                donationAmt: req.body.donationAmt,
                NonprofitId: req.body.NonprofitId,
                UserId: req.body.UserId
            }).then(function (results) {
                // res.json(results);
                res.sendStatus(200)
            })
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
    app.get('/api/get-np-by-category/category/:category/:userid', function (req, res) {

        console.log(req.params);
        console.log("category: ", req.params.category);
        
        qry = "SELECT `Nonprofits`.* FROM `Nonprofits`";
        qry = qry + " WHERE id NOT IN(SELECT Favorites.NonprofitId FROM Favorites WHERE UserId = "+ req.params.userid +")";
        qry = qry + " AND orgFocus LIKE '%" + req.params.category + "%' limit 5";
        db.sequelize.query(qry).then(([results, metadata]) => {
            console.log("sequelize left join results: ", results)
            res.json(results);
        })
        //db.Nonprofit.findAll({
        //    where: {
        //        orgFocus: req.params.category
        //    }
        //})
            .catch(function (err) {
                res.status(500).send(err);
            });
    });

    // post route for creating a new user
    app.post("/api/register", function (req, res) {

        console.log('Create User Data:', req.body);
        bcrypt.hash(req.body.password, 10, function (err, password) {
            console.log("hash: ", password);
            // create() requires an object describing the new data we're adding to table
            db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }).then(function (results) {
                console.log("JSON.stringify(results): ", JSON.stringify(results));
                res.json(results);
                //res.sendStatus(200)
            })
            // .catch(function (err) {
            //     //replace with better err handler
            //     console.log(err)
            // });
        });
    });
    
    // post route for saving a new unit to database
    app.post("/api/create-user", function (req, res) {

        //console.log('Create User Data:', req.body);
        console.log('Create User Data:', req.body);
        bcrypt.hash(req.body.password, 10, function (err, password) {
            console.log("hash: ", password);
            // create() requires an object describing the new data we're adding to table
            db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
                userType: req.body.userType
            }).then(function (results) {
                res.json(results);
            }).catch(function (err) {
                //replace with better err handler
                console.log(err)
            });
        });
    });

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log("/api/login called");
        console.log('user det 1',req.user)
        res.json(req.user);
    });

    // get route to authenticate a user login
    app.get('/api/login', function (req, res) {
        console.log("/api/login get called");
        console.log('user det',req.user)
        res.json(req.user);
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
