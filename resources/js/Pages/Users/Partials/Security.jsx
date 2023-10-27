import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Modal from '@/Components/Modal';
import { useEffect, useState } from 'react';

export default function UserStatus ({ user, className = '', apitoken })
{
    const [passwordShow, setPasswordShow] = useState({
        userindex: user?.userIndex,
        userid: user?.userObject?.userId,
        pass: ''
    })

    const [passwordChange, setPasswordChange] = useState({
        UserIndex: user?.userIndex,
        // UserIndex: 281512240,
        NewPassword: '',
        confirmNewPassword: ''
    })

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    useEffect(() =>
    {
        instance.post('/user/showpassword', { ...passwordShow })
            .then(res =>
            {
                // console.log(res.data.value)
                setPasswordShow({ ...passwordShow, pass: res.data.value })
            })
            .catch(res => { console.log(err.message) })
    }, [passwordShow.pass])

    const submit = (e) =>
    {
        e.preventDefault();
        alert('submit')
        // patch(route('profile.update'));
    };

    const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
    const { value, errMessage } = updateInfo

    const changePassword = (e) =>
    {
        e.preventDefault();
        // alert('changePassword')

        instance.post('/user/changepassword', { ...passwordChange })
            .then(res =>
            {
                console.log(res.data.value)

                res.data.value ? setUpdateInfo({ errMessage: '', value: res.data.value }) :
                    setUpdateInfo({ errMessage: res.data.error.detailMessage, value: '' })


            })
            .catch(err =>
            {
                setUpdateInfo({ errMessage: err.message, value: '' })
            })


    }

    const [modals, setModals] = useState({
        passwordShow: false,
        passwordChange: false,
        accPasswordShow: false,
        accPasswordChange: false,
    })

    const closeModal = () =>
    {
        setModals({
            passwordShow: false,
            passwordChange: false,
            accPasswordShow: false,
            accPasswordChange: false,
        });

        // reset();
        setUpdateInfo({ errMessage: '', value: '' })
        setPasswordChange({
            ...passwordChange,
            NewPassword: '',
            confirmNewPassword: ''
        })

    };

    return (
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <section className={ className }>
                    <header>
                        <h2 className="text-lg font-medium text-primary">Security</h2>
                    </header>

                    <Modal show={ modals.passwordShow } onClose={ closeModal } maxWidth={ 'xl' }>
                        <form onSubmit={ submit } className="p-6" >
                            <h2 className="text-lg font-medium text-gray-900">
                                Password Viewer
                            </h2>

                            <p className="mt-1 text-sm text-red-600">
                                { }
                            </p>

                            <div className="mt-6">
                                <InputLabel htmlFor="userName" value="User Name :" />

                                <TextInput
                                    id="userName"
                                    className="mt-1 block w-full  bg-gray-100"
                                    value={ user?.userObject?.userId }
                                    readOnly={ true }

                                />

                                {/* <InputError message={ errors.DepositPassword } className="mt-2" /> */ }
                            </div>

                            <div className="mt-6">
                                <InputLabel htmlFor="password" value="Password:" />

                                <TextInput
                                    id="password"
                                    className="mt-1 block w-full  bg-gray-100"
                                    value={ passwordShow.pass }
                                    readOnly={ true }
                                />

                            </div>

                        </form>
                    </Modal>

                    <Modal show={ modals.passwordChange } onClose={ closeModal } maxWidth={ 'xl' }>
                        <form onSubmit={ (e) => changePassword(e) } className="p-6" >
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
                                    value={ passwordChange.NewPassword }
                                    required
                                    isFocused
                                    autoComplete="NewPassword"
                                    onChange={ (e) => setPasswordChange({ ...passwordChange, NewPassword: e.target.value }) }
                                />

                                {/* <InputError message={ errors.DepositPassword } className="mt-2" /> */ }
                            </div>

                            <div className="mt-6">
                                <InputLabel htmlFor="confirmNewPassword" value="Confirm New Password:" />

                                <TextInput
                                    id="confirmNewPassword"
                                    className="mt-1 block w-full "
                                    value={ passwordChange.confirmNewPassword }
                                    required
                                    isFocused
                                    autoComplete="confirmNewPassword"
                                    onChange={ (e) => setPasswordChange({ ...passwordChange, confirmNewPassword: e.target.value }) }
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

                    <div className="mt-6 space-y-6 ">

                        <div>
                            Password

                            <p className=" mb-1 text-sm text-gray-600">
                                The password used on the router
                            </p>

                            <span className=' text-primary' onClick={ () => setModals({ ...modals, passwordShow: true }) }>Show</span> |  <span className=' text-primary' onClick={ () => setModals({ ...modals, passwordChange: true }) }>Change</span>

                        </div>

                        <div>
                            Account Password

                            <p className=" mb-1 text-sm text-gray-600">
                                The account password is used to prevent the user from changing the subscription password from the subscriber information page until he enters it.
                            </p>

                            <span className=' text-primary' onClick={ () => setModals({ ...modals, accPasswordShow: true }) }>Show</span> |  <span className=' text-primary' onClick={ () => setModals({ ...modals, accPasswordShow: true }) }>Change</span>

                        </div>

                    </div>



                </section>
            </div>
        </div>
    );
}
