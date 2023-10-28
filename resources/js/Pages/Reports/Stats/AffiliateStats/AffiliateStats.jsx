
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Loading from '@/Components/DaisyUI/Loading';
import Alert from '@/Components/DaisyUI/Alert'
import AffiliateStatsTable from './AffiliateStatsTable'

export default function AffiliateStats ({ apitoken, auth })
{
    const [data, setData] = useState({ items: {}, total: 0, errMessage: '', loading: true })
    const { items, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({})

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/reports/usersSubscriptions')
            .then(res =>
            {
                setData({ items: res.data.value, total: 0, errMessage: '', loading: false })
            }).catch(err =>
            {
                setData({ items: {}, total: 0, errMessage: err.message, loading: false })
            })
    }, [])

    const submit = () =>
    {

    }

    return (
        <>
            <AuthenticatedLayout
                user={ auth.user }
                header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Affiliate Subscriptions Stats</h2> }
            >
                <Head title="Affiliate Subscriptions Stats" />

                { loading && <Loading className="mt-12 " /> }
                { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

                { !errMessage && !loading && !!items &&
                    <div className="pt-12 pb-4">
                        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                            <div className="overflow-hidden">
                                <section className='p-4'>
                                    <header>
                                        <h2 className="text-lg font-medium text-sky-600">User Account Type Stats</h2>
                                    </header>
                                    <h2 className="mt-1 text-md text-gray-600">The table shows the monthly statistics of the agent’s subscribers</h2>
                                    <p className="mt-1 text-sm text-gray-600">
                                        * Data is updated every hour <br />
                                        * Statistics are calculated for the past thirty days and not from the beginning of the current month

                                    </p>
                                </section>
                            </div>
                        </div>
                    </div >
                }


                <div className="pb-12">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <section className=''>

                                { !errMessage && !loading && !!items &&
                                    <AffiliateStatsTable items={ items } />
                                }

                            </section>
                        </div>
                    </div>
                </div >
            </AuthenticatedLayout>

        </>
    )
}
