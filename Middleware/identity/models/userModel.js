const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const argon2 = require('argon2');
const crypto = require('crypto');
const Schema = mongoose.Schema,
    // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    forename: String,
    surname: String,
    email: {type: String, lowercase:true, index: {unique: true},
        required: [true,'cannot be undefined'], match: [/\S+@\S+\.\S+/, 'is invalid']},
    username: { type: String, lowercase:true, index : {unique: true}, immutable: true,
        required: [true,'cannot be undefined'], match: [/^[a-zA-Z][a-zA-Z0-9_]+$/, 'is invalid']},
    password: {type: String, required: true},

    permissions: { type: Number, default: 0, min: 0, max: 2147483647 },
    role:{type:String, enum:["admin","surfer","member"]},
    //loginAttempts: { type: Number, required: true, default: 0 },
    //lockUntil: { type: Number , default: 0}
    created_at:{type:Date, default:Date.Now}
}, {timestamps: true});

UserSchema.statics.createIdentity = (infos)=> {
    const user = new mongoose.model("User", UserSchema)(infos);
    return user.save();
};

//---------------- Create Some other virtual attr
UserSchema.virtual('fullName')
    .get( () => { return this.forename + ' ' + this.surname; })
    .set( (v) => {
        this.forename = v.substr(0, v.lastIndexOf(' '));
        this.surname = v.substr(v.lastIndexOf(' ') + 1)
    });

UserSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});








//-----------------------------------Methods-----------------------------------
UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    let updates = {$inc: {loginAttempts: 1}};
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.updateOne(updates, cb);
};
UserSchema.methods.grantPermission = (permission) => {
    this.permissions |= (1<<permission);
};
UserSchema.methods.revokePermission = (permission) => {
    this.permissions &= ~(1<<permission);
};
UserSchema.methods.hasPermission = (permission) => {
    return (this.permissions & (1<<permission) ) !== 0;
};


UserSchema.methods.generateJWT = function() {
      const today = new Date();
      const exp = new Date(today);
      exp.setDate(today.getDate() + 60);

          return jwt.sign({
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000),
          }, secret);
    };

UserSchema.methods.toAuthJSON = function(){
      return {
          forename: this.forename,
          surname: this.surname,
          email: this.email,
          username:this.username,
          token: this.generateJWT(),

      };
    };








//-------------------- Statics--------------
UserSchema.statics.persissionSet = {
    SURFER: 0, //Read Only Access To all the Cloud of Things Resources
    DEVICE_CONTROLLER: 7, //Update device configuration and send commands to devices
    MEMBER:15, //Create and Delete Devices from Registries
    MODERATOR: 22, //Read-Write access to all the Cloud of Things Resources excluding managing users
    MASTER:30 //Full Access To  all the Cloud of Things Resources including managing all users
};

const reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

UserSchema.statics.findByUsername = (username)=> {
    return mongoose.model("User", UserSchema).find({username : username});
};














//----------------register the plugin with our model to enable the unique validator----------------------------------
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});







//----------------Make our Model accessable -----------
const User=mongoose.model('User', UserSchema);
module.exports = User;