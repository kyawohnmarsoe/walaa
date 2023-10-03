import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import Modal from '@/Components/DaisyUI/Modal';

export default function UserStatus ({ user, className = '' })
{
    // const user = usePage().props.auth.user;

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    //     name: user.name,
    //     email: user.email,
    // });

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

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-primary">Security</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
                        </header>
                        <Modal id={ modalIds.passwordShow } title="Password Viewer">
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
                                        />

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password" value="Password:" />

                                        <TextInput
                                            id="password"
                                            className="mt-1 block w-full "
                                            value={ user?.userObject?.userId }
                                            required
                                            isFocused
                                            autoComplete="password"
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
                        <Modal id={ modalIds.passwordChange } title="Change Password">
                            <form onSubmit={ submit } className="space-y-6 ">
                                <div className='grid grid-cols-1 gap-4'>

                                    <div>
                                        <InputLabel htmlFor="newPassword" value="New Password:" />

                                        <TextInput
                                            id="newPassword"
                                            className="mt-1 block w-full "
                                            value=''
                                            required
                                            isFocused
                                            autoComplete="newPassword"
                                        />

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="confirmNewPassword" value="Confirm New Password:" />

                                        <TextInput
                                            id="confirmNewPassword"
                                            className="mt-1 block w-full "
                                            value=''
                                            required
                                            isFocused
                                            autoComplete="confirmNewPassword"
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
        </div>
    );
}
