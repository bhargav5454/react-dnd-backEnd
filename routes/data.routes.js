const express = require("express");
const { dataController } = require("../controller");
const dataRoute = express.Router();

dataRoute.route("/get").get(dataController.getData);
dataRoute.route("/order-change").post(dataController.addData);
dataRoute.route("/update-index").post(dataController.updateData);
dataRoute.route("/add-new-column").put(dataController.addNewColumn);

module.exports = dataRoute;
