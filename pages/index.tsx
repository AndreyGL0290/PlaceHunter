import { useUser } from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0'

import mongoConnect from '../mongoDB/connect'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Page({ props }) {

    const { user, error, isLoading } = useUser()
    // if (isLoading) return <h1>Loading...</h1>
    if (error) return <pre>{ error.message }</pre>
    return (
        <>
            {/* <NavBar /> */}
            <div className='flex flex-row justify-evenly items-center mt-32'>
                <div className='text-center w-1/2'>
                    <h1 className='text-5xl mb-2'>Explore World around You</h1>
                    <h1 className='text-3xl'>Find what You like</h1>
                </div>
                <div className='flex w-1/2 justify-center'>
                    <img className='object-cover rounded-lg w-3/4' src="https://images.pexels.com/photos/4905089/pexels-photo-4905089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Photo of a person exploring the map" />
                </div>
            </div>
            <div className='flex justify-center items-center w-full'>
                <div className='flex justify-center items-center bg-[#eee2de] text-center mt-32 w-48 h-16 rounded-md transition ease-in-out hover:bg-[#d6cbc8] hover:scale-105'>
                    <a className='font-semibold text-xl' href="/search">Try now</a>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const session = await getSession(req, res)
    const users = await mongoConnect(process.env.DB, 'User')

    // Create db record if user is not in db yet
    const inDB = session ? (await users.find({ userId: session.user.sid }).toArray())[0] : false
    if (session !== null && !inDB) users.insertOne({ userId: session.user.sid })
    
    let data = await users.find({ }).toArray()
    console.log(data)

    return {
        props: {}
    }
}
