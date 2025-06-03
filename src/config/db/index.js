const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_nodeJS'); //có await nên phải đưa vào function có async
        console.log("connect successful");

    } catch (error) {
        console.log('fail');
    }
}
module.exports = { connect } 