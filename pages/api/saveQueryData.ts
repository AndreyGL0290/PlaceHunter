import { NextApiRequest, NextApiResponse } from "next";
import mongoConnect from "../../mongoDB/connect";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = JSON.parse(req.body);
    const session = await getSession(req, res);

    if (!session) res.status(403).json({ message: 'Not authorized'})
    
    const collection = await mongoConnect(process.env.DB, 'User');
    if (!req.cookies.inDB){
        let inDB = await collection.findOne({ userId: session.user.sub });
        if (!inDB) collection.insertOne({ userId: session.user.sub });
        res.setHeader('Set-Cookie', 'inDB=true; maxAge=900000')
    }

    let data2update = (await collection.findOne({ userId: session.user.sub })).queries

    if (data2update) {
        if (data2update[body.place]) data2update[body.place] += 1
        else data2update[body.place] = 1 
    } else {
        data2update = {}
        data2update[body.place] = 1
    }

    collection.updateOne({ userId: session.user.sub }, {$set: {queries: data2update}})

    res.status(200).json({ message: 'Successfully saved query data into db' });
}