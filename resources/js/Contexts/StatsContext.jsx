import React,{useState,useEffect,createContext} from "react";
import {instance} from './api/instance'

export const StatsContext = createContext();

export default function StatsContextProvider(props) {
    const [stats,setStats] = useState([])

    useEffect(()=>{
       instance.get('/home/Dashboard')
        .then(res => {
            setStats(res.data.value)
            console.log(res.data.value)
        })
        .catch(err => console.log(err))
    },[])

  return (
    <StatsContext.Provider value={stats}>
        {props.children}
    </StatsContext.Provider>
  )
}
