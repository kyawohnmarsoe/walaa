import React, { useEffect, useState, useRef } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaginatedLinks from '@/Components/PaginatedLinks';
import Loading from '@/Components/DaisyUI/Loading';
import Alert from '@/Components/DaisyUI/Alert'
import TestUsageSearch from './TestUsageSearch'
import TestUsageTable from "./TestUsageTable";
import PrimaryButton from '@/Components/PrimaryButton';
import { DownloadTableExcel } from 'react-export-table-to-excel';


export default function TestUsage ({ className = '', auth, apitoken, affiliates })
{
    const tableRef = useRef(null);
    const [data, setData] = useState({ items: [], total: 0, errMessage: '', loading: true })
    const { items, total, errMessage, loading } = data
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.get('/reports/testsUsed')
            .then(res =>
            {
                setData({ items: res.data.value.itemsList, total: res.data.value.totalCount, errMessage: '', loading: false })
            }).catch(err =>
            {
                setData({ items: [], total: 0, errMessage: err.message, loading: false })
            })
    }, [])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Test Usage Report</h2> }
        >
            <Head title="Test Usage Report" />

            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }


            { !errMessage && !loading && !!items.length &&
                <TestUsageSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> }

            <div className="py-12">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className=''>

                            { !errMessage && !loading && !!items.length &&
                                <>
                                    <div className='flex items-center justify-end gap-4 p-2'>
                                        <PrimaryButton className="bg-sky-800" onClick={ () => location.reload() }>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                            </svg>
                                            <span className='pl-2'> Refresh</span>
                                        </PrimaryButton>


                                        <DownloadTableExcel
                                            filename="test_usage_table"
                                            sheet="test_usage"
                                            currentTableRef={ tableRef.current }
                                        >

                                            <PrimaryButton className="bg-emerald-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                                                </svg>
                                                <span className='pl-2'>Export</span>
                                            </PrimaryButton>

                                        </DownloadTableExcel>
                                    </div>


                                    <hr />

                                    {/* <Pagination
                                        itemsPerPage={ filterObj.RowCount }
                                        items={ items }
                                        total={ total }
                                        setFilterObj={ setFilterObj }
                                        filterObj={ filterObj }
                                        type='Items'
                                    >
                                        <TestUsageTable items={ items } tableRef={ tableRef } />
                                    </Pagination> */}

                                    <PaginatedLinks
                                        itemsPerPage={ filterObj.RowCount }
                                        items={ items }
                                        tableName="testUsage"
                                        setFilterObj={ setFilterObj }
                                        filterObj={ filterObj }
                                    />


                                </>

                            }

                        </section>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout>
    )
}
