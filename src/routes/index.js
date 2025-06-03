const newsRouter = require('./route.news')
const homeRouter = require('./route.site')
const courseRouter = require('./route.courses')

function route(app) {
    app.use('/news', newsRouter)
    app.use('/courses', courseRouter)
    app.use('/search', homeRouter)
    app.use('/', homeRouter)
}

module.exports = route