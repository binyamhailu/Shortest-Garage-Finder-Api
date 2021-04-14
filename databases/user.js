const mongoose = require("mongoose");
mongoose.pluralize(null);

var userSchema = new mongoose.Schema({
  firstName:{type: String},
  lastName:{type: String},
password: {type: String},
  phoneNumber:{type: String,
    unique: true} 
});
var userSchema = mongoose.model("userCollection", userSchema);
module.userSchema = userSchema;
