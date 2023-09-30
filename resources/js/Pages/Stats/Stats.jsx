
import React from 'react';

export default function Stats({stats}) {
 
  return (

    <div className="stats shadow text-center md:basis-1/6 basis-1/4 mx-2 mb-3">
      <div className="stat">
        <div className="stat-value" style={{color:stats.itemColor}}>{stats.itemValue}</div>
        <div className="stat-title">{stats.itemName}</div>
        {/* <div className="stat-desc">21% more than last month</div> */}
      </div>
      
    </div>

  )
}





