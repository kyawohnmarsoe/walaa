import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedLinks from '@/Components/PaginatedLinks';
import AddForm from './Partials/AddForm';
import EditForm from './Partials/EditForm';
import FilterForm from './Partials/FilterForm';
import { useState } from 'react'

export default function Tickets({
    auth,
    mustVerifyEmail,
    tickets,
    customers,
    filter_customers,
    users,
    remarks,
    ticket,
    updated_by_loggedin_user,
    show_data,
    apitoken,
    errors
}) {
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    const { flash } = usePage().props
    const { roles, permissions } = usePage().props.user

    const addTicketClick = () => {
        router.get('/tickets/create')
    }

   

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tickets</h2>
            }
        >
            <Head title="Tickets" />

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="text-gray-900">

                    {/* {roles}
                    {permissions} */}

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
                            {/* <p className="font-bold">Success!</p> */}
                            <p>{flash.message}</p>
                        </div>
                    }

                    {
                        (show_data == 'list' || show_data == 'filter_list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <FilterForm
                                className=""
                                customers={filter_customers}
                            />
                        </div>
                    }

                    {
                        (show_data == 'list' || show_data == 'filter_list') &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">

                            <div className='flex items-center justify-end gap-4 p-2 mb-2'>
                                <PrimaryButton disabled='' onClick={ev => addTicketClick()}>
                                    Add Ticket
                                </PrimaryButton>
                            </div>

                            <hr />

                            {
                                show_data == 'filter_list' &&
                                <header>
                                    <h2 className="text-lg font-medium text-sky-600 mt-2">
                                        Filter Result :
                                        {
                                            tickets.length == 0 ?
                                                <span className="text-lg font-medium text-red-600 ml-2">There is no filtered result!</span>
                                                : ''
                                        }
                                    </h2>
                                </header>
                            }

                            {
                                tickets.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={filterObj.RowCount}
                                    items={tickets}
                                    users={users}
                                    remarks={remarks}
                                    tableName="ticket"
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
                                customers={customers}
                                apitoken={apitoken}
                                errors={errors}
                            />
                        </div>
                    }

                    {
                        show_data == 'edit_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <EditForm
                                className="p-4"
                                customers={customers}
                                ticket={ticket}
                                updated_by_loggedin_user={updated_by_loggedin_user}
                                            remarks={ remarks }
                                            users={ users }
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
