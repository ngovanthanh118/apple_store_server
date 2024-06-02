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
            const { name, email, phone, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 10);
            const user = await User.findOne({ email: email });
            if (!user) {
                await User.create({
                    name: name,
                    email: email,
                    phone: phone,
                    password: hashPassword,
                })
                    .then((data) => {
                        const token = jwt.sign({ _id: data._id }, process.env.ACCESS_TOKEN_SECRET);
                        res.status(200).send({
                            error: false,
                            token: token,
                            data: data,
                            msg: 'Đăng ký thành công'
                        })
                    })
                    .catch((err) => res.status(400).send({ error: true, msg: err }));
            }
            else {
                res.status(400).send({ error: true, msg: 'Tài khoản đã tồn tại' });
            }
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
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
                        res.status(200).send({ error: false, token: token, admin: true, msg: 'Đăng nhập thành công', });
                    }
                    else {
                        res.status(200).send({
                            error: false,
                            token: token,
                            data: user,
                            msg: 'Đăng nhập thành công'
                        });
                    }
                }
                else {
                    res.status(200).send({ error: true, msg: 'Mật khẩu không chính xác' });
                }
            }
            else {
                res.status(400).send({ error: true, msg: 'Tài khoản không tồn tại' });
            }
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message });
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
            const { name, password, phone, address } = req.body;
            const user = await User.findById(_id);
            if (password) {
                const hashPassword = bcrypt.hashSync(password, 10);
                if (req.file) {
                    const image = req.file.filename;
                    if (user.image !== 'null') {
                        fs.unlinkSync(path.join(__dirname, '../../public/images/' + user.image));
                    }
                    await User.findByIdAndUpdate(_id, {
                        name: name,
                        phone: phone,
                        address: address,
                        password: hashPassword,
                        image: image,
                    })
                        .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                        .catch(err => res.status(400).send({ msg: err }));
                }
                else {
                    await User.findByIdAndUpdate(_id, {
                        name: name,
                        phone: phone,
                        address: address,
                        password: hashPassword,
                    })
                        .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                        .catch(err => res.status(400).send({ msg: err }));
                }
            } else {
                if (req.file) {
                    const image = req.file.filename;
                    if (user.image !== 'null') {
                        fs.unlinkSync(path.join(__dirname, '../../public/images/' + user.image));
                    }
                    await User.findByIdAndUpdate(_id, {
                        name: name,
                        phone: phone,
                        address: address,
                        image: image,
                    })
                        .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                        .catch(err => res.status(400).send({ msg: err }));
                }
                else {
                    await User.findByIdAndUpdate(_id, {
                        name: name,
                        phone: phone,
                        address: address,
                    })
                        .then(data => res.status(200).send({ data: data, msg: "Update successfully!" }))
                        .catch(err => res.status(400).send({ msg: err }));
                }
            }



        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    //asign admin 
    async asignPermissionAdmin(req, res) {
        const id = req.params.id;
        try {
            await User.findByIdAndUpdate(id, { admin: true })
                .then(() => res.status(200).send({ error: false, msg: "Phân quyền admin thành công" }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
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