const mongoose = require("mongoose");
const csv = require("csvtojson");
const Car = require("../models/Car");
const { findOne } = require("../models/Car");
const carController = {};

//POST A CAR
carController.createCar = async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error("Invalid Information");
      error.statusCode = 401;
      throw error;
    }

    const filter = req.body;

    const aCar = await Car.findOne(filter);
    if (!aCar) {
      const newCar = new Car({ ...req.body, isDeleted: false });

      newCar.$isNew;
      await newCar.save();

      const response = {
        message: "Create Car Successfully!",
        car: newCar,
      };

      res.status(200).send({ data: response });
    } else {
      const error = new Error(`Duplicated Car Information With ID ${aCar._id}`);
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

//GET CARS
carController.getCars = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    let offset = page * limit - limit;
    // let carList = await Car.find({});
    let carList = await Car.find({ isDeleted: false }).sort("-createdAt");
    const total = Math.ceil(carList.length / limit);
    carList = carList.slice(offset, offset + limit);

    let result = {
      message: "Get Car List Successfully!",
      cars: [...carList],
      page: 1,
      total: total,
    };

    res.status(200).send({ data: result });
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

//EDIT A CAR
carController.editCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: `${id}` };

    let updatedCar = await Car.findById(`${id}`);

    if (!updatedCar) {
      const error = new Error("Invalid Car's ID");
      error.statusCode = 401;
      throw error;
    } else {
      let update = req.body;

      updatedCar = await Car.findOneAndUpdate(filter, update, {
        returnOriginal: false,
      });

      res.status(200).send(updatedCar);
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

//DELETE A CAR
carController.deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = { _id: `${id}` };
    let deletedCar = await Car.findById(`${id}`);

    if (!deletedCar) {
      const error = new Error("Invalid Car's ID");
      error.statusCode = 401;
      throw error;
    } else {
      const update = { isDeleted: true };
      await Car.findOneAndUpdate(filter, update, {
        returnDocument: "after",
      });

      res.status(200).send({
        message: "Delete Car Successfully!",
        deletedCar,
      });
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

// //CREATE CAR DATA
// carController.createCarList = async (req, res, next) => {
//   try {
//     const cvsPath =
//       "/Users/joanne/Documents/NodeJS/codercars-be/controllers/data.csv";

//     let data = await csv().fromFile(cvsPath);
//     data.forEach((car) => {
//       const carData = new Car({
//         make: car.Make,
//         model: car.Model,
//         release_date: Number(car.Year),
//         transmission_type: car["Transmission Type"],
//         size: car["Vehicle Size"],
//         style: car["Vehicle Style"],
//         price: car.MSRP,
//         isDeleted: false,
//       });
//       carData.save();
//     });

//     let carList = await Car.find({});
//     console.log("done");
//     res.status(200).send(carList);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = carController;
