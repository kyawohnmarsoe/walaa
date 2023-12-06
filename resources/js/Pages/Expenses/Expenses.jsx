import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaginatedLinks from '@/Components/PaginatedLinks';
import ExpenseTable from './ExpenseTable'
import ExpenseSearch from './ExpenseSearch'
import PrimaryButton from '@/Components/PrimaryButton';
import AddExpenseModal from './AddExpenseModal'

export default function Expenses ({ auth, expenses, users }) {
  const [modals, setModals] = useState({
    addExpense: false,
    // editExpense:false,
  })
  const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Expenses</h2> }
    >
      <Head title="Expenses" />

      <AddExpenseModal modals={ modals } setModals={ setModals } auth={ auth } users={ users }/>


      {/* { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> } */}

      {/* { !errMessage && !loading &&
                <ErrorLogSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> } */}

      <ExpenseSearch
        className='p-4'
        setFilterObj={ setFilterObj }
        filterObj={ filterObj }
      />



      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">

              <div className='flex items-center justify-end gap-4 p-2'>
                <PrimaryButton className="bg-sky-800" onClick={ () => setModals({...modals,addExpense: true }) }>
                  <span > Add New Expense</span>
                </PrimaryButton>
              </div>


              <hr />

              {/* <PaginatedItems
                itemsPerPage={ filterObj.RowCount }
                items={ expenses }
                total={ expenses.length }
                setFilterObj={ setFilterObj }
                filterObj={ filterObj }
              >

                <ExpenseTable items={ expenses } auth={ auth } users={ users } modals={ modals } setModals={ setModals } />

              </PaginatedItems> */}

              <PaginatedLinks
                itemsPerPage={ filterObj.RowCount }
                items={ expenses }
                tableName="expenses"
                setFilterObj={ setFilterObj }
                filterObj={ filterObj } 
                auth={ auth }
                users={ users }
                />

              

            </div>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  )
}
