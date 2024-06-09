import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="mt-16">{children}</div>
            <Footer />
        </>
    );
}
