const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: false
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)