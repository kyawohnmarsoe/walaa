import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react'
import RefillModal from "@/Pages/Customers/RefillModal";


export default function UserStatus ({ user, className = '', accountTypes, apitoken })
{
    const [data, setData] = useState({ errMessage: '', loading: true })
    const submit = (e) =>
    {
        e.preventDefault();

        // patch(route('profile.update'));
    };

    const disconnectUser = () =>
    {
        instance.post('/activesessions/disconnect', { userindex: user.userIndex, userid: user.userID })
            .then(res =>
            {
                console.log(res.data.responseMessage)
                setData({ errMessage: '', loading: false })

            })
            .catch(err =>
            {
                console.log(err.message)
                setData({ errMessage: err?.message, loading: false })

            })

        console.log('disconnectUser running..')
    }


    const disconnectHandler = () =>
    {
        const result = confirm("Are you sure you want to disconnect this user!")
        result && disconnectUser()
    }

    const checkOnlineStatus = () =>
    {
        const str = user?.userObject?.status.toLowerCase()
        const position = str.indexOf('online');
        if (position !== -1)
        {
            return true
        } else { return false }
    }

    const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
    const { value, errMessage } = updateInfo


    const [modals, setModals] = useState({
        reFill: false,
    })

    const closeModal = () =>
    {
        setModals({
            reFill: false
        });


        // setUpdateInfo({ errMessage: '', value: '' })
        // setPasswordChange({
        //     ...passwordChange,
        //     NewPassword: '',
        //     confirmNewPassword: ''
        // })

    };


    useEffect(() =>
    {
        console.log(modals)
    }, [])

    return (
        <>
      <RefillModal modals={modals} setModals={setModals} accountTypes={accountTypes} apitoken={apitoken} user={user} />
        
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <section className={ className }>
                    <header>
                        <h2 className="text-lg font-medium text-primary">User Status</h2>

                        {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
                    </header>

                    <table className="mt-6 space-y-6 ">
                        <tr>
                            <td>Status</td>
                            <td>: { user?.accountStatus && (<span style={ { color: user.serviceStatusColorHex } }>{ user.accountStatus }</span>) }

                                {/* { (user?.userObject?.status == 'Online') &&
                                    < span className=' text-primary pl-4' onClick={ disconnectHandler }>Disconnect</span>
                                } */}

                                { checkOnlineStatus() && < span className='cursor-pointer text-primary pl-4' onClick={ disconnectHandler }>Disconnect</span> }

                            </td>
                        </tr>
                        <tr>
                            <td>MAC</td>
                            <td>: { user?.mac }</td>
                        </tr>
                        <tr>
                            <td>IP</td>
                            <td>: { user?.userIP }</td>
                        </tr>
                        <tr>
                            <td>Account Type</td>
                            <td>: { user?.accountPackageType }

                                { user?.canRefill && < span className='cursor-pointer text-primary pl-4' onClick={ () => setModals({reFill:true})}>Refill</span> }

                            </td>
                        </tr>
                    </table>

                </section> </div>
        </div>
        </>
    );
}
