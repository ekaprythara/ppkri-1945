export default function WarningButton({ children, ...props }) {
    return (
        <button
            {...props}
            className="py-2 px-4 rounded-lg text-base bg-yellow-500 text-white transition-color duration-100 font-inter focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50"
        >
            {children}
        </button>
    );
}
