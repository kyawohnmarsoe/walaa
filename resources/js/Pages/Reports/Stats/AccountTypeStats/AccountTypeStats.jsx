import React, { useState, useEffect } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Loading from '@/Components/DaisyUI/Loading';
import Alert from '@/Components/DaisyUI/Alert'
import AccountTypeStatsTable from './AccountTypeStatsTable'

export default function AccountTypeStats ({ apitoken, auth })
{
    const [data, setData] = useState({ items: [], total: 0, errMessage: '', loading: true })
    const { items, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ PeriodType: '0' })
    const { PeriodType } = filterObj
    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/reports/usersAccountTypes', filterObj)
            .then(res =>
            {
                setData({ items: res.data.value, total: res.data.value.length, errMessage: '', loading: false })
            }).catch(err =>
            {
                setData({ items: [], total: 0, errMessage: err.message, loading: false })
            })
    }, [filterObj])


    const handleRadioChange = (event) =>
    {
        setFilterObj({ PeriodType: event.target.value });

    };
    console.log(filterObj)
    const submit = () =>
    {

    }

    return (
        <>
            <AuthenticatedLayout
                user={ auth.user }
                header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">User Account Type Stats</h2> }
            >
                <Head title="User Account Type Stats" />

                { loading && <Loading className="mt-12 " /> }
                { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

                { !errMessage && !loading && !!items.length &&
                    <div className="pt-12 pb-4">
                        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                            <div className="overflow-hidden">
                                <section className='p-4'>
                                    <header>
                                        <h2 className="text-lg font-medium text-sky-600">User Account Type Stats</h2>
                                    </header>

                                    <form onSubmit={ submit } className="mt-6 space-y-6 " >
                                        <div>
                                            <p className="mb-3">Show Results For :</p>
                                            <label className="pr-4 font-medium text-sm text-gray-700">
                                                <input
                                                    type="radio"
                                                    value="0"
                                                    checked={ PeriodType == '0' }
                                                    onChange={ handleRadioChange }
                                                    className="mr-1 border-gray-300 text-sky-600 shadow-sm focus:ring-sky-500"
                                                />
                                                This Month
                                            </label>

                                            <label className=" font-medium text-sm text-gray-700">
                                                <input
                                                    type="radio"
                                                    value="1"
                                                    checked={ PeriodType == '1' }
                                                    onChange={ handleRadioChange }
                                                    className="mr-1 border-gray-300 text-sky-600 shadow-sm focus:ring-sky-500"
                                                />
                                                Last Month
                                            </label>

                                        </div>

                                    </form>
                                </section>
                            </div>
                        </div>
                    </div >
                }


                <div className="pb-12">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <section className=''>

                                { !errMessage && !loading && !!items.length &&
                                    <AccountTypeStatsTable items={ items } />
                                }

                            </section>
                        </div>
                    </div>
                </div >
            </AuthenticatedLayout>

        </>
    )
}
