import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

import getMostSearchedUp from "../../utils/getMostSearchedUp";
import mongoConnect from "../../mongoDB/connect";

export default function Profile({ statistics }) {
    const { user } = useUser();
    let mostSearchedUp = getMostSearchedUp(statistics)
    return (
        user &&
        <div className="flex flex-col justify-center items-center">
            <div className="my-16 text-center flex flex-col justify-center items-center">
                <h1 className="mb-10 text-2xl">Account data</h1>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-start items-center">
                        <img src={user.picture} alt='Profile photo' className="h-16 w-16"/>
                        <h1>{user.name}</h1>
                    </div>
                    <p>Email: {user.email}</p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-10 text-2xl">Statistics</h1>
                <p>Most searched up: <b>{mostSearchedUp}: {statistics[mostSearchedUp]}</b></p>
            </div>
        </div>
    )
}

export async function getServerSideProps({req, res}){
    const collection = await mongoConnect(process.env.DB, 'User')
    const session = await getSession(req, res);
    
    let statistics = (await collection.findOne({ userId: session.user.sub })).queries
    if (statistics === undefined) statistics = {};

    return {
        props: {statistics: statistics}
    }
}