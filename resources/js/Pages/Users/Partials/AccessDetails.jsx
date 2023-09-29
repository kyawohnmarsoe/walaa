import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useEffect } from 'react';

export default function AccessDetails({ user,className = '' }) {
    
    // const user = usePage().props.auth.user;

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    //     userName: user.userObject.userId,
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     patch(route('profile.update'));
    // };

    useEffect(()=>{
        console.log('access details '+user.userObject.userId)
    },[user])

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-primary">Access Details</h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            {/* <form onSubmit={submit} className="mt-6 space-y-6"> */}
            <form className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="userName" value="Username" />

                    <TextInput
                        id="userName"
                        className="mt-1 block w-full "
                        value={user.userObject.userId}
                        onChange={(e) => setData('userName', e.target.value)}
                        required
                        isFocused
                        autoComplete="userName"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                


                <div className="flex items-center gap-4">
                    {/* <PrimaryButton disabled={processing}>Save</PrimaryButton> */}

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
    );
}
