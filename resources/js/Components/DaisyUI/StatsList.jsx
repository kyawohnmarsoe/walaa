import React,{useContext, useEffect} from 'react';
import { StatsContext } from '@/Contexts/StatsContext';
import Stats from './Stats';
import Alert from './Alert';

export default function StatsList() {
    const {stats,errMessage,loading} = useContext(StatsContext)
   
    return (
        <div className='flex flex-wrap justify-center'>
            {
                loading && <span className="loading loading-spinner loading-lg"></span>
            }
            
           {
                stats ? stats.map(s => <Stats stats={s} key={s.sortIndex}/>) 
                : <Alert msg='No Data Found' css='alert'/>
           }

           {
                errMessage && <Alert msg={errMessage} css='alert alert-error'/>
           }
            
    </div>
    )
}
