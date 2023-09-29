import React, { useState, useEffect } from 'react';
import Stats from './Stats';
import Alert from './Alert';
// import { instance } from '../../Contexts/api/instance'
import axios from 'axios';


export default function StatsList({ apitoken }) {
    const [statsData, setStatsData] = useState({ stats: [], errMessage: '', loading: true })

    let instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
    });

    useEffect(() => {
        instance.get('/home/Dashboard')
            .then(res => {
                setStatsData({ stats: res.data.value, errMessage: '', loading: false })
                console.log(res.data.value)
            })
            .catch(err => {
                setStatsData({ stats: [], errMessage: err.message, loading: false })
                console.log(err.message)
            })


    }, [])

    return (
        <div className='flex flex-wrap justify-center'>
            {
                statsData.loading && <span className="loading loading-spinner loading-lg"></span>
            }

            {
                statsData.stats ? statsData.stats.map(s => <Stats stats={s} key={s.sortIndex} />)
                    : <Alert msg='No Data Found' css='alert' />
            }

            {
                statsData.errMessage && <Alert msg={errMessage} css='alert alert-error' />
            }
        </div>
    )
}
