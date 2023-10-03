import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AccessDetails ({ user, className = '' })
{

    const { data, setData, post, processing, errors, reset } = useForm({
        userName: user?.userObject?.userId,
        displayName: user?.userObject?.displayName,
        macAddress: user?.macAddress,
        affilate: user?.affiliateName,
        userNotes: user?.userNotes,
        router: user?.router,
        active: !!user?.activeDaysLeft

    });

    useEffect(() =>
    {

        // return () => {
        //     reset('password');
        // };
    }, []);

    const submit = (e) =>
    {
        e.preventDefault();

        // post(route('user.update'));
        alert('submit')

    };

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">Access Details</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
                        </header>

                        {/* <form onSubmit={submit} className="mt-6 space-y-6"> */ }
                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="userName" value="Username" />

                                    <TextInput
                                        id="userName"
                                        className="mt-1 block w-full "
                                        value={ data.userName }
                                        required
                                        isFocused
                                        autoComplete="userName"
                                        onChange={ (e) => setData('userName', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="displayName" value="Display Name" />

                                    <TextInput
                                        id="displayName"
                                        className="mt-1 block w-full "
                                        value={ data?.displayName }
                                        required
                                        isFocused
                                        autoComplete="displayName"
                                        onChange={ (e) => setData('displayName', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="macAddress" value="MAC Address" />

                                    <TextInput
                                        id="macAddress"
                                        className="mt-1 block w-full "
                                        value={ data?.macAddress }
                                        isFocused
                                        autoComplete="macAddress"
                                        onChange={ (e) => setData('macAddress', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="affiliate" value="Affiliate" />

                                    <TextInput
                                        id="affiliate"
                                        className="mt-1 block w-full disabled bg-gray-100"
                                        value={ data?.affilate }
                                        isFocused
                                        autoComplete="affiliate"
                                        disabled
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="userNotes" value="User Notes" />

                                    <TextInput
                                        id="userNotes"
                                        className="mt-1 block w-full "
                                        value={ data?.userNotes }
                                        isFocused
                                        autoComplete="userNotes"
                                        onChange={ (e) => setData('userNotes', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="router" value="Router/Nano IP:" />

                                    <TextInput
                                        id="router"
                                        className="mt-1 block w-full "
                                        value={ data?.router }
                                        isFocused
                                        autoComplete="router"
                                        onChange={ (e) => setData('router', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div >
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="active"
                                            checked={ data.active }
                                            onChange={ (e) => setData('active', e.target.checked) }
                                        />

                                        <InputLabel htmlFor="active" value="Active" className='ml-2' />
                                    </label>
                                </div>
                            </div>



                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Update</PrimaryButton>

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
                    </section>
                </div>
            </div>
        </div>
    );
}
