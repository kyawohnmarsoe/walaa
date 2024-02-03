import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import PaymentSearch from "./PaymentSearch";
import PaginatedLinks from '@/Components/PaginatedLinks';


export default function Payments ({ customers,payments ,auth }) {
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
  return (
      <AuthenticatedLayout
          user={ auth.user }
          header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Payments</h2> }
      >
          <Head title="Payments" />
          <PaymentSearch
              className='p-4'
              customers={ customers }
             
          />
          

          <div className="py-12 ">
              <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <div className="text-gray-900">
                          <div className='flex items-center justify-end gap-4 p-2'>
                             
                          </div>

                          <PaginatedLinks
                              itemsPerPage={ filterObj.RowCount }
                              items={ payments }
                              tableName="payments"
                              setFilterObj={ setFilterObj }
                              filterObj={ filterObj }
                          />

                      </div>
                  </div>
              </div>
          </div>

      </AuthenticatedLayout>
  )
}
