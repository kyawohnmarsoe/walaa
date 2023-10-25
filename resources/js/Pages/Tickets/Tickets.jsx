import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedLinks from '@/Components/PaginatedLinks';
import AddForm from './Partials/AddForm';

export default function Tickets({
    auth,
    mustVerifyEmail,
    tickets,
    show_data,
    customers,
    apitoken,
    errors
}) {

    const { flash } = usePage().props

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
                            <PrimaryButton disabled='' onClick={ev => addTicketClick()}>
                                Add Ticket
                            </PrimaryButton>

                            {
                                tickets.length > 0 &&
                                <PaginatedLinks
                                    itemsPerPage={4}
                                    items={tickets}
                                    tableName="ticket" />
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

                </div>
            </div>

        </AuthenticatedLayout>
    );
}
