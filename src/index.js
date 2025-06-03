const path = require('path')
const express = require('express') //require('express') đí vào node_modules tải express ra và lưu vào biến express
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const app = express() //express() là chạy 1 function express có sẵn trong node_modules, hàm này sẽ trả về 1 đối tượng đại diện cho ứng dụng của mình, và mình sẽ dùng nó xuyên suột ứng dụng
const port = 3000 //run website ở cổng port nào 

//import routes
const route = require('./routes')

const db = require('./config/db')
//connect db
db.connect()

//đối với file tĩnh: css, img (http://localhost:3000/img/logo.webp)
//path.join(__dirname, 'public' trả về chính path của public(http://localhost:3000) sau khi gặp path này sẽ truy cập vào file tĩnh để hiển thị ra
app.use(express.static(path.join(__dirname, 'public'))) //express.static khi gặp path này, đối với file tĩnh, nó kiểm tra thư mục join cung cấp trong phương thức static


//mở body-parser trong express: cho body của phương thức post
app.use(express.urlencoded({
    extended: true  //option của thư viện express
})) //thông qua html, url
app.use(express.json()) //thông qua file js vd axios, fetch. XMLHttpRequest

//HTTP logger: quan sát được log của request từ client đến sever
app.use(morgan('combined'))

//Template engine
app.engine('hbs', engine({
    extname: '.hbs' //cách cập nhật lại đuôi file handlebars
})); //app này sử dụng Template engine là handlebars
app.set('view engine', 'hbs') //set là đặt cho ứng dụng express sử dụng view engine là handlebars
app.set('views', path.join(__dirname, 'resources', 'views'));

//route init
route(app);  //chuyền app vào route



/*
app.get('/', (req, res) => {
    // return res.send(//send dạng template string
    //     `<h1 style="color:red">Hello World</h1>`
    // )
    res.render('home');
})

//app. :là routes được express tạo sẵn
//action (get('/news') --> dispatcher --> fucntion handler( (req, res) => {res.render('news');} )
//dispatcher đọc action thấy khớp rồi sau đó mới thực thi fucntion handler
app.get('/news', (req, res) => {
    res.render('news');
})

app.get('/search', (req, res) => {
    //express được tích hợp sẵn query trong middleware, nên nó tự động lưu chỉ cần lấy ra dùng thôi
    console.log(req.query.q); //dùng cho get
    res.render('search');
})

app.post('/search', (req, res) => {
    //nếu biến body chưa được express tích hợp sẵn post cho middleware => cho nên sẽ trả về undefined
    console.log(req.body); //dùng cho post 
    console.log(req.body.q); //qs trong body-parser nhận vào form data trong phương thức post gán vào request (req) thành object body  
    res.send('');
    // res.render('search');
})
*/

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`) // localhost(host cụ bộ) -- hosting
}) //start create web sever và nạp vào ram
