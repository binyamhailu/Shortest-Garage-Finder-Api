const mongoose = require("mongoose");
const User = mongoose.model("userCollection");

module.exports = {
    async userRegistration(req, res) {
     var user=User();
     user.firstName=req.body.firstName,
     user.lastName=req.body.lastName,
     user.password=req.body.password,
     user.phoneNumber=req.body.phoneNumber
   
     user.save((err,user) => {
      
        if (err) {
          return res.status(403).send({
            error: "User already exist",
          });
        }
        if (user) {
          return res.status(201).send({user: user});
        }
      });
    },
    async findUser(req, res) {
        const userQuery = {
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
          };
          await User.findOne(userQuery, (err,user) => {
              if (user) {
                return res.status(201).send(user);
              }else{
                return res.status(403).send({
                    error: "User does't exist",
                  });
              }
          });
        },
    async findAllUsers(req, res) {
                      
            await User.find((err,user) => {
                if (user) {
                  return res.status(201).send({user: user});
                  }else{
                    return res.status(403).send({
                        error: "Problem getting the users",
                      });
                  }
              });
            },
    async updateUser(req, res) {
                await User.findOneAndUpdate({_id: req.body._id},req.body,{new: true},(err,user) => {
                    if (user) {
                        return res.status(201).send({user: user});
                         }else{
                           return res.status(403).send({
                             error: "Problem in updating",
                              });
                           }
                          });
                     },
    async deleteUser(req, res) {
        await User.deleteOne({_id: req.body._Id},(err,user) => {
            if (!err) {
              return res.status(201).send({status: 'deleted '});
                 }else{
                    return res.status(403).send({
                      error: "Problem in deleting",
                       });
                     }
                   });
                 },
}