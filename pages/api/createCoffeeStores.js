import table, {
  findCoffeeStoreById,
  createCoffeeStore,
} from "../../services/airtable";

const createCoffeeStores = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id, name, address, neighborhood, imgUrl, voting } = req.body;
      // find record
      if (id) {
        const findCoffeeStoresRecord = await findCoffeeStoreById(id);
        if (findCoffeeStoresRecord.length !== 0) {
          const coffeeStoreRecord = { ...findCoffeeStoresRecord[0].fields };
          res.json(coffeeStoreRecord);
        } else {
          // create record
          if (name) {
            const createdRecord = await createCoffeeStore(
              id,
              name,
              address,
              neighborhood,
              voting,
              imgUrl
            );

            const records = { ...createdRecord[0].fields };
            res.status(201).json({ records });
          } else {
            res.status(400).json({ msg: "name is messing" });
          }
        }
      } else {
        res.status(400).json({ msg: "id is messing" });
      }
    } catch (e) {
      res.status(500).json({ msg: "Something went wrong " + e });
    }
  }
};

export default createCoffeeStores;
