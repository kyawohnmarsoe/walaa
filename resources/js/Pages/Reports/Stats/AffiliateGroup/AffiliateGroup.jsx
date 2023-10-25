import React, { useEffect, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';
import AffiliateGroupTable from './AffiliateGroupTable'
import Loading from '@/Components/DaisyUI/Loading';
import Alert from '@/Components/DaisyUI/Alert'

export default function AffiliateGroup ({ className = '', auth, apitoken })
{
    const [data, setData] = useState({ items: [], total: 0, errMessage: '', loading: true })
    const { items, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/reports/affiliategroup')
            .then(res =>
            {
                setData({ items: res.data.value, total: res.data.value.length, errMessage: '', loading: false })
            }).catch(err =>
            {
                setData({ items: [], total: 0, errMessage: err.message, loading: false })
            })
    }, [])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Users</h2> }
        >
            <Head title="Online Users" />

            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }


            { !errMessage && !loading && !!items.length &&
                <div className="pt-12 ">
                    <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                        <div className="overflow-hidden">
                            <section className='p-4'>
                                <header>
                                    <h2 className="text-lg font-medium text-sky-600">Affiliate Group Report</h2>
                                </header>
                            </section>
                        </div>
                    </div>
                </div >
            }

            <div className="pb-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className=''>

                            {/* { !errMessage && !loading &&
                                <PaginatedItems
                                    itemsPerPage={ filterObj.RowCount }
                                    items={ items }
                                    total={ total }
                                    setFilterObj={ setFilterObj }
                                    filterObj={ filterObj }
                                    type='Items'
                                >
                                </PaginatedItems>

                            } */}

                            { !errMessage && !loading && !!items.length &&
                                <AffiliateGroupTable items={ items } />
                            }

                        </section>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout>
    )
}
