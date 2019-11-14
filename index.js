const express = require ('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/key')
require('./models/user')
require('./models/Survey')
require ('./services/passport')
mongoose.connect(keys.mongoURI)
const app = express()
//parse the body
app.use(bodyParser.json())

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
)
//tell passport to use cookie
app.use(passport.initialize())
app.use(passport.session())


require ('./routes/authRoutes')(app)
require ('./routes/billingRoutes')(app)
require ('./routes/surveyRoutes')(app)

//config for production
if(process.env.NODE_ENV==='production'){
    //express will serve up production assets main.js main.css
    app.use(express.static('client/build'))
    //express srve up the index.html file if not recognize the route
    const path = require('path')
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'))
    })
}

//if deployed on heroku env port will work, env defined by heroku
//local machine this might not work, need to add ||5000
const PORT = process.env.PORT||5000

app.listen(PORT)
