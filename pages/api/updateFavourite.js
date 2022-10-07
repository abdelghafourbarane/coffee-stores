import table,{
  findCoffeeStoreById,
  updateCoffeeStoreVoting,
} from "../../services/airtable";

const updateFavourite = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const { id } = req.body;
      if (id) {
        const coffeeStoreById = await findCoffeeStoreById(id);
        if (coffeeStoreById.length !== 0) {
          const record = coffeeStoreById[0];
          const updatedCoffeeStore = await updateCoffeeStoreVoting(record.id, record.fields.voting+1);
          if(updatedCoffeeStore){
            res.status(200).json(updatedCoffeeStore[0].fields);
          }else{
            res.status(304).json({message:"The coffeStore votiong wasn't incremented"})
          }
        } else {
          res.status(400).json({ msg: "Id wasn't found" });
        }
      } else {
        res.status(400).json({ msg: "Id is messing " });
      }
    } catch (e) {
      res.status(500).json({ msg: "Something went wrong " + e });
    }
  }
};

export default updateFavourite;
