import { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PaginatedLinks from "@/Components/PaginatedLinks";
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Affiliates({ auth, mustVerifyEmail, affiliates, apitoken }) {

    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const { flash } = usePage().props

    const [search_val, setSearchVal] = useState('')
    const [filter_res, setFilterRes] = useState([])

    const handleSearch = (ev) => {
        let search = ev.target.value;
        setSearchVal(search)

        if (search_val !== '') {
            const filterdata = affiliates.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(search_val.toLowerCase())
            });

            setFilterRes(filterdata)
        } else {
            setFilterRes(affiliates)
        }
    }

    const addApiClick = () => {
        router.get('/affiliates/store')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Affiliates</h2>
            }
        >
            <Head title="Affiliates" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 space-y-6">

                    {flash.status == 422 &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>Duplicate Data.</p>
                        </div>
                    }

                    {flash.status == 201 &&
                        <div className="alert alert-success">
                            Data created successfully.
                        </div>
                    }

                    <div className="sm:p-8 bg-white shadow sm:rounded-lg">
                        <PrimaryButton disabled='' onClick={ev => addApiClick()}>
                            Add Api Affiliate Data
                        </PrimaryButton>

                        {
                            affiliates.length > 0 &&
                            <div className='flex md:flex md:flex-grow flex-row justify-end py-4'>
                                <TextInput
                                    id="search_val"
                                    name="search_val"
                                    value={search_val}
                                    className="max-w"
                                    placeholder="Enter search keywords..."
                                    onChange={handleSearch}
                                />
                            </div>
                        }

                        {
                            search_val.length > 1 ?
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={filter_res}
                                    tableName="affiliate"
                                    apitoken={apitoken}
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj} />
                                :
                                affiliates.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={affiliates}
                                    tableName="affiliate"
                                    apitoken={apitoken}
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj} />
                        }
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
