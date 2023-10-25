import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Test = ({ apitoken }) =>
{
  const data = {
    TargetAffiliateIndex: '61304',
    Amount: '0',
    DepositPassword: '666666666'
  }
  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${ apitoken }` }
  });

  useEffect(() =>
  {
    instance.post('/affiliate/deposit/transferBalance', data)
      .then(res =>
      {
        console.log(res.data)
      })
      .catch(err =>
      {
        // setMain({ ...main, failMessage: err.message })
        console.log(err.message)
      })
  }, [])

  return (
    <div style={ { margin: 'auto', width: '500px' } }>
      Testing...
    </div>
  );
}


export default Test