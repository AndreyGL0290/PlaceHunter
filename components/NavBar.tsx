import ProfileWidget from "./ProfileWidget";
import { useRouter } from "next/router";

export default function NavBar() {
    let router = useRouter();
    return (
        <header>
            <div className="h-28 grid grid-cols-3 text-center bg-black text-white text-2xl [&_a]:navbar-button">
                <h1 className="font-bold text-xl text-white absolute left-2 top-0 phone:left-auto">Place Hunter</h1>
                <div className="navbar-div">
                    <a href='/about'>About</a>
                </div>
                <div className="navbar-div">
                    {
                    router.route.replace('/', '') == '' ?
                    <a href='/search' className="">Search</a> :
                    <a href='/' className="">Home</a>
                    }
                </div>
                <div className="navbar-div">
                    <a href="#footer" className="">Contact Us</a>
                </div>
                <ProfileWidget />
            </div>
        </header>
    )
}