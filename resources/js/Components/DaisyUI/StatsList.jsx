import React,{useContext, useEffect} from 'react';
import { StatsContext } from '@/Contexts/StatsContext';
import Stats from './Stats';

export default function StatsList() {
    const stats = useContext(StatsContext)
    return (
        <div className='flex flex-wrap justify-center'>
           
            {
                stats.map(s => <Stats stats={s} key={s.sortIndex}/>)
            }
            
    </div>
    )
}
