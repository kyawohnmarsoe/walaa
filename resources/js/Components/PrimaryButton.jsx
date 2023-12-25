export default function PrimaryButton({ className = '', disabled, padding_x, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center ${padding_x ? padding_x : 'px-4'} py-1 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
