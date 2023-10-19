import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Test = () =>
{
  const [startDate, setStartDate] = useState(Date.now());



  const onDateChange = (date) =>
  {
    const d = date.toLocaleDateString()
    // setStartDate(d)
    console.log(d)
  }

  return (
    <div style={ { margin: 'auto', width: '500px' } }>
      {/* <DatePicker selected={ startDate } onChange={ (date) => setStartDate(date) } /> */ }
      <DatePicker
        selected={ startDate }
        onChange={ (date) => onDateChange(date) }
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}


export default Test