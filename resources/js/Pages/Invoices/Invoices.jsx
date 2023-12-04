
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Loading from "@/Components/DaisyUI/Loading";
import Alert from "@/Components/DaisyUI/Alert";
import InvoiceTable from "./InvoiceTable";
import InvoiceSearch from './InvoiceSearch'
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';


export default function Invoices ({ auth, apitoken, affiliates, invoices })
{
   
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    useEffect(() =>
    {

    }, [filterObj])

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
                           
                            <PaginatedItems
                                itemsPerPage={ filterObj.RowCount }
                                items={ invoices }
                                total={ invoices.length }
                                setFilterObj={ setFilterObj }
                                filterObj={ filterObj }
                            >

                                <InvoiceTable items={ invoices } apitoken={ apitoken } auth={ auth }/>

                            </PaginatedItems>


                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}