export default function PrimaryButton({ children, ...props }) {
    return (
        <button
            {...props}
            className="py-2 px-4 rounded-lg text-base bg-blue-600 transition-color duration-100 text-white font-inter focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
        >
            {children}
        </button>
    );
}
