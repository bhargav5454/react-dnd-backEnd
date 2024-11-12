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
    const { sourceIndex, destinationIndex } = req.body; // Get indices from the request body
    const itemId = req.params.id; // Get the document ID

    // Find the document
    const dataDocument = await table.findById(itemId);
    if (!dataDocument) {
      return res.status(404).json({ message: "Data not found" });
    }

    const { items } = dataDocument; // Assuming 'items' is the array field you want to reorder
    if (
      sourceIndex < 0 ||
      destinationIndex < 0 ||
      sourceIndex >= items.length ||
      destinationIndex >= items.length
    ) {
      return res.status(400).json({ message: "Invalid indices" });
    }

    // Perform reordering
    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(sourceIndex, 1); // Remove the item at sourceIndex
    reorderedItems.splice(destinationIndex, 0, movedItem); // Insert it at destinationIndex

    // Update and save the document
    dataDocument.items = reorderedItems;
    await dataDocument.save();

    return res.status(200).json({ message: "Data reordered successfully", data: reorderedItems });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getData, updateData, addData };
