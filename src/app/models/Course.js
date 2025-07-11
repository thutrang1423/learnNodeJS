const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema({
    _id: { type: Number },
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true }, //Tạo baseSlug từ name
    // createAt: { type: Date, default: Date.now },
    // updateAt: { type: Date, default: Date.now },
}, {
    _id: false,//giúp cho mongodb không truy cập vào trường này
    timestamps: true,
});


const slugify = require('slugify');

// Middleware tạo slug duy nhất
Course.pre('save', async function (next) { //pre-save middleware: Nó chạy trước khi Course được lưu vào MongoDB. next() là hàm callback để tiếp tục quá trình lưu.
    if (!this.slug && this.name) { //Nếu đối tượng chưa có slug mà có name, thì tiến hành tạo slug. this ở đây là document Course đang được lưu.
        const baseSlug = slugify(this.name, { lower: true, strict: true }); //{ lower: true }: chuyển thành chữ thường, { strict: true }: bỏ ký tự đặc biệt (chỉ giữ chữ cái, số và dấu -).
        let uniqueSlug = baseSlug; //uniqueSlug sẽ là slug cuối cùng để lưu.
        let count = 1; //Dùng để tăng số đếm nếu có trùng slug.

        // Kiểm tra trùng lặp
        while (await mongoose.models.Course.findOne({ slug: uniqueSlug })) { //Tìm trong MongoDB xem đã có khóa học nào trùng slug chưa.
            uniqueSlug = `${baseSlug}-${count++}`; //Thêm hậu tố -1, -2,... để tạo slug mới không trùng.
        }

        this.slug = uniqueSlug;//Gán slug mới cho document.
    }
    next();//Tiếp tục quá trình lưu document.
});


const mongooseDelete = require('mongoose-delete')
// const { softDeleteModel } = require('mongoose-delete')
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

Course.plugin(AutoIncrement)


module.exports = mongoose.model('Course', Course);

//model name này mongoose dẽ tự động đọc để convert ra dạng ký tự thường gạch dưới
//sau đó nó thêm thành số nhiều để suy ra collection của chúng ta

//giả dụ nếu chưa có collection trong database thì nó sẽ tự tạo ra collection với quy ước name theo dạng chữ thường lower case và số nhiều  