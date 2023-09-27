import React,{useState,useEffect,createContext} from "react";
import {instance} from './api/instance'

export const StatsContext = createContext();

export default function StatsContextProvider(props) {
    const [statsData,setStatsData] = useState({stats:[],errMessage:'',loading:true})

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
    <StatsContext.Provider value={statsData}>
        {props.children}
    </StatsContext.Provider>
  )
}
