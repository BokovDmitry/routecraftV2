export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center border border-transparent bg-gray-800 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            style={{ borderRadius : "30px", backgroundColor : "black", transition: "background-color 0.3s ease", }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#212121")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
            {children}
        </button>
    );
}
