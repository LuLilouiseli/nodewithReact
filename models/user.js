const mongoose = require('mongoose')
// const Schema = mongoose.Schema
const { Schema } = mongoose//line 2 == line3

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default:0}
})
mongoose.model('users',userSchema)