const express = require('express') //require('express') đí vào node_modules tải express ra và lưu vào biến express
const app = express() //express() là chạy 1 function express có sẵn trong node_modules, hàm này sẽ trả về 1 đối tượng đại diện cho ứng dụng của mình, và mình sẽ dùng nó xuyên suột ứng dụng
const port = 3000 //run website ở cổng port nào 

//get('/' router / (req, res) => { around function
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
