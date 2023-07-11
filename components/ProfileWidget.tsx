import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router";

export default function ProfileWidget() {
    const { user } = useUser();
    const router = useRouter()
    return (
        <>
            {(user && router.route.replace('/', '') != 'profile') && 
            <div className="w-72 absolute right-2 cursor-pointer" onClick={(e) => {location.href='/profile'}}>
                <div className="flex justify-end">
                    <span className="text-xl mr-5">{user.name}</span>
                    <img src={user.picture} className="rounded-[50%] w-10 h-10"/>
                </div>
            </div>}
        </>
    )    
}