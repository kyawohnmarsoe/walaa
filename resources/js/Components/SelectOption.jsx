import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectOption({ className = '', options, select_text = ' an option', ...props }, ref) {

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            key={options}
        >

            <option value="">
                Select {select_text}
            </option>
            {options.map((option) => (
                <option
                    key={option.index}
                    value={option.index}
                >
                    {option.name}
                </option>
            ))}

        </select >
    );
});
