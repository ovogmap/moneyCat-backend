const express = require('express')
const app = express()

const port = process.env.PORT || 5000
const cors = require('cors')

const mongoose = require('mongoose')
const config = require('./config/key')

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./routes'))
app.use('/api', require('./routes/api'))

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
})
