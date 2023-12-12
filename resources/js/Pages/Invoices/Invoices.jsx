
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Loading from "@/Components/DaisyUI/Loading";
import Alert from "@/Components/DaisyUI/Alert";
import InvoiceTable from "./InvoiceTable";
import InvoiceSearch from './InvoiceSearch'
import PaginatedLinks from '@/Components/PaginatedLinks';


export default function Invoices ({ auth, apitoken, affiliates, invoices, userIndexByGroup })
{
   
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const [filterInvoices, setFilteredInvoices] = useState(invoices)
   
    const filterUsersByGroup = (resUsers) =>
    {
        const results = resUsers.filter(r => userIndexByGroup.find(u => u.customer_user_index == r.userIndex))
        return results;
    }

    useEffect(() =>
    {
        if (userIndexByGroup !=='all'){
            if (invoices?.length > 0)
            {
                const results = filterUsersByGroup(invoices)
                // console.log(results)
                setFilteredInvoices(results)
                console.log(filterObj)
                filterObj.search && searchUsers()
            } 
        }
      
    }, [filterObj])


    const searchUsers=()=>{
      
        let data =  filterUsersByGroup(invoices)
       
        data = !!filterObj.userID ? data.filter(d => d.userID == filterObj.userID) : data;
      
        data = filterObj.affiliateName !== 'All' ? data.filter(d => d.affiliateName == filterObj.affiliateName) : data;
        
        data = filterObj.invoiceStatus !== 'All' ? (data.filter(d => d.invoiceStatus == filterObj.invoiceStatus)):data;
       
        setFilteredInvoices(data)

        // setFilterObj({ ...filterObj,search: false })
    }

   
    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Invoices</h2> }
        >
            <Head title="Invoices" />

            {/* { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> } */}

            {/* { !errMessage && !loading &&
                <ErrorLogSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> } */}

            <InvoiceSearch
                className='p-4'
                setFilterObj={ setFilterObj }
                filterObj={ filterObj }
            />

         

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                         

                            <PaginatedLinks
                                itemsPerPage={ filterObj.RowCount }
                                items={ filterInvoices }
                                tableName="invoices"
                                setFilterObj={ setFilterObj }
                                filterObj={ filterObj }
                                auth={ auth }
                                apitoken={ apitoken }
                            />

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
