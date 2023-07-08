import { useRouter } from "next/router";

export default function NavBar() {
    let router = useRouter();
    return (
        <header>
            <div className="h-28 grid grid-cols-3 text-center bg-black text-white text-2xl [&_div]:flex [&_div]:items-center [&_div]:justify-center">
                <h1 className="font-bold text-xl text-white absolute left-2 top-0 phone:left-auto">Place Hunter</h1>
                <div>
                    <a href='/about' className="transition ease-in-out hover:scale-125">About</a>
                </div>
                <div>
                    {
                    router.route.replace('/', '') == '' ?
                    <a href='/search' className="transition ease-in-out hover:scale-125">Search</a> :
                    <a href='/' className="text-center transition ease-in-out hover:scale-125">Home</a>
                    }
                </div>
                <div>
                    <a href="#footer" className="transition ease-in-out hover:scale-125">Contact Us</a>
                </div>
            </div>
        </header>
    )
}