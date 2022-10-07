import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const fetchCoffeeStores = async (longLat, limit, query) => {
  const response = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${longLat}&query=${query}&v=20220906&limit=${limit}`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_ACCESS_TOKEN,
      },
    }
  );
  const data = await response.json();
  const imagesResp = await unsplashApi.search.getPhotos({
    query: "coffee stores",
    page: 1,
    perPage: 40,
  });
  // const images=imagesResp.response.results;
  const images=imagesResp.response.results;
  const coffeeStores = data.results.map((infos,index)=> {
    return {
      ...infos,
      imgUrl:images[index].urls.regular
    }
  })
  return coffeeStores;
};

export const getCoffeeStores = async (latLong="43.65267326999575,-79.3954561572501",limit=20) => {
  return await fetchCoffeeStores(
    latLong,
    limit,
    "coffee stores"
  );
};
