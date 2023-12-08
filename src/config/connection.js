const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connect to database successfully!'))
            .catch(() => console.log('Connect to database failure!'))
    }
    catch (err) {
        handleError(err);
    }
}

module.exports = { connect };