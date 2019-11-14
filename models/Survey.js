const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose//line 2 == line3
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
    title: String,
    body:String,
    subject:String,
    // arr of strings
    recipients:[RecipientSchema],
    //whether user want to take the survey
    yes:{ type: Number, default:0},
    no:{ type: Number, default:0},
    /*relational field*/
    //which survey is made by which user
    _user:{type: Schema.Types.ObjectId, ref:"users"},
    dateSent:Date,
    lastResponded: Date


})
mongoose.model('surveys',surveySchema)