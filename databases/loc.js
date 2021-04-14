const mongoose = require("mongoose");

// var loc = new mongoose.Schema({
    
//         location : {
//           type: {type: String},
//           coordinates: {
//             type: [Number],
//             index: "2dsphere"
//           }
//         }
     
// });

const location = new mongoose.Schema({
  loc: {
    type: {
      type: String, // Don't do { location: { type: String } }
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere"
    }
  }
});
location.index({loc: '2dsphere'})
var loc = mongoose.model("loc", location);
module.loc = loc;
