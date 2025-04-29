const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  monthlyIncome: {
    type: Number
  },
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subscription'
    }
  ]
});

UserSchema.plugin(passportLocalMongoose, { 
  usernameField: 'phoneNumber'
});

module.exports = mongoose.model('User', UserSchema);
