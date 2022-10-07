import table, { findCoffeeStoreById } from "../../services/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const findCoffeeStoresRecord = await findCoffeeStoreById(id);
      if (findCoffeeStoresRecord.length !== 0) {
        const coffeeStoreRecord = { ...findCoffeeStoresRecord[0].fields };
        res.status(200).json(coffeeStoreRecord);
      } else {
        res.status(400).json({ message: "id doesn't exist" });
      }
    } else {
      res.status(400).json({ message: "id is messing" });
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong ", e });
  }
};

export default getCoffeeStoreById;
