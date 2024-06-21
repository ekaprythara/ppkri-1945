import AuthenticatedNavbar from "@/Components/AuthenticatedNavbar";

export default function Authenticated({ user, children }) {
    return (
        <div className="h-16 bg-white shadow ">
            <AuthenticatedNavbar user={user} />
            <main className="bg-[#EEF7FF] min-h-[calc(100vh-4rem)] pb-20">
                {children}
            </main>
        </div>
    );
}
