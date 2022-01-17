const mongoose = require('mongoose')//-- Импортируем mongoose

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
})


module.exports = mongoose.model('User', userSchema)