import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Modal from '@/Components/Modal';
import { useState } from 'react'

export default function UserStatus ({ user, className = '' })
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
        refill: false,
    })
    console.log(modals)
    const closeModal = () =>
    {
        setModals({
            refill: false,
        });


        // setUpdateInfo({ errMessage: '', value: '' })
        // setPasswordChange({
        //     ...passwordChange,
        //     NewPassword: '',
        //     confirmNewPassword: ''
        // })

    };

    const refill = () => { }

    return (
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <section className={ className }>
                    <header>
                        <h2 className="text-lg font-medium text-primary">User Status</h2>

                        {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
                    </header>

                    <Modal show={ modals.refill } onClose={ closeModal } maxWidth={ 'xl' }>
                        <form onSubmit={ (e) => refill(e) } className="p-6" >
                            <h2 className="text-lg font-medium text-gray-900">
                                Change Password
                            </h2>

                            <p className="mt-1 text-sm text-red-600">
                                { }
                            </p>

                            <div className="mt-6">
                                <InputLabel htmlFor="NewPassword" value="New Password:" />

                                <TextInput
                                    id="NewPassword"
                                    className="mt-1 block w-full "
                                    // value={ passwordChange.NewPassword }
                                    required
                                    isFocused
                                    autoComplete="NewPassword"
                                // onChange={ (e) => setPasswordChange({ ...passwordChange, NewPassword: e.target.value }) }
                                />

                                {/* <InputError message={ errors.DepositPassword } className="mt-2" /> */ }
                            </div>

                            <div className="mt-6">
                                <InputLabel htmlFor="confirmNewPassword" value="Confirm New Password:" />

                                <TextInput
                                    id="confirmNewPassword"
                                    className="mt-1 block w-full "
                                    // value={ passwordChange.confirmNewPassword }
                                    required
                                    isFocused
                                    autoComplete="confirmNewPassword"
                                // onChange={ (e) => setPasswordChange({ ...passwordChange, confirmNewPassword: e.target.value }) }
                                />

                            </div>

                            <div className="mt-6 flex justify-end gap-4">
                                { value && <span className='text-success'> Update Success </span> }

                                { errMessage && <span className='text-red-500'> { errMessage } </span> }

                                <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                                <PrimaryButton className="ml-3">
                                    Submit
                                </PrimaryButton>
                            </div>
                        </form>
                    </Modal>

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
                                {/* <span className='cursor-pointer text-primary' onClick={ () => setModals({ ...modals, refill: true }) }>Refill</span> */ }
                            </td>
                        </tr>
                    </table>

                </section> </div>
        </div>
    );
}
