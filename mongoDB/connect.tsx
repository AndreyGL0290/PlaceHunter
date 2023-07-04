import clientPromise from "./config";

export default async function mongoConnect(dbName: string, colName: string){
    const client = await clientPromise
    const db = client.db(dbName)
    const collection = db.collection(colName)
    return collection
}