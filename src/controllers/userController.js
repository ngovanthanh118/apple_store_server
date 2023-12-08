const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const { use } = require('../routes/userRouter');
class UserController {

    //register
    async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await User.findOne({ email: email });
            if (!user) {
                await User.create({
                    name: name,
                    email: email,
                    password: hashPassword,
                })
                    .then((data) => res.status(200).send({ data: data, msg: 'Register successfully!' }))
                    .catch((err) => res.status(400).send({ msg: 'Register Failured!' + err }));
            }
            else {
                res.status(400).send({ msg: 'Email is exist!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
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
                        res.cookie("token", token, {
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            secure: true,
                            sameSite: 'None',
                        })
                        res.status(200).send({ data: user.name, admin: true, msg: 'Login successfully!', });
                    }
                    else {
                        res.cookie("token", token, {
                            maxAge: 24 * 60 * 60 * 1000,
                            httpOnly: true,
                            secure: true,
                            sameSite: 'None',
                        })
                        res.status(200).send({ msg: 'Login successfully!' });
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

    //Get user
    async getUser(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const isAdmin = req.data.admin;
            const total = await User.countDocuments({ admin: false });
            const user = await User.find({ admin: false }).skip(skip).limit(page_size);
            if (isAdmin) {
                res.status(200).send({ totalDoc: total, pageSize: page_size, admin: req.data, data: user, });
            }
            else {
                res.status(200).send({ data: req.data, });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //Edit user
    async editUser(req, res) {
        try {
            const _id = req.params.id;
            await User.findById(_id)
                .then(data => res.status(200).send({ data: data }))
                .catch(err => res.status(500).send({ msg: err }))
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    //Update user
    async updateUser(req, res) {
        try {
            const _id = req.params.id;
            const { name, email, password, phone, address, admin } = req.body;
            let hashPassword = "";
            if (password) {
                hashPassword = bcrypt.hashSync(password, 10);
            }
            const user = await User.findById(_id);
            if (req.file) {
                const image = req.file.filename;
                if (user.image !== 'null') {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/' + user.image));
                }
                await User.findByIdAndUpdate(_id, {
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    password: hashPassword || user.password,
                    image: image,
                    admin: admin
                })
                    .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                    .catch(err => res.status(400).send({ msg: err }));
            }
            else {
                await User.findByIdAndUpdate(_id, {
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    password: hashPassword || user.password,
                    admin: admin
                })
                    .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                    .catch(err => res.status(400).send({ msg: err }));
            }

        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //Delete user 
    async deleteUser(req, res) {
        try {
            const _id = req.params.id;
            const user = await User.findById(_id);
            if (user) {
                if (user.image != "null") {
                    fs.unlinkSync(path.join(__dirname, '../../public/images/' + user.image));
                }
                await User.findByIdAndDelete(_id)
                    .then(data => res.status(200).send({ msg: "Delete successfully!" }))
                    .catch(err => res.status(400).send({ msg: err }))
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}

module.exports = new UserController();