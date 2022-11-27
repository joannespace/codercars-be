const express = require("express");
const {
  createCar,
  getCars,
  editCar,
  deleteCar,
  createCarList,
} = require("../controllers/car.controller");
const router = express.Router();

// CREATE
router.post("/", createCar);

// READ
router.get("/", getCars);

// UPDATE
router.put("/:id", editCar);

// // DELETE
router.delete("/:id", deleteCar);

module.exports = router;
