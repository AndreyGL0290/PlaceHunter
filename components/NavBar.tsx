import ProfileWidget from "./ProfileWidget";
import { useRouter } from "next/router";

export default function NavBar() {
    let router = useRouter();
    return (
        <header>
            <div className="h-28 grid grid-cols-3 text-center bg-black text-white text-2xl">
                <h1 className="font-bold text-xl text-white absolute left-2 top-0 phone:left-auto">Place Hunter</h1>
                <div className="navbar-div">
                    <a href='/about' className="transition ease-in-out hover:scale-125">About</a>
                </div>
                <div className="navbar-div">
                    {
                    router.route.replace('/', '') == '' ?
                    <a href='/search' className="transition ease-in-out hover:scale-125">Search</a> :
                    <a href='/' className="text-center transition ease-in-out hover:scale-125">Home</a>
                    }
                </div>
                <div className="navbar-div">
                    <a href="#footer" className="transition ease-in-out hover:scale-125">Contact Us</a>
                </div>
                <ProfileWidget />
            </div>
        </header>
    )
}