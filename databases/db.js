const mongoose = require("mongoose");
var url = "mongodb://localhost:27017/Door_TO_Door";

mongoose.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    (err) => {
      if (!err) {
        console.log("Database connected");
      } else console.log(err);
    }
  );

  require('./user');
  require('./garage');
  require('./loc');