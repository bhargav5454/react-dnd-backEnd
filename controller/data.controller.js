const { default: mongoose } = require("mongoose");
const { dataSchema } = require("../model");
const { dataService } = require("../services");

const getData = async (req, res) => {
  try {
    const result = await dataService.getAllData();
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    // Handle the error
    console.error("Error retrieving data:", error);
  }
};

const addData = async (req, res) => {
  try {
    const body = req.body;
    const { updatedStatus, prevStatus } = body;
    const result = await dataService.addData(
      updatedStatus,
      prevStatus,
      body.itemId
    );
    res.status(201).json({
      message: "Data added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const body = req.body;
    const updatedData = await dataService.updateIndex(body);
    return res.status(200).json({
      message: "Data reordered successfully",
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getData, updateData, addData };
