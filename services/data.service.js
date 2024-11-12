const { dataSchema } = require("../model");

// Function to get all list

const getAllData = async () => {
  try {
    const doc = await dataSchema.findOne();
    return { data: doc.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "Failed to fetch data.", error };
  }
};

const addData = async (updatedStatus, prevStatus, itemId) => {
  try {
    const doc = await dataSchema.findOne();
    if (!doc) {
      throw new Error("Document not found.");
    }

    // Find the item index in the previous status array
    const itemIndex = doc.data[prevStatus].findIndex(
      (item) => item.id.toString() === itemId
    );
    if (itemIndex === -1) {
      throw new Error(
        `Item with id ${itemId} not found in ${prevStatus} array.`
      );
    }

    // Remove the item from the previous status array
    const [item] = doc.data[prevStatus].splice(itemIndex, 1);

    // Add the item to the updated status array
    doc.data[updatedStatus].push(item);

    // Mark the nested data as modified
    doc.markModified("data");
    await doc.save();

    return {
      success: true,
      message: "Item status updated successfully.",
      data: doc,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateIndex = async (body) => {
  try {
    const { sourceIndex, destinationIndex, status } = body;

    const dataDocument = await dataSchema.findOne();
    if (!dataDocument) {
      throw new Error("No data document found for item status update request ");
    }

    const itemsArray = dataDocument.data[status];
    if (!itemsArray) {
      throw new Error("  Couldn't find data document for status " + status);
    }

    if (
      sourceIndex < 0 ||
      destinationIndex < 0 ||
      sourceIndex >= itemsArray.length ||
      destinationIndex >= itemsArray.length
    ) {
      throw new Error(" Couldn't find source index ");
    }

    const reorderedItems = [...itemsArray];
    const [movedItem] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, movedItem);

    dataDocument.data[status] = reorderedItems;
    dataDocument.markModified(`data.${status}`);
    await dataDocument.save();
    return dataDocument.data[status];
  } catch (error) {
    throw new Error(`Error updating data at index: ${error.message}`);
  }
};

module.exports = {
  addData,
  getAllData,
  updateIndex,
};
