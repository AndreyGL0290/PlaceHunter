import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
    return (
        <>
            <div className='flex flex-col h-screen'>
            <NavBar />
            <div className='flex-grow'>
                <main>{children}</main>
            </div>
            <Footer />
            </div>
        </>
    )
}