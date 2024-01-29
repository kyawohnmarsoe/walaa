import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsList from '../Pages/Stats/StatsList';
import Alert from '@/Components/DaisyUI/Alert';
import ServicePhones from './ServicePhones';
import React, { useState, useEffect } from 'react';
import Board from './Board'
import TicketsList from './TicketsList'

export default function Dashboard({ auth, apitoken, board, tickets }) {

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

            {/* {apitoken} */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                    <div className=" overflow-hidden sm:rounded-lg">
                        <div className="text-gray-900">
                            {
                                !!apitoken ? <StatsList apitoken={apitoken} />
                                    : <Alert msg='Session Expired' />
                            }


                            <TicketsList tickets={tickets} />

                            <Board board={board} />


                            {/* <ServicePhones apitoken={apitoken} /> */}

                            <div className="pt-12 px-3 ">
                                <h2 className="text-lg font-medium text-gray-800 pb-4">Service phones:</h2>
                                <table><tbody className="text-sm"><tr><td>Zain </td><td> : 6116</td></tr><tr><td>Asia </td><td> : 6116</td></tr><tr><td>Zain </td><td> : 07835410888</td></tr><tr><td>Asia </td><td> : 07718299888</td></tr><tr><td>Omnea </td><td> : 07600025500</td></tr></tbody></table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
