let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;
let shortid = require('shortid');

let UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  stream_key: String
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateStreamKey = function() {
  return shortid.generate();
};

module.exports = UserSchema;
