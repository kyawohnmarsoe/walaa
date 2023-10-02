import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectOption({ className = '', options, ...props }, ref) {

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
                Select an option
            </option>
            {options.map((option) => (
                <option
                    key={option.index}
                    value={option.index}
                >
                    {option.name}
                </option>
            ))}

        </select>
    );
});
