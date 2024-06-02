const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
class Authentication {
    //check login
    async checkLogin(req, res, next) {
        try {
            const token = req.headers.token;
            const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (_id) {
                await User.findOne({ _id: _id })
                    .then(data => {
                        req.data = data;
                        next();
                    })
                    .catch(err => {
                        res.status(400).send({ msg: err })
                    })
            }
            else {
                res.status(400).send({ msg: "Please login!" });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
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
            res.status(500).send({ msg: error.message });
        }
    }
    async verifyToken(req, res, next) {
        const token = req.headers.token;
        if (token) {
            const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(_id);
            if (user) {
                res.status(200).send({
                    error: false,
                    token: token,
                    data: user,
                    msg: 'Đăng nhập thành công'
                });
                return;
            }
            next();
        }
        next();
    }
}

module.exports = new Authentication();