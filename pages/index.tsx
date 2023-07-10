import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';

import mongoConnect from '../mongoDB/connect';

export default function Home({ props }) {
    const { error } = useUser();
    if (error) return <pre>{ error.message }</pre>;
    return (
        <div className='h-screen flex flex-col justify-evenly'>
            <div className='flex justify-evenly items-center mx-7 phone:flex-col'>
                <div className='w-1/2 phone:w-full phone:text-center'>
                    <h1 className='text-5xl mb-2 phone:text-4xl tablet:text-4xl'>Explore the world around You</h1>
                    <h1 className='text-3xl phone:text-2xl tablet:text-2xl'>Find what You like</h1>
                </div>
                <div className='flex w-1/2 justify-center phone:w-full'>
                    <img className='object-cover rounded-lg w-10/12 phone:w-full' src="https://images.pexels.com/photos/4905089/pexels-photo-4905089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo of a person exploring the map" />
                </div>
            </div>
            <div className='flex justify-center items-center text-center'>
                <a className='font-semibold text-xl py-5 px-16 rounded-md bg-beige-200 transition ease-in-out hover:bg-beige-100 hover:scale-105' href="/search">Try now</a>
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const session = await getSession(req, res)
    const users = await mongoConnect(process.env.DB, 'User')
    
    // Create db record if user is not in db yet
    const inDB = session ? (await users.find({ userId: session.user.sid }).toArray())[0] : false
    if (session !== null && !inDB) users.insertOne({ userId: session.user.sid })

    return {
        props: {}
    }
}
