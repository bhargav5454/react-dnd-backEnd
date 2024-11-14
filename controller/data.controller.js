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
    const { updatedStatus, prevStatus, newIndex } = body;
    const result = await dataService.addData(
      updatedStatus,
      prevStatus,
      body.itemId,
      newIndex
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

const addNewColumn = async (req, res) => {
  try {
    const body = req.body;
    const result = await dataService.addNewColumn(body.columnName);
    res.status(201).json({
      message: "New column added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getData, updateData, addData, addNewColumn };
