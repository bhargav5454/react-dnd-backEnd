// controllers/data.controller.js
const DataModel = require("../model/data.model");

// Function to get all list

const getAllData = async () => {
  try {
    const doc = await DataModel.findOne();
    return {  data: doc.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Failed to fetch data.", error };
  }
};

// Function to update the item's status
const addData = async (updatedStatus, prevStatus, itemId) => {
  try {
    const doc = await DataModel.findOne();

    const itemIndex = doc.data[prevStatus].findIndex(
      (item) => item.id === itemId
    );
    if (itemIndex === -1) {
      throw new Error(
        `Item with id ${itemId} not found in ${prevStatus} array.`
      );
    }

    const [item] = doc.data[prevStatus].splice(itemIndex, 1);

    doc.data[updatedStatus].push(item);

    doc.markModified("data");
    await doc.save();

    return {
      success: true,
      message: "Item status updated successfully.",
      data: doc,
    };
  } catch (error) {
    console.error("Error updating item status:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  addData,
  getAllData,
};
