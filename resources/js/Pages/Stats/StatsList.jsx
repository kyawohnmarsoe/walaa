import React, { useState, useEffect } from 'react';
import Stats from './Stats';
import Alert from '../../Components/DaisyUI/Alert';
import Loading from '@/Components/DaisyUI/Loading';

export default function StatsList ({ apitoken })
{
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
    // <div className='flex flex-wrap justify-center'>
    <div>
      { loading && <Loading /> }
      { errMessage && <Alert msg={ errMessage } /> }

      <div className='grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-1'>
        {
          stats?.map(s => <Stats stats={ s } key={ s.sortIndex } />)
        }
      </div>
    </div>
  )
}
