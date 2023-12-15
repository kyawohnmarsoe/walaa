import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import UserSessionsSearch from './UserSessionsSearch'
import Loading from "@/Components/DaisyUI/Loading";
import Alert from "@/Components/DaisyUI/Alert";
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';
import UserSessionsTable from "./UserSessionsTable";

export default function UserSessions ({ apitoken, auth, affiliates, userIndexByGroup })
{
    const [data, setData] = useState({ sess: [], total: 0, errMessage: '', loading: true })
    const { sess, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    // console.log(filterObj)

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    const filterUsersByGroup = (resUsers) =>
    {
        const results = resUsers.filter(r => userIndexByGroup.find(u => u.customer_user_index == r.userIndex))
        return results;
    }


    useEffect(() =>
    {
        instance.post('/usersession/all', filterObj)
            .then(res =>
            {
                if (!res?.data?.value)
                {
                    return setData({ sess: [], total: 0, errMessage: '', loading: false })

                }

                if (res?.data?.value?.itemsList?.length > 0 && userIndexByGroup !== 'all')
                {
                    const results = filterUsersByGroup(res?.data?.value?.itemsList)
                    // console.log(results)
                    setData({ sess: results, total: results.length, errMessage: '', loading: false })

                } else
                {
                     setData({ sess: res?.data?.value?.itemsList, total: 500, errMessage: '', loading: false })

                }

               
            })
            .catch(err =>
            {
                setData({ sess: [], total: 0, errMessage: err?.message, loading: false })
                // console.log(err)
            })
    }, [filterObj])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">User Sessions</h2> }
        >
            <Head title="User Sessions" />
            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

            { !errMessage && !loading &&
                <UserSessionsSearch
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
                                <PaginatedItems
                                    itemsPerPage={ filterObj.RowCount }
                                    items={ sess }
                                    total={ total }
                                    setFilterObj={ setFilterObj }
                                    filterObj={ filterObj }
                                    type='Items'
                                >

                                    <UserSessionsTable sess={ sess } />

                                </PaginatedItems>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
