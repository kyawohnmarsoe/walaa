import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PaginatedLinks from "@/Components/PaginatedLinks";
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AddForm from './Partials/AddForm';
import EditForm from './Partials/EditForm';

export default function Ports({ auth, ports, devices, port, show_data }) {
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const { flash } = usePage().props

    const [search_val, setSearchVal] = useState('')
    const [filter_res, setFilterRes] = useState([])

    const handleSearch = (ev) => {
        let search = ev.target.value;
        setSearchVal(search)

        if (search_val !== '') {
            const filterdata = ports.filter((item) => {
                return Object.values(item).join("").toLowerCase().includes(search_val.toLowerCase())
            });

            setFilterRes(filterdata)
        } else {
            setFilterRes(ports)
        }
    }

    const addClick = () => {
        router.get('/ports/create')
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Ports</h2>
            }
        >
            <Head title="Ports" />

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

                    {flash.message &&
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            <p>{flash.message}</p>
                        </div>
                    }

                    {flash.error_message &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-2" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>{flash.error_message}</p>
                        </div>
                    }

                    {
                        (show_data == 'list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <PrimaryButton disabled='' onClick={ev => addClick()}>
                                Add port
                            </PrimaryButton>
                            {
                                ports.length > 0 &&
                                <div className='flex md:flex md:flex-grow flex-row justify-end py-4'>
                                    <TextInput
                                        id="search_val"
                                        name="search_val"
                                        value={search_val}
                                        className="max-w"
                                        placeholder="Search Keyword..."
                                        onChange={handleSearch}
                                    />
                                </div>
                            }

                            {search_val.length > 1 ?
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={filter_res}
                                    tableName="port"
                                    setFilterObj={setFilterObj}
                                    filterObj={filterObj} />
                                :
                                ports.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={ports}
                                    tableName="port"
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
                                devices={devices}
                            />
                        </div>
                    }

                    {
                        show_data == 'edit_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <EditForm
                                className="p-4"
                                port={port}
                                devices={devices}
                            />
                        </div>
                    }

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
