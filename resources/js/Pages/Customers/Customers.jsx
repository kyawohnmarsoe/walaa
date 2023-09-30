import CustomerTable from './CustomerTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AddForm from './Partials/AddForm';

export default function Edit({ auth, mustVerifyEmail, customers, show_data, affiliates, accounts }) {

    const { flash } = usePage().props

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
            }
        >
            <Head title="Accounts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

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

                    {
                        show_data == 'list' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <CustomerTable customers={customers} />
                        </div>
                    }

                    {
                        show_data == 'add_form' &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <AddForm
                                className="max-w-xl"
                                accounts={accounts}
                                affiliates={affiliates}
                            />
                        </div>
                    }


                </div>
            </div>

        </AuthenticatedLayout>
    );
}
