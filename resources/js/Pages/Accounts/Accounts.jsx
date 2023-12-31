import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PaginatedLinks from "@/Components/PaginatedLinks";
import PrimaryButton from '@/Components/PrimaryButton';
import AddForm from './Partials/AddForm';
import EditForm from './Partials/EditForm';
import TextInput from '@/Components/TextInput';

export default function Accounts({ auth, accounts, show_data, account }) {
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const { flash } = usePage().props
    const { roles } = usePage().props.user
    const [search_val, setSearchVal] = useState('')
    const [filter_res, setFilterRes] = useState([])

    const handleSearch = (ev) => {
        let search = ev.target.value;
        setSearchVal(search)
        // console.log(search);

        if (search_val !== '') {
            const filterdata = accounts.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(search_val.toLowerCase())
            });

            setFilterRes(filterdata)
        } else {
            setFilterRes(accounts)
        }
    }

    const addLocalAccountClick = () => {
        router.get('/accounts/create')
    }

    const addApiClick = () => {
        router.get('/accounts/store')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Accounts</h2>
            }
        >
            <Head title="Accounts" />
            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="text-gray-900">

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

                            {flash.status == 200 &&
                                <div className="alert alert-success">
                                    Data updated successfully.
                                </div>
                            }

                            {flash.status == 204 &&
                                <div className="alert alert-success">
                                    Data deleted successfully.
                                </div>
                            }

                            {
                                (show_data == 'list' || show_data == 'apilist') &&
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                                    <div dir="ltr">
                                        <PrimaryButton disabled='' onClick={ev => addLocalAccountClick()}>
                                            Add Local Account
                                        </PrimaryButton>

                                        {
                                            roles == 'admin' &&
                                            <PrimaryButton className="ml-12" disabled='' onClick={(ev) => addApiClick()}>
                                                Get API data
                                            </PrimaryButton>
                                        }

                                        {
                                            show_data == 'list' &&
                                            <a
                                                className='ml-12 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                                                href={route('accounts.apilist')}>
                                                API Account List
                                            </a>
                                        }

                                        {
                                            show_data == 'apilist' &&
                                            <a
                                                className='ml-12 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                                                href={route('accounts')}>
                                                Local Account List
                                            </a>
                                        }

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
                                            <PaginatedLinks itemsPerPage={filterObj.RowCount} items={filter_res} tableName="account"
                                                setFilterObj={setFilterObj}
                                                filterObj={filterObj} />
                                            :
                                            accounts.length > 0 &&
                                            <PaginatedLinks itemsPerPage={filterObj.RowCount} items={accounts} tableName="account" listname={show_data == 'apilist' ? 'apilist' : ''} setFilterObj={setFilterObj}
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
                                    />
                                </div>
                            }

                            {
                                show_data == 'edit_form' &&
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                    <EditForm
                                        className="p-4"
                                        accounts={accounts}
                                        account={account}
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
