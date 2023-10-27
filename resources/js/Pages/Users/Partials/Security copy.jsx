import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Modal from '@/Components/DaisyUI/Modal';
import { useEffect, useState } from 'react';

export default function UserStatus ({ user, className = '', apitoken })
{
    const [passwordShow, setPasswordShow] = useState({
        userindex: user?.userIndex,
        userid: user?.userObject?.userId,
        pass: ''
    })

    const [passwordChange, setPasswordChange] = useState({
        // UserIndex: user?.userIndex,
        UserIndex: 281512240,
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

    const modalIds = {
        passwordShow: 'passwordShowModal',
        passwordChange: 'passwordChangeModal',
        accPasswordShow: 'accPasswordShowModal',
        accPasswordChange: 'accPasswordChangeModal',
    }

    const callModal = (id) =>
    {
        // alert('callModal')
        document.getElementById(id).showModal()
    }

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


    return (
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
            <div className="bg-white overflow-hidden sm:rounded-lg">
                <section className={ className }>
                    <header>
                        <h2 className="text-lg font-medium text-primary">Security</h2>
                    </header>

                    <Modal id={ modalIds.passwordShow } title="Password Viewer">
                        <form onSubmit={ submit } className="space-y-6">
                            <div className='grid grid-cols-1 gap-4 '>

                                <div>
                                    <InputLabel htmlFor="userName" value="User Name :" />

                                    <TextInput
                                        id="userName"
                                        className="mt-1 block w-full  bg-gray-100"
                                        value={ user?.userObject?.userId }
                                        readOnly={ true }

                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div >
                                    <InputLabel htmlFor="password" value="Password:" />

                                    <TextInput
                                        id="password"
                                        className="mt-1 block w-full  bg-gray-100"
                                        value={ passwordShow.pass }
                                        readOnly={ true }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                            </div>

                        </form>
                    </Modal>

                    <Modal id={ modalIds.passwordChange } title="Change Password">
                        <form onSubmit={ (e) => changePassword(e) } className="space-y-6 ">
                            <div className='grid grid-cols-1 gap-4'>

                                <div>
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

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
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

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                            </div>

                            <div className="flex items-center gap-4 justify-end">
                                { value && <span className='text-success'>Update Success</span> }

                                { errMessage && <span className='text-red-500'>{ errMessage }</span> }

                                <PrimaryButton >Submit</PrimaryButton>
                                {/* <PrimaryBtn onClick={ (e) => changePassword(e) }>Submit</PrimaryBtn> */ }
                                <form method="dialog">
                                    <PrimaryButton className="resetBtn" onClick={ () => reset() }>Cancel</PrimaryButton>
                                </form>
                                {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition> */}
                            </div>
                        </form>

                    </Modal>

                    <div className="mt-6 space-y-6 ">

                        <div>
                            Password

                            <p className=" mb-1 text-sm text-gray-600">
                                The password used on the router
                            </p>

                            <span className=' text-primary' onClick={ () => callModal(modalIds.passwordShow) }>Show</span> |  <span className=' text-primary' onClick={ () => callModal(modalIds.passwordChange) }>Change</span>

                        </div>

                        <div>
                            Account Password

                            <p className=" mb-1 text-sm text-gray-600">
                                The account password is used to prevent the user from changing the subscription password from the subscriber information page until he enters it.
                            </p>

                            <span className=' text-primary' onClick={ () => callModal(modalIds.accPasswordShow) }>Show</span> |  <span className=' text-primary' onClick={ () => callModal(modalIds.accPasswordChange) }>Change</span>

                        </div>

                    </div>

                    <Modal id={ modalIds.accPasswordShow } title="Account Password Viewer">
                        <form onSubmit={ submit } className="space-y-6 ">
                            <div className='grid grid-cols-1 gap-4'>

                                <div>
                                    <InputLabel htmlFor="userName" value="User Name :" />

                                    <TextInput
                                        id="userName"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="userName"
                                        readOnly={ true }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="accPassword" value="Account Password:" />

                                    <TextInput
                                        id="accPassword"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="accPassword"
                                        readOnly={ true }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* <PrimaryButton disabled={processing}>Update</PrimaryButton> */ }

                                {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition> */}
                            </div>
                        </form>
                    </Modal>
                    <Modal id={ modalIds.accPasswordChange } title="Change Account Password">
                        <form onSubmit={ submit } className="space-y-6 ">
                            <div className='grid grid-cols-1 gap-4'>

                                <div>
                                    <InputLabel htmlFor="newAccPassword" value="New Account Password:" />

                                    <TextInput
                                        id="newAccPassword"
                                        className="mt-1 block w-full "
                                        value=''
                                        required
                                        isFocused
                                        autoComplete="newAccPassword"
                                        readOnly={ true }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="confirmNewAccPassword" value="Confirm New Account Password:" />

                                    <TextInput
                                        id="confirmNewAccPassword"
                                        className="mt-1 block w-full "
                                        value=''
                                        required
                                        isFocused
                                        autoComplete="confirmNewAccPassword"
                                        readOnly={ true }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* <PrimaryButton disabled={processing}>Update</PrimaryButton> */ }

                                {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition> */}
                            </div>
                        </form>
                    </Modal>

                </section>
            </div>
        </div>
    );
}
