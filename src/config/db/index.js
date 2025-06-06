const mongoose = require('mongoose')

async function connect() {
    try { //có await nên phải đưa vào function có async
        await mongoose.connect('mongodb://127.0.0.1/f8_nodeJS', {
            // useNewUrlParser: true, //Đảm bảo sử dụng trình phân tích cú pháp URL mới của MongoDB.
            // useUnifiedTopology: true, //Bật cơ chế quản lý kết nối mới, giúp cải thiện hiệu suất.
        });
        console.log("connect successful");

    } catch (error) {
        console.log('fail');
    }
}
module.exports = { connect }