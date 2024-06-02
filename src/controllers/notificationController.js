const Notification = require('../models/notificationSchema');
class NotificationController {
    async createNotification(req, res) {
        try {
            await Notification.create({ ...req.body })
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))

        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }
    async getNotifications(req, res) {
        try {
            await Notification.find({})
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async getNotification(req, res) {
        try {
            const id = req.params.id;
            await Notification.findById(id)
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    }
    async getNotificationsList(req, res) {
        try {
            const page_size = 5;
            const page = req.query.page ?? 1;
            const skip = (page - 1) * page_size;
            const total = await Notification.countDocuments({});
            const notifications = await Notification.find({}).skip(skip).limit(page_size);
            if (notifications.length > 0) {
                res.status(200).send({ totalDoc: total, pageSize: page_size, data: notifications });
            }
            else {
                res.status(200).send({ error: false, data: [], msg: 'Does not exist product!' });
            }
        } catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
    async deleteNotification(req, res) {
        try {
            const id = req.params.id;
            await Notification.findByIdAndDelete(id)
                .then((data) => res.status(200).send({ error: false, data: data }))
                .catch(err => res.status(400).send({ error: true, msg: err.message }))
        } catch (error) {
            res.status(500).send({ error: true, msg: error.message })
        }
    }

}

module.exports = new NotificationController();