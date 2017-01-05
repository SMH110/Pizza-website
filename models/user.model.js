const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

let User = new Schema({
    email: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true }
});


User.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

User.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);