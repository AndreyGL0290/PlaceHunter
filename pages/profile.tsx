import { useUser } from "@auth0/nextjs-auth0/client"

export default function Profile() {
    const { user } = useUser();
    return (
        user &&
        <div className="flex flex-col justify-center items-center">
            <h1>Your account data</h1>
            <div className="text-center h-72 flex flex-col justify-center w-96">
                <img src={user.picture} alt='Profile photo'/>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        </div>
    )
}