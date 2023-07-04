export default function NavBar() {
    return (
        <header>
            <h1 className="font-bold text-xl text-white absolute ml-2 mt-1">Place Hunter</h1>
            <div className="flex flex-row bg-black text-white text-2xl h-28 justify-evenly items-center">
                {/* {links.map(link => (
                    <div className="flex justify-center items-center w-full h-full">
                        <a href={link.href} key={link.name} className="text-center transition ease-in-out hover:scale-125">{link.name}</a>
                    </div>
                ))} */}
                <a href='/about' className="text-center transition ease-in-out hover:scale-125">About</a>
                <a href='/' className="text-center transition ease-in-out hover:scale-125" onLoad={e => {
                    console.log(location.href)
                    if (location.href.replace('/', '') === '') {
                        e.currentTarget.href = '/search';
                        e.currentTarget.textContent = 'Search';
                    }
                }}>Home</a>
                <a href="#footer" className="text-center transition ease-in-out hover:scale-125">Contact Us</a>
            </div>
        </header>
    )
}