import OnlineUsersTable from './OnlineUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function OnlineUsers({ auth, api_token }) {
           
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">OnlineUsers</h2>}
        >
            <Head title="Online Users" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <OnlineUsersTable apitoken={api_token}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
