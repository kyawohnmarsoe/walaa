import { forwardRef, useEffect, useRef } from 'react';
import TextareaAutoSize from 'react-textarea-autosize';

export default forwardRef(function Textarea({ className = '', ...props }, ref) {

    return (
        <TextareaAutoSize
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            minRows={5}
        />
    );
});
