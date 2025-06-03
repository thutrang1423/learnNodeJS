const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, require: true },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true },
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);

//model name này mongoose dẽ tự động đọc để convert ra dạng ký tự thường gạch dưới
// sau đó nó thêm thành số nhiều để suy ra collection của chúng ta

//giả dụ nếu chưa có collection trong database thì nó sẽ tự tạo ra collection với quy ước name theo dạng chữ thường lower case và số nhiều  