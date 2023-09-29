import React,{useState, useEffect} from 'react';
import Stats from './Stats';
import Alert from '../../Components/DaisyUI/Alert';
// import {instance} from '../../api/instance'


export default function StatsList({ apitoken }) {
        const [statsData,setStatsData] = useState({stats:[],errMessage:'',loading:true})
        const {stats,errMessage,loading} = statsData

        const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IndhbGFhaW0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJSZXNlbGxlciIsIkFmZmlsaWF0ZUluZGV4IjoiNjMwMzEiLCJBZmZpbGlhdGVOYW1lIjoid2FsYWFsaW5rMSIsIkFwcGxpY2F0aW9uTmFtZSI6IlJlc2VsbGVyIiwibmJmIjoxNjk1OTc5MjI2LCJleHAiOjE2OTU5ODI4MjYsImlzcyI6ImJpbGxpbmdhcGkiLCJhdWQiOiJkMjZkMTFkZTUxYmE0YmE2YWQ0ZGVhZTc5ODY1Mzk4YiJ9.8hGh3RxzYuYwwBrt4vEOLFN7wK5Zgoycj7drBWeo9CY` }
        });

    useEffect(()=>{

       instance.get('/home/Dashboard')
        .then(res => {
            setStatsData({stats:res.data.value,errMessage:'',loading:false}) 
            console.log(res.data.value)
        })
        .catch(err => {
          setStatsData({stats:[],errMessage:err.message,loading:false})
          console.log(err.message)
        })

    },[])
   
    return (
        <div className='flex flex-wrap justify-center'>
            {
                loading && <span className="loading loading-spinner loading-lg"></span>
            }
            
           {
                stats.length && stats.map(s => <Stats stats={s} key={s.sortIndex}/>) 
               
           }

           {
                errMessage && <Alert msg={errMessage} css='alert alert-error'/>
           }
            
    </div>
    )
}
