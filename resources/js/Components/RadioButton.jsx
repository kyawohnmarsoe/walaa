import React from "react";

export default function RadioButton ()
{
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event) =>
    {
        setSelectedValue(event.target.value);
    };

    return <div>
        <label>
            <input
                type="radio"
                value="option1"
                checked={ selectedValue === 'option1' }
                onChange={ handleRadioChange }
            />
            Option 1
        </label>
        <br />
        <label>
            <input
                type="radio"
                value="option2"
                checked={ selectedValue === 'option2' }
                onChange={ handleRadioChange }
            />
            Option 2
        </label>
    </div>
}
