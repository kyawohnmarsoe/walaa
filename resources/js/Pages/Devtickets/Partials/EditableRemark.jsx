import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EditableRemark({ initialText, remarkId, children, ...props }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState({
        remarks: initialText,
    });

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setText({ remarks: e.target.value })
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Save the changes or perform any required actions here
        router.post(`/device/tickets/update/remark/${remarkId}`, text);
        // console.log(remarkId)
        // console.log(text.remarks)
    };

    return (
        <div {...props} contentEditable="true" onDoubleClick={handleDoubleClick} className='flex'>
            <svg className="w-[16px] h-[18px] text-teal-800 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.6" d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z" />
            </svg>
            {children}
            {isEditing ? (
                <input
                    type="text"
                    name="remarks"
                    value={text.remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            ) : (
                <span>{text.remarks}</span>
            )}

        </div>
    );
};
