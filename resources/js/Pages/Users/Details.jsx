import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import UserStatus from './Partials/UserStatus';
import AccessDetails from './Partials/AccessDetails';
import CustomerInformation from './Partials/CustomerInformation';
import Security from './Partials/Security';
import AccountingInformation from './Partials/AccountingInformation';
import Alert from '../../Components/DaisyUI/Alert';
import Loading from '../../Components/DaisyUI/Loading';

export default function Details ({ auth, apitoken, id })
{
    const [userData, setUserData] = useState({ user: null, errMessage: '', loading: true })
    const { user, errMessage, loading } = userData

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.get(`/user/${ id }`)
            .then(res =>
            {
                setUserData({ user: res.data.value, errMessage: '', loading: false })
                // setUserData({ user: null, errMessage: '', loading: false })
                console.log('response' + res.data.value)
            })
            .catch(err =>
            {
                setUserData({ user: null, errMessage: err.message, loading: false })
                console.log('error' + err)
            })
    }, [])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Details</h2> }
        >
            <Head title="Details" />

            { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

            {
                !user && !loading && !errMessage && <Alert className="mt-12" msg='Something Went Wrong' />
            }

            { user &&

                <div>
                    <AccessDetails user={ user } className='p-4' />

                    {/* <div className='grid md:grid-cols-2 gap-4 pt-4 px-4 pb-12'>
                        <div className="bg-white shadow sm:rounded-lg">
                            <UserStatus
                                user={ user }
                                className="p-4" />
                        </div>
                        <div className="bg-white shadow sm:rounded-lg">
                            <Security
                                user={ user }
                                className="p-4" />
                        </div>
                        <div className="bg-white shadow sm:rounded-lg">
                            <CustomerInformation
                                user={ user }
                                className="p-4" />
                        </div>
                        <div className="bg-white shadow sm:rounded-lg">
                            <AccountingInformation
                                user={ user }
                                className="p-4" />
                        </div>
                    </div> */}
                </div>

            }

        </AuthenticatedLayout >
    );
}
