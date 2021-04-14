const mongoose = require("mongoose");
mongoose.pluralize(null);

var garageSchema = new mongoose.Schema({
    garageName:{type: String},
    userName:{type:String,unique: true},
    password:{type:String},
    phoneNumber:{type: String, unique: true},
    location: {
          type: {
            type: String, 
            enum: ['Point'], 
            // required: true
          },
          coordinates: {
            type: [Number],
            // required: true,
            index: "2dsphere"
          }
        }
     
});

garageSchema.index({location: '2dsphere'})

var garageSchema = mongoose.model("garageCollection", garageSchema);
module.garageSchema = garageSchema;
