import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, Link } from '@inertiajs/react';
import AddForm from './Partials/AddForm';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedLinks from '@/Components/PaginatedLinks';
import FilterForm from './Partials/FilterForm';
import DepositForm from './Partials/DepositForm';
import EditForm from './Partials/EditForm';
import RefillModal from "./RefillModal";



export default function Customers({
    auth,
    customers,
    customer,
    show_data,
    affiliates,
    accounts,
    sub_accounts,
    sys_users,
    user_groups,
    apitoken,
    totalCount,
    deposit_password,
    deposit_id
}) {

    const [modals, setModals] = useState({
        reFill: false,
        change: false,
        extend: false,
    })

    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    const { flash } = usePage().props
    const { roles } = usePage().props.user

    const addCustomerClick = () => {
        router.get('/customers/create')
    }
    const addApiCustomerClick = () => {
        router.get('/customers/store/api/' + totalCount)

        // get total count of API users
        // const instance = axios.create({
        //     baseURL: 'https://rapi.earthlink.iq/api/reseller/user/all',
        //     headers: { 'Authorization': `Bearer ${apitoken}` }
        // });
        // let postData = {
        //     Rowcount: 1,
        //     OrderBy: 'Account Name',
        // }
        // instance.post('', postData).then(res => {
        //     if (res) {
        //         // console.log(res.data.isSuccessful)
        //         if (res.data.isSuccessful == true) {
        //             // console.log(res.data.value.totalCount)

        //             let totalCount = res.data.value.totalCount;
        //             router.get('/customers/store/api/' + totalCount)
        //         }
        //     }
        // }).catch(err => {
        //     if (err) {
        //         console.log(err.message)
        //     }
        // })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
            }
        >
            <Head title="Users" />

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    {flash.status == 422 &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-2" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>Something went wrong!</p>
                        </div>
                    }

                    {flash.status == 201 &&
                        <div className="alert alert-success mb-2">
                            Data created successfully.
                        </div>
                    }

                    {flash.message &&
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-2" role="alert">
                            <p>{flash.message}</p>
                        </div>
                    }

                    {flash.error_message &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-2" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>{flash.error_message}</p>
                        </div>
                    }
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="text-gray-900">
                            {
                                (show_data == 'list' || show_data == 'filter_list') &&
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <FilterForm
                                        className=""
                                        accounts={accounts}
                                        sub_accounts={sub_accounts}
                                        affiliates={affiliates}
                                        user_groups={user_groups}
                                    />
                                </div>
                            }

                    {
                        (show_data == 'list' || show_data == 'filter_list') &&
                        <div className=" bg-white shadow sm:rounded-lg">

                                    <div className='flex items-center justify-end gap-4 p-2 mb-2'>
                                        <PrimaryButton disabled='' onClick={ev => addCustomerClick()}>
                                            Add User
                                        </PrimaryButton>

                                        {
                                            roles == 'admin' &&
                                            <PrimaryButton disabled='' onClick={ev => addApiCustomerClick()}>
                                                Get API data
                                            </PrimaryButton>
                                        }

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
                                    accounts={accounts}
                                    user_groups={user_groups}
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj}
                                    apitoken={apitoken}
                                    totalCount={totalCount} 
                                                modals={ modals }
                                                setModals={ setModals }
                                                deposit_password={ deposit_password }
                                    
                                    />

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
                                        user_groups={user_groups}
                                        apitoken={apitoken}
                                    />
                                </div>
                            }

                            {
                                show_data == 'deposit_form' &&
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <DepositForm
                                        className="p-4"
                                        accounts={accounts}
                                        apitoken={apitoken}
                                        deposit_password={deposit_password}
                                        deposit_id={deposit_id}
                                    />
                                </div>
                            }

                            {
                                show_data == 'edit_form' &&
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <EditForm
                                        className="p-4"
                                        customer={customer}
                                        accounts={accounts}
                                        sub_accounts={sub_accounts}
                                        affiliates={affiliates}
                                        user_groups={user_groups}
                                        apitoken={apitoken}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
