const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {

    //register
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await User.findOne({ email: email })
            if (!user) {
                await User.create({
                    name: name,
                    email: email,
                    password: hashPassword
                })
                    .then((data) => res.status(200).send({ data: data, msg: 'Register successfully!' }))
                    .catch((err) => res.status(400).send({ msg: 'Register successfully!' + err }));
            }
            else {
                res.status(400).send({ msg: 'Email is exist!' });
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }

    //login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (user) {
                const isPassword = bcrypt.compareSync(password, user.password);
                if (isPassword) {
                    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
                    if (user.admin) {
                        res.status(200).send({ token: token, data: user.name, admin: true, msg: 'Login successfully!', });
                    }
                    else {
                        res.status(200).send({ data: token, msg: 'Login successfully!' });
                    }
                }
                else {
                    res.status(400).send({ msg: 'Password incorrect!' });
                }
            }
            else {
                res.status(400).send({ msg: 'Email does not exist!' });
            }
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }
}

module.exports = new UserController();