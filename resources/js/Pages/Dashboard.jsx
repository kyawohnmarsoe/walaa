import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsList from '../Pages/Stats/StatsList';

export default function Dashboard({ auth, apitoken }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <StatsList apitoken={apitoken} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
