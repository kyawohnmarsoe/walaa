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

        // patch(route('profile.update'));
    };

    const modalIds = { refill: 'refillModal' }

    const callModal = (id) =>
    {
        // alert('callModal')
        document.getElementById(id).showModal()
    }

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

                    <Modal id={ modalIds.refill } title="Refill User" description="To continue, please create or link the customer account benefiting from the service" descColor="text-warning">
                        <form onSubmit={ submit } className="space-y-6 ">
                            <div className='grid grid-cols-1 gap-4'>

                                <div>
                                    <InputLabel htmlFor="fullName" value="Full Name :" />

                                    <TextInput
                                        id="fullName"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="fullName"
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone" value="Phone Number:" />

                                    <TextInput
                                        id="phone"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="phone"
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                                <div>
                                    <InputLabel htmlFor="secondPhone" value="Second Phone Number:" />

                                    <TextInput
                                        id="secondPhone"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="secondPhone"
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email:" />

                                    <TextInput
                                        id="email"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="email"
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                                <div>
                                    <InputLabel htmlFor="address" value="Address:" />

                                    <TextInput
                                        id="address"
                                        className="mt-1 block w-full "
                                        value={ user?.userObject?.userId }
                                        required
                                        isFocused
                                        autoComplete="address"
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
                    <table className="mt-6 space-y-6 ">
                        <tr>
                            <td>Status</td>
                            <td>: { user?.accountStatus && (<span style={ { color: user.serviceStatusColorHex } }>{ user.accountStatus }</span>) }</td>
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
                            <td>: { user?.accountPackageType } <span className=' text-primary' onClick={ () => callModal(modalIds.refill) }>Refill</span></td>
                        </tr>
                    </table>

                </section> </div>
        </div>
    );
}
