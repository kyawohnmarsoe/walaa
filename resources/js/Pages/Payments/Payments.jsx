
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Loading from "@/Components/DaisyUI/Loading";
import Alert from "@/Components/DaisyUI/Alert";
import PaymentTable from "./PaymentTable";

export default function Payments ({ auth, apitoken, affiliates })
{
    const [data, setData] = useState({ items: [], total: 0, errMessage: '', loading: true })
    const { items, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    // console.log(filterObj)

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/userpayment/usersInvoice', filterObj)
            .then(res =>
            {
                setData({ items: res?.data?.value?.itemsList, total: res?.data?.value?.totalCount, errMessage: '', loading: false })
                // setData({ users: [], errMessage: '', loading: false })
                console.log(res?.data?.value?.itemsList)
            })
            .catch(err =>
            {
                setData({ items: [], total: 0, errMessage: err?.message, loading: false })
                console.log(err)
            })
    }, [])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Payment</h2> }
        >
            <Head title="Payment" />

            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

            {/* { !errMessage && !loading &&
                <ErrorLogSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> } */}

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            {/* { !errMessage && !loading &&
                                <PaginatedItems
                                    itemsPerPage={ filterObj.RowCount }
                                    items={ logs }
                                    total={ total }
                                    setFilterObj={ setFilterObj }
                                    filterObj={ filterObj }
                                >

                                    <ErrorLogTable logs={ logs } />

                                </PaginatedItems>

                            } */}

                            <PaymentTable items={ items } />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
