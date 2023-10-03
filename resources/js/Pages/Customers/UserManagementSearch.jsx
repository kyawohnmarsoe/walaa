import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UserManagementSearch ({ className = '', affiliates, accountTypes, setFilterObj })
{
    const status = ['All', 'Active', 'Inactive', 'Online', 'Offline', 'Will Expire', 'Expired', 'Activated', 'Didn\'t Pay', 'Paid', '', 'Manually suspended']

    const { data, setData, post, processing, errors, reset } = useForm({
        userId: '',
        FirstName: '',
        SubAffliateIndex: '',
        CallerId: '',
        Notes: '',
        PhoneFax: '',
        // AccountType: '',
        AccountStatusID: ''
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
        setFilterObj(data)
        console.log(data)

    };

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">User Management</h2>

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
                                    <InputLabel htmlFor="FirstName" value="Customer First Name" />

                                    <TextInput
                                        id="FirstName"
                                        className="mt-1 block w-full "
                                        value={ data?.FirstName }
                                        isFocused
                                        autoComplete="FirstName"
                                        onChange={ (e) => setData('FirstName', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="SubAffliateIndex" value="Affiliate" />

                                    <select
                                        name="SubAffliateIndex"
                                        id="SubAffliateIndex"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.SubAffliateIndex }
                                        onChange={ (e) => setData('SubAffliateIndex', e.target.value) }
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
                                    <InputLabel htmlFor="CallerId" value="MAC Address" />

                                    <TextInput
                                        id="CallerId"
                                        className="mt-1 block w-full"
                                        value={ data?.CallerId }
                                        isFocused
                                        autoComplete="CallerId"
                                        onChange={ (e) => setData('CallerId', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="Notes" value="User Notes" />

                                    <TextInput
                                        id="Notes"
                                        className="mt-1 block w-full "
                                        value={ data?.Notes }
                                        isFocused
                                        autoComplete="Notes"
                                        onChange={ (e) => setData('Notes', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="PhoneFax" value="Mobile Number" />

                                    <TextInput
                                        id="PhoneFax"
                                        className="mt-1 block w-full "
                                        value={ data?.PhoneFax }
                                        isFocused
                                        autoComplete="PhoneFax"
                                        onChange={ (e) => setData('PhoneFax', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                {/* <div>
                                    <InputLabel htmlFor="AccountType" value="Account Type" />

                                    <select
                                        name="AccountType"
                                        id="AccountType"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.AccountType }
                                        onChange={ (e) => setData('AccountType', e.target.value) }
                                    >
                                        <option value=''>All</option>

                                        {
                                            accountTypes?.map((a, account_index) => <option value={ account_index } key={ account_index }>
                                                { a.account_name }
                                            </option>)
                                        }

                                    </select>

                                     <InputError className="mt-2" message={errors.name} /> 
                                </div> */}

                                <div>
                                    <InputLabel htmlFor="AccountStatusID" value="User Status" />

                                    <select
                                        name="AccountStatusID"
                                        id="AccountStatusID"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.AccountStatusID }
                                        onChange={ (e) => setData('AccountStatusID', e.target.value) }
                                    >

                                        {
                                            status?.map((a, index) => !!a && <option value={ index } key={ index }>
                                                { a }
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>




                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Search</PrimaryButton>
                                <PrimaryButton disabled={ processing } onClick={ () => reset() } className="bg-gray-500">Reset</PrimaryButton>

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
