import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function OnlineUsersSearch ({ className = '', affiliates, filterObj, setFilterObj })
{
    const sessionTypes = ['Any', 'Normal (With Internet)', 'Connected Only (Without Internet)'];

    const { data, setData, post, processing, errors, reset } = useForm({
        userId: '',
        IP: '',
        affiliateId: '',
        MAC: '',
        CalledStation: '',
        sessionType: '',
        // securityIssues: false

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

        setFilterObj({ ...filterObj, ...data })
        console.log(filterObj)
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
                                    <InputLabel htmlFor="userId" value="UserId" />

                                    <TextInput
                                        id="userId"
                                        className="mt-1 block w-full "
                                        value={ data.userId }
                                        isFocused
                                        autoComplete="userId"
                                        onChange={ (e) => setData('userId', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="IP" value="User IP" />

                                    <TextInput
                                        id="IP"
                                        className="mt-1 block w-full "
                                        value={ data?.IP }
                                        isFocused
                                        autoComplete="IP"
                                        onChange={ (e) => setData('IP', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="affiliateId" value="Affiliate" />

                                    <select
                                        name="affiliateId"
                                        id="affiliateId"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.affiliateId }
                                        onChange={ (e) => setData('affiliateId', e.target.value) }
                                    >
                                        <option value=''>All</option>
                                        {
                                            affiliates?.map(a => <option value={ a.affiliate_index } key={ a.affiliate_index }>
                                                { a.affiliate_name }
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="MAC" value="Caller MAC" />

                                    <TextInput
                                        id="MAC"
                                        className="mt-1 block w-full"
                                        value={ data?.MAC }
                                        isFocused
                                        autoComplete="MAC"
                                        onChange={ (e) => setData('MAC', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="CalledStation" value="Login From" />

                                    <TextInput
                                        id="CalledStation"
                                        className="mt-1 block w-full "
                                        value={ data?.CalledStation }
                                        isFocused
                                        autoComplete="CalledStation"
                                        onChange={ (e) => setData('CalledStation', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="sessionType" value="Session Type" />

                                    <select
                                        name="sessionType"
                                        id="sessionType"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.sessionType }
                                        onChange={ (e) => setData('sessionType', e.target.value) }
                                    >

                                        {
                                            sessionTypes?.map((a, index) => <option value={ index } key={ index }>
                                                { a }
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                {/* <div >
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="securityIssues"
                                            checked={ data.securityIssues }
                                            onChange={ (e) => setData('securityIssues', e.target.checked) }
                                        />

                                        <InputLabel htmlFor="securityIssues" value="Users with security issues only" className='ml-2' />
                                    </label>
                                </div> */}

                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Search</PrimaryButton>
                                <PrimaryButton disabled={ processing } onClick={ () => reset() } className="resetBtn">Reset</PrimaryButton>



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
        </div >
    );
}
