const path = require('path')
const express = require('express') //require('express') đí vào node_modules tải express ra và lưu vào biến express
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const app = express() //express() là chạy 1 function express có sẵn trong node_modules, hàm này sẽ trả về 1 đối tượng đại diện cho ứng dụng của mình, và mình sẽ dùng nó xuyên suột ứng dụng
const port = 3000 //run website ở cổng port nào 

//đối với file tĩnh
//path.join(__dirname, 'public' trả về chính path của public
app.use(express.static(path.join(__dirname, 'public'))) //express.static khi gặp path này, đối với file tĩnh, nó kiểm tra thư mục join cung cấp trong phương thức static

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', engine({
    extname: '.hbs' //cách cập nhật lại đuôi file handlebars
})); //app này sử dụng Template engine là handlebars
app.set('view engine', 'hbs') //set là đặt cho ứng dụng express sử dụng view engine là handlebars
app.set('views', path.join(__dirname, 'resources\\views'));


//get('/' router / (req, res) => { around function
app.get('/', (req, res) => {
    // return res.send(//send dạng template string
    //     `<h1 style="color:red">Hello World</h1>`
    // )
    res.render('home');
})

app.get('/news', (req, res) => {
    res.render('news');
})

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
