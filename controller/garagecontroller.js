const mongoose = require("mongoose");
const Garage = mongoose.model("garageCollection");
const Loc = mongoose.model("loc");

module.exports = {
  async garageRegistration(req, res) {
    var garage=Garage();
    garage.garageName=req.body.garageName,
    garage.userName=req.body.userName,
    garage.password=req.body.password,
    garage.phoneNumber=req.body.phoneNumber
  
    garage.save((err,garage) => {
    
       if (err) {
         console.log(err);
         return res.status(403).send({
           error: "garage already exist",
         });
       }
       if (garage) {
         return res.status(201).send(garage);
       }
     });
   },
    async findGarage(req, res) {
      const garageQuery = {
          phoneNumber: req.body.phoneNumber,
          password:req.body.password
        };
        await Garage.findOne(garageQuery, (err,garage) => {
            if (garage) {
              return res.status(201).send(garage);
            }else{
              return res.status(403).send({
                  error: "Garage does't exist",
                });
            }
        });
      },
    async findAllGarages(req, res) {
                      
            await Garage.find((err,garage) => {
                if (garage) {
                  return res.status(201).send({garage: garage});
                  }else{
                    return res.status(403).send({
                        error: "Problem getting the Garage",
                      });
                  }
              });
            },
    async updateGarage(req, res) {
                await Garage.findOneAndUpdate({_id: req.body._id},req.body,{new: true},(err,garage) => {
                    if (garage) {
                        return res.status(201).send({garage: garage});
                         }else{
                           return res.status(403).send({
                             error: "Problem in updating",
                              });
                           }
                          });
                     },
    async deleteGarage(req, res) {
        await Garage.deleteOne({_id: req.body._Id},(err,garage) => {
            if (!err) {
              return res.status(201).send({status: 'Deleted '});
                 }else{
                    return res.status(403).send({
                      error: "Problem in deleting",
                       });
                     }
                   });
                 },
    async addDetail(req, res) {
      const garageQuery = {
        _id: req.body._id
      };
      await Garage.findOneAndUpdate(
        garageQuery,
        {
        
              
                "location": {
                  "type": "Point",
                  "coordinates": [req.body.longitude,req.body.latitude]
                
          },
        },
        { upsert: true, new: true, useFindAndModify: false },(err,garage) => {
          if (!err) {
            return res.status(201).send({garage});
               }else{
                  return res.status(403).send({
                    error: "Problem in adding",
                     });
                   }
        }
        
      );
   },
//    async findNearByGarages(req, res) {
//     const garageQuery = {
      
//     };   
//     await Garage.find({"branches.latitude": {
// $gte: req.body.latitude,
// $lt: req.body.latitude+1,
//     } },(err,garage) => {
//         if (garage) {
//           return res.status(201).send({garage: garage});
//           }else{
//             return res.status(403).send({
//                 error: "Problem getting the Garage",
//               });
//           }
//       });
//     },

async findNearByGarages(req, res) {
    
  await Garage.find({
    location: {
      $near :{
        $geometry: {
          type: "Point", 
          coordinates: [ req.body.longitude, 
            req.body.latitude]
        },
        //  $minDistance: 100000,
        //  $maxDistance: 10000000
        }
      }
    }, (err,garage) => {
      
      if (garage) {
        return res.status(201).send({garage: garage});
        }else{
          return res.status(403).send({
            error: "no near by garage",
          });
        }
    }).limit(10);

  //   var loc=Loc();
  //   loc.loc.type="Point";
  //   loc.loc.coordinates=[ 1.1234, 
  //               2.456];
    
  
  //   loc.save((err,location) => {
  //    if (location) {
  //      return res.status(201).send({location: location});
  //    }
  //      if (err) {
  //        console.log(err);
  //        return res.status(403).send({
  //          error: "User already exist",
  //        });
  //      }
      
  //    });

  // },

  }

} 