import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function OnlineUsersSearch ({ className = '', affiliates })
{
    console.log(affiliates)
    const { data, setData, post, processing, errors, reset } = useForm({
        userName: '',
        userIP: '',
        affiliateName: '',
        callerMAC: '',
        loginFrom: '',
        sessionType: ['Any', 'Normal (With Internet)', 'Connected Only (Without Internet'],
        active: false

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
                            <h2 className="text-lg font-medium text-sky-600">Online Users</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="userName" value="Username" />

                                    <TextInput
                                        id="userName"
                                        className="mt-1 block w-full "
                                        value={ data.userName }
                                        isFocused
                                        autoComplete="userName"
                                        onChange={ (e) => setData('userName', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="userIP" value="User IP" />

                                    <TextInput
                                        id="userIP"
                                        className="mt-1 block w-full "
                                        value={ data?.userIP }
                                        isFocused
                                        autoComplete="userIP"
                                        onChange={ (e) => setData('userIP', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="affiliateName" value="Affiliate" />

                                    <select
                                        name="affiliateName"
                                        id="affiliateName"
                                        className='mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '
                                        value={ data?.affiliateName }
                                        onChange={ (e) => setData('affiliateName', e.target.value) }
                                    >
                                        <option value='all'>All</option>
                                        {
                                            affiliates?.map(a => <option value={ a.affiliate_index }>
                                                { a.affiliate_name }
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="callerMAC" value="Caller MAC" />

                                    <TextInput
                                        id="callerMAC"
                                        className="mt-1 block w-full"
                                        value={ data?.callerMAC }
                                        isFocused
                                        autoComplete="callerMAC"
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="loginFrom" value="Login From" />

                                    <TextInput
                                        id="loginFrom"
                                        className="mt-1 block w-full "
                                        value={ data?.loginFrom }
                                        isFocused
                                        autoComplete="loginFrom"
                                        onChange={ (e) => setData('loginFrom', e.target.value) }
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
                                            name="securityIssues"
                                            checked={ data.securityIssues }
                                            onChange={ (e) => setData('securityIssues', e.target.checked) }
                                        />

                                        <InputLabel htmlFor="securityIssues" value="Users with security issues only" className='ml-2' />
                                    </label>
                                </div>

                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Search</PrimaryButton>

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
