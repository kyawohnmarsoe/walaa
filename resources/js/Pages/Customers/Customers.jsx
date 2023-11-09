import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import AddForm from './Partials/AddForm';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedLinks from '@/Components/PaginatedLinks';
import FilterForm from './Partials/FilterForm';

export default function Customers({
    auth,
    customers,
    show_data,
    affiliates,
    accounts,
    sub_accounts,
    apitoken,
}) {

    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    const { flash } = usePage().props

    const addCustomerClick = () => {
        router.get('/customers/create')
    }
    const addApiCustomerClick = () => {
        // router.get('/customers/store/api')

        // get total count of API users
        const instance = axios.create({
            baseURL: 'https://rapi.earthlink.iq/api/reseller/user/all',
            headers: { 'Authorization': `Bearer ${apitoken}` }
        });
        let postData = {
            Rowcount: 1,
            OrderBy: 'Account Name',
        }
        instance.post('', postData).then(res => {
            if (res) {
                // console.log(res.data.isSuccessful)
                if (res.data.isSuccessful == true) {
                    // console.log(res.data.value.totalCount)

                    let totalCount = res.data.value.totalCount;
                    router.get('/customers/store/api/' + totalCount)
                }
            }
        }).catch(err => {
            if (err) {
                console.log(err.message)
            }
        })
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {flash.status == 422 &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>Something went wrong!</p>
                        </div>
                    }

                    {flash.status == 201 &&
                        <div className="alert alert-success">
                            Data created successfully.
                        </div>
                    }

                    {flash.message &&
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            {/* <p className="font-bold">Success</p> */}
                            <p>{flash.message}</p>
                        </div>
                    }

                    {flash.error_message &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>{flash.error_message}</p>
                        </div>
                    }

                    {
                        (show_data == 'list' || show_data == 'filter_list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <FilterForm
                                className=""
                                accounts={accounts}
                                sub_accounts={sub_accounts}
                                affiliates={affiliates}
                            />
                        </div>
                    }

                    {
                        (show_data == 'list' || show_data == 'filter_list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                            <div className='flex items-center justify-end gap-4 p-2 mb-2'>
                                <PrimaryButton disabled='' onClick={ev => addCustomerClick()}>
                                    Add User
                                </PrimaryButton>

                                <PrimaryButton disabled='' onClick={ev => addApiCustomerClick()}>
                                    Get API data
                                </PrimaryButton>
                            </div>

                            <hr />

                            {
                                show_data == 'filter_list' &&
                                <header>
                                    <h2 className="text-lg font-medium text-sky-600 mt-2">
                                        Filter Result :
                                        {
                                            customers.length == 0 ?
                                                <span className="text-lg font-medium text-red-600 ml-2">There is no filtered result!</span>
                                                : ''
                                        }
                                    </h2>
                                </header>
                            }

                            {
                                customers.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={customers}
                                    tableName="customer"
                                    sub_accounts={sub_accounts}
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj} />

                            }
                        </div>
                    }

                    {
                        show_data == 'add_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <AddForm
                                className="p-4"
                                accounts={accounts}
                                sub_accounts={sub_accounts}
                                affiliates={affiliates}
                                apitoken={apitoken}
                            />
                        </div>
                    }


                </div>
            </div>

        </AuthenticatedLayout>
    );
}
