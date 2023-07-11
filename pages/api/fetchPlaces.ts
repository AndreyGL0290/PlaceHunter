import { NextApiRequest, NextApiResponse } from "next"
import mongoConnect from "../../mongoDB/connect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const collection = await mongoConnect(process.env.DB, 'User');

    // Insert data in DB and then use to build some statistics charts
    
    let data = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${req.query['place']}&viewbox=${req.query['viewbox']}&bounded=1&format=json`).then(async res => {let d = await res.json(); return d})
    res.status(200).json([ ...data ])
}