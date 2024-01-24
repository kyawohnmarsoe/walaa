import React from "react";
import { Link } from "@inertiajs/react";

export default function TicketsList({tickets}) {
  return(
      <div>
         
          <div className='grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3 gap-1'>

            
                      <div className="stats shadow text-center md:basis-1/6 basis-1/4 mx-2 mb-3" >
                         <Link href={ route('tickets') }>
                              <div className="stat py-1">
                                  <div className="stat-value text-xl" style={ { color: 'red' } }>{ tickets.length }</div>
                                  <div className="stat-title text-sm">Open Tickets</div>
                              </div>
                          </Link>
                      </div>
                

              {/* {
                  tickets?.map(s => (
                      <div className="stats shadow text-center md:basis-1/6 basis-1/4 mx-2 mb-3" key={s}>
                          <Link href={'#'}>
                              <div className="stat py-1">
                                  <div className="stat-value text-xl" style={ { color: 'red' } }>{ tickets }</div>
                                  <div className="stat-title text-sm">{ tickets }</div>
                              </div>
                          </Link>
                      </div>
                  ))
              } */}
          </div>
      </div>
  )
}
