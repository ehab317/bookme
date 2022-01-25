const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

// routes
const userRoutes = require('./routes/user');
const businessRoutes = require('./routes/business');
const unitRoutes = require('./routes/units');
const eventRoutes = require('./routes/events');

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// use routes
app.use('/api', userRoutes);
app.use('/api', businessRoutes);
app.use('/api', unitRoutes);
app.use('/api', eventRoutes);


mongoose.connect(process.env.DATABASE).then(() => console.log('mongoDB connected...'))
.catch((err) => console.log('DB connection error: '+err))


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('app is running on port ' + port)
})