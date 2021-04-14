const userController = require("../controller/userController");
const garagecontroller = require("../controller/garagecontroller");


module.exports = (app) => {

  //user actions
  app.post("/saveUser", userController.userRegistration); 
  app.post("/findUser", userController.findUser);
  app.get("/findAllUsers", userController.findAllUsers);
  app.post("/updateUser", userController.updateUser);
  app.post("/deleteUser", userController.deleteUser);
//garage actions
 app.post("/saveGarage", garagecontroller.garageRegistration); 
  app.post("/findGarage", garagecontroller.findGarage);
  app.get("/findAllGarages", garagecontroller.findAllGarages);
  app.post("/updateGarage", garagecontroller.updateGarage);
  app.post("/deleteGarage", garagecontroller.deleteGarage);
  app.post("/addDetail", garagecontroller.addDetail);
  app.post("/findNearByGarages", garagecontroller.findNearByGarages);
};
