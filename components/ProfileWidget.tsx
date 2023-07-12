import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/router";

export default function ProfileWidget() {
    const { user } = useUser();
    const router = useRouter()
    return (
        <>
            {router.route.replace('/', '') != 'profile' ? (user ?
            <div className="absolute right-2 cursor-pointer [&_span]:hover:scale-105" onClick={(e) => {location.href='/profile'}}>
                <div className="flex justify-end">
                    <span className="text-xl mr-5 navbar-button">{user.name}</span>
                    <img src={user.picture} className="rounded-[50%] w-10 h-10"/>
                </div>
            </div> :
            <a href="api/auth/login" className="absolute right-2 text-xl">Login</a>) :
            <a href="api/auth/logout" className="absolute right-2 text-xl">Logout</a>
            }
        </>
    )    
}