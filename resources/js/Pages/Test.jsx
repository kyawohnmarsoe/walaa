import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Test = ({ apitoken }) =>
{
  console.log(apitoken)

  const [statsData, setStatsData] = useState({ stats: [], errMessage: '', loading: true })
  const { stats, errMessage, loading } = statsData

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${ apitoken }` }
  });

  useEffect(() =>
  {

    instance.get('/home/Dashboard')
      .then(res =>
      {
        setStatsData({ stats: res.data.value, errMessage: '', loading: false })
        // setStatsData({ stats: [], errMessage: '', loading: false })
        console.log(res.data.value)
      })
      .catch(err =>
      {
        setStatsData({ stats: [], errMessage: err.message, loading: false })
        console.log(err.message)
      })

  }, [])

  return (
    <div style={ { margin: 'auto', width: '500px' } }>

    </div>
  );
}


export default Test