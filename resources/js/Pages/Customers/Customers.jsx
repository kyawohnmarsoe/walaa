import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import AddForm from './Partials/AddForm';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedLinks from '@/Components/PaginatedLinks';
import TextInput from '@/Components/TextInput';

export default function Customers({
    auth,
    mustVerifyEmail,
    customers,
    show_data,
    affiliates,
    accounts,
    apitoken,
}) {

    const { flash } = usePage().props

    const [search_val, setSearchVal] = useState('')
    const [filter_res, setFilterRes] = useState([])

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
    const handleSearch = (ev) => {
        let search = ev.target.value;
        setSearchVal(search)
        // console.log(search);

        if (search_val !== '') {
            const filterdata = customers.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(search_val.toLowerCase())
            });

            setFilterRes(filterdata)
        } else {
            setFilterRes(customers)
        }
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
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>{flash.message}</p>
                        </div>
                    }

                    {
                        show_data == 'list' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                            <div dir="ltr">
                                <PrimaryButton disabled='' onClick={ev => addCustomerClick()}>
                                    Add User
                                </PrimaryButton>

                                <PrimaryButton className="ml-12" disabled='' onClick={ev => addApiCustomerClick()}>
                                    Get API data
                                </PrimaryButton>
                            </div>

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

                            {
                                search_val.length > 1 ?
                                    <PaginatedLinks itemsPerPage={10} items={filter_res} tableName="customer" />
                                    :
                                    customers.length > 0 &&
                                    <PaginatedLinks itemsPerPage={10} items={customers} tableName="customer" />
                            }
                        </div>
                    }

                    {
                        show_data == 'add_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <AddForm
                                className="p-4"
                                accounts={accounts}
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
