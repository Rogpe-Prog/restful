const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/minhas-series-rest'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

app.use(express.urlencoded({ extended: true }))

const series = require('./routes/series')

app.use('/series', series)


mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=> {
        app.listen(port, ()=> console.log('listening....'))
    })
    .catch(e => console.log(e))