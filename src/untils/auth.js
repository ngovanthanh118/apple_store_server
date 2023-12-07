const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
class Authentication {
    //check login
    async checkLogin(req, res, next) {
        try {
            const token = req.cookies.token;
            const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (_id) {
                User.findOne({ _id: _id })
                    .then(data => {
                        req.data = data;
                        next();
                    })
                    .catch(err => {
                        res.status(400).send({ msg: err })
                    })
            }
            else {
                res.status(400).send("Please login!");
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }
    async checkAdmin(req, res, next) {
        try {
            const isAdmin = req.data.admin;
            if (isAdmin) {
                next();
            }
            else {
                res.status(400).send({ msg: "No admin!" });
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }
}

module.exports = new Authentication();