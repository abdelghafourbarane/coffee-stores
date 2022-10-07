const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_COFFEE_STORES_ID
);

const table = base("coffee-stores");

export const findCoffeeStoreById = async (id) => {
  const findCoffeeStoresRecord = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return findCoffeeStoresRecord;
};

export const createCoffeeStore = async (
  id,
  name,
  address,
  neighborhood,
  voting,
  imgUrl
) => {
  const createdRecord = await table.create([
    {
      fields: {
        id,
        name,
        address,
        neighborhood,
        voting,
        imgUrl,
      },
    },
  ]);
  return createdRecord;
};

export const updateCoffeeStoreVoting = async (id, voting) => {
  const updatedCofeeStore = await table.update([
    {
      id: id,
      fields: {
        voting: voting
      }
    }
   
  ]);
  return updatedCofeeStore;
};

export default table;
