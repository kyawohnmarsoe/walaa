import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsList from '../Pages/Stats/StatsList';
import Alert from '@/Components/DaisyUI/Alert';
import ServicePhones from './ServicePhones';
import React, { useState, useEffect } from 'react';


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

            {/* { apitoken } */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className=" overflow-hidden sm:rounded-lg">
                        <div className="text-gray-900">
                            {
                                !!apitoken ? <StatsList apitoken={apitoken} />
                                    : <Alert msg='Session Expired' />
                            }

                            <ServicePhones apitoken={apitoken} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
