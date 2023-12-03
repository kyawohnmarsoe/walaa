import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PaginatedLinks from "@/Components/PaginatedLinks";
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AddForm from './Partials/AddForm';
import EditForm from './Partials/EditForm';

export default function Usergroup({ auth, usergroups, usergroup, show_data }) {
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const { flash } = usePage().props

    const [search_val, setSearchVal] = useState('')
    const [filter_res, setFilterRes] = useState([])

    const handleSearch = (ev) => {
        let search = ev.target.value;
        setSearchVal(search)

        if (search_val !== '') {
            const filterdata = usergroups.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(search_val.toLowerCase())
            });

            setFilterRes(filterdata)
        } else {
            setFilterRes(usergroups)
        }
    }

    const addClick = () => {
        router.get('/usergroup/create')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users Group</h2>
            }
        >
            <Head title="User Group" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 space-y-6">

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
                        (show_data == 'list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <PrimaryButton disabled='' onClick={ev => addClick()}>
                                Add User Group
                            </PrimaryButton>
                            {
                                usergroups.length > 0 &&
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

                            {search_val.length > 1 ?
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={filter_res}
                                    tableName="usergroup"
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj} />
                                :
                                usergroups.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={usergroups}
                                    tableName="usergroup"
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
                            />
                        </div>
                    }

                    {
                        show_data == 'edit_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <EditForm
                                className="p-4"
                                usergroup={usergroup}
                            />
                        </div>
                    }
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
