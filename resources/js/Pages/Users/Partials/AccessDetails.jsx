import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AccessDetails ({ user, className = '' })
{
    // console.log(user)

    const { data, setData, post, processing, errors, reset } = useForm({
        userId: user?.userObject?.userId,
        displayName: user?.userObject?.displayName,
        callerMAC: user?.onlineSession?.callerMAC,
        affiliateName: user?.affiliateName,
        userNotes: user?.userNotes,
        router: user?.router,
        userActive: user?.userActive
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
                                    <InputLabel htmlFor="userId" value="Username" />

                                    <TextInput
                                        id="userId"
                                        className="mt-1 block w-full "
                                        value={ data?.userId }
                                        required
                                        isFocused
                                        autoComplete="userId"
                                        onChange={ (e) => setData('userId', e.target.value) }
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
                                    <InputLabel htmlFor="callerMAC" value="MAC Address" />

                                    <TextInput
                                        id="callerMAC"
                                        className="mt-1 block w-full "
                                        value={ data?.callerMAC }
                                        isFocused
                                        autoComplete="callerMAC"
                                        onChange={ (e) => setData('callerMAC', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="affiliateName" value="Affiliate" />

                                    <TextInput
                                        id="affiliateName"
                                        className="mt-1 block w-full disabled bg-gray-100"
                                        value={ data?.affiliateName }
                                        isFocused
                                        autoComplete="affiliateName"
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
                                            name="userActive"
                                            checked={ data?.userActive }
                                            onChange={ (e) => setData('userActive', e.target.checked) }
                                        />

                                        <InputLabel htmlFor="userActive" value="Active" className='ml-2' />
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
