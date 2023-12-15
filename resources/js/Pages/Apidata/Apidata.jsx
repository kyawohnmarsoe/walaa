import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import Alert from '@/Components/DaisyUI/Alert';
import React, { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';


export default function Apidata ({ auth, apitoken, totalCount })
{
    const { flash } = usePage().props
    const addApiClickAccounts = () =>
    {
        router.get('/accounts/store')
    }
    const addApiClickAffiliates = () =>
    {
        router.get('/affiliates/store')
    }
    const addApiClickCustomers = () =>
    {
        router.get('/customers/store/api/' + totalCount)
    }

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Apidata
                </h2>
            }
        >
            <Head title="Apidata" />

            {/* {apitoken} */ }

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="text-gray-900">
                           


                            {/* <PrimaryButton className="ml-12" disabled='' onClick={ (ev) => addApiClickAccounts() }>
                                Get Accounts Data
                            </PrimaryButton>

                            <PrimaryButton disabled='' onClick={ ev => addApiClickAffiliates() }>
                                Add Affiliates Data
                            </PrimaryButton>

                            <PrimaryButton disabled='' onClick={ ev => addApiClickCustomers() }>
                                Add Users Data
                            </PrimaryButton> */}
                           
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
