import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import AddForm from './Partials/AddForm';
import PrimaryButton from '@/Components/PrimaryButton';
import PaginatedItems from '@/Components/PaginatedItems';

export default function Customers({
    auth,
    mustVerifyEmail,
    customers,
    show_data,
    affiliates,
    accounts,
    apitoken,
    new_user_response
}) {

    const { flash } = usePage().props

    const addCustomerClick = () => {
        router.get('/customers/create')
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
                            <p>Duplicate Data.</p>
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
                            <PrimaryButton disabled='' onClick={ev => addCustomerClick()}>
                                Add User
                            </PrimaryButton>

                            {
                                customers.length > 0 &&
                                <PaginatedItems itemsPerPage={4} items={customers} tableName="customer" />
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
                                new_user_response={new_user_response}
                            />
                        </div>
                    }


                </div>
            </div>

        </AuthenticatedLayout>
    );
}
