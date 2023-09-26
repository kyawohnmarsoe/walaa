import { StatsContext } from '@/Contexts/StatsContext';
import React,{useContext, useEffect} from 'react';

export default function Stats() {
  const stats = useContext(StatsContext)
  useEffect(()=>{console.log('stats')},[])
  return (
    <div className="stats shadow">
  
      <div className="stat">
        <div className="stat-title">
        {
          stats.map(s => s.itemName)
        }
        </div>
        <div className="stat-value">89,400</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      
    </div>
  )
}





