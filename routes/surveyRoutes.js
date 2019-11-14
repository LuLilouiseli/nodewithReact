const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate')
module.exports = app =>{
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send('thanks for voting!')
    })
    /*post: create a new survey*/
    //make sure the user is logged in
            //make sure the user has enough credits
    app.post('/api/surveys',requireLogin,requireCredits,(req,res)=>{
           const {title, subject, body, recipients} = req.body
           const survey = new Survey({
               //title: title, or simply because name are the same
               title,
               subject,
               body,
               /*embedded documents!!*/
               //split the array on ",", map each
               recipients: recipients.split(',').map(email=>{
                   return{email: email.trim()}
               }),
               /*short expression: but this does not trim spaces
                recipients: recipients.split(',').map(email=> ({ email }))
               */
              _user: req.user.id,
              //date 
              dateSent: Date.now()

           })

           //send an email
           const mailer = new Mailer(survey, surveyTemplate)
           try{
             mailer.send()

           //save to db
            survey.save()
           req.user.credits-=1
           const user = req.user.save()
           res.send(user)
        }catch(err){
            //422:unprocessable property
            res.status(422).send(err)
        }



    })
}