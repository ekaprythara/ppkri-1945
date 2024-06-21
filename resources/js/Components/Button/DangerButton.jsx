export default function DangerButton({ children, ...props }) {
    return (
        <button
            {...props}
            className="py-2 px-4 rounded-lg text-base bg-red-600 text-white font-inter transition-color duration-100 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
        >
            {children}
        </button>
    );
}
