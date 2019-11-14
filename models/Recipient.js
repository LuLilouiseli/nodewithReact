const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose//line 2 == line3

const recipientSchema = new Schema({
    email:String,
    responded: {type: Boolean, default: false}
})
mongoose.model('recipient',recipientSchema)