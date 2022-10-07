// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCoffeeStores } from "../../services/coffee-stores";

export default async function handler(req, res) {
    try {
        const {latLong,limit}=req.query;
        const coffeeStores=await getCoffeeStores(latLong,limit)
        res.status(200).json({coffeeStores})
    }catch(err){
        res.status(500).json({error:err})
    }
  }
  