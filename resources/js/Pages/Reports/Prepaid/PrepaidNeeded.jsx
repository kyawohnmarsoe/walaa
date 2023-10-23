import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import PrepaidNeededsSearch from './PrepaidNeededsSearch'
import Loading from "@/Components/DaisyUI/Loading";
import Alert from "@/Components/DaisyUI/Alert";
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';
import PrepaidNeededTable from "./PrepaidNeededTable";

export default function PrepaidNeeded ({ apitoken, auth, affiliates })
{
    const [data, setData] = useState({ prepaid: [], total: 0, errMessage: '', loading: true })
    const { prepaid, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ Days: 7 })

    // console.log(filterObj)

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/prepaycard/prepaidneeded', filterObj)
            .then(res =>
            {
                if (!res?.data?.value)
                {
                    return setData({ prepaid: [], total: 0, errMessage: '', loading: false })

                }
                setData({ prepaid: res?.data?.value, total: res?.data?.value?.length, errMessage: '', loading: false })
                // setData({ users: [], errMessage: '', loading: false })
                // console.log(res?.data?.value?.itemsList)
                console.log(data)
            })
            .catch(err =>
            {
                setData({ prepaid: [], total: 0, errMessage: err?.message, loading: false })
                // console.log(err)
            })
    }, [filterObj])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">User Sessions</h2> }
        >
            <Head title="Online Users" />
            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

            { !errMessage && !loading &&
                <PrepaidNeededsSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> }

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            { !errMessage && !loading &&
                                // <PaginatedItems
                                //     itemsPerPage={ filterObj.RowCount }
                                //     items={ prepaid }
                                //     total={ total }
                                //     setFilterObj={ setFilterObj }
                                //     filterObj={ filterObj }
                                //     type='Items'
                                // >

                                <PrepaidNeededTable prepaid={ prepaid } />

                                // </PaginatedItems>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}


