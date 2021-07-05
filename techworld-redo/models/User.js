const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userid: {
    type: Number,
  },
  email: {
    type: String,
  },
  interests: {
    type: String,
  },
  name: {
    type: String,
  },
})

module.exports = mongoose.model('users', UserSchema)
