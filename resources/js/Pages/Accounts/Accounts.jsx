import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import PaginatedLinks from "@/Components/PaginatedLinks";
import PrimaryButton from '@/Components/PrimaryButton';

export default function Accounts({ auth, mustVerifyEmail, accounts }) {

    const { flash } = usePage().props

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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4 space-y-6">

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

                    <div className="sm:p-8 bg-white shadow sm:rounded-lg">

                        <PrimaryButton disabled='' onClick={ev => addApiClick()}>
                            Add Api Account Data
                        </PrimaryButton>

                        {
                            accounts.length > 0 &&
                            <PaginatedLinks itemsPerPage={4} items={accounts} tableName="account" />
                        }
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
