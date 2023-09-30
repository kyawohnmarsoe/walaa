import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';


export default function AccessDetails({ user,className = '' }) {

     const { data, setData, post, processing, errors, reset } = useForm({});

    //  useEffect(() => {
    //     return () => {
    //         reset('password');
    //     };
    // }, []);

    const submit = (e) => {
        e.preventDefault();

        // post(route('login'));
        alert('submit')
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-primary">Access Details</h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            {/* <form onSubmit={submit} className="mt-6 space-y-6"> */}
            <form onSubmit={submit} className="mt-6 space-y-6 ">
                <div className='grid grid-cols-3 gap-4'>
                 
                <div>
                    <InputLabel htmlFor="userName" value="Username" />

                    <TextInput
                        id="userName"
                        className="mt-1 block w-full "
                        value={user.userObject.userId}
                        required
                        isFocused
                        autoComplete="userName"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div>
                    <InputLabel htmlFor="displayName" value="Display Name" />

                    <TextInput
                        id="displayName"
                        className="mt-1 block w-full "
                        value={user.userObject.displayName}
                        required
                        isFocused
                        autoComplete="displayName"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div>
                    <InputLabel htmlFor="macAddress" value="MAC Address" />

                    <TextInput
                        id="macAddress"
                        className="mt-1 block w-full "
                        value={user.userObject.displayName}
                        required
                        isFocused
                        autoComplete="macAddress"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div>
                    <InputLabel htmlFor="affiliate" value="Affiliate" />

                    <TextInput
                        id="affiliate"
                        className="mt-1 block w-full disabled bg-gray-100"
                        value={user.affiliateName}
                        required
                        isFocused
                        autoComplete="affiliate"
                        editable = {false}
                        disabled
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div>
                    <InputLabel htmlFor="userNotes" value="User Notes" />

                    <TextInput
                        id="userNotes"
                        className="mt-1 block w-full "
                        value={user.userNotes}
                        required
                        isFocused
                        autoComplete="userNotes"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div>
                    <InputLabel htmlFor="router" value="Router/Nano IP:" />

                    <TextInput
                        id="router"
                        className="mt-1 block w-full "
                        value={user.userNotes}
                        required
                        isFocused
                        autoComplete="router"
                    />

                    {/* <InputError className="mt-2" message={errors.name} /> */}
                </div>

                <div >
                    <label className="flex items-center">
                        <Checkbox
                            name="active"
                            checked={true}
                            onChange={(e) => setData('active', e.target.checked)}
                           
                        />
                       
                        <InputLabel htmlFor="active" value="Active"  className='ml-2'/>
                    </label>
                </div>
            </div>
                


                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Update</PrimaryButton>
                   
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
