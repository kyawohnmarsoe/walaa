import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UserManagementSearch({ className = '', affiliates, accountTypes, filterObj, setFilterObj }) {
    const status = ['All', 'Active', 'Inactive', 'Online', 'Offline', 'Will Expire', 'Expired', 'Activated', 'Didn\'t Pay', 'Paid', '', 'Manually suspended']

    const filterValue = new URLSearchParams(document.location.search).get("filterValue");

    const { flash } = usePage().props

    const getAccountStatusID = () => {
        switch (filterValue) {
            case 'ActiveUsers':
                return 1;
                break;
            case 'Expired':
                return 6;
                break;
            case 'WillBeDisabledIn2Days':
                return 5;
                break;
            case 'DisabledInLast7Days':
                return 5;
                break;
            case 'Online':
                return 3;
                break;
            case 'Offline':
                return 4;
                break;
            case 'DidntPayUsers':
                return 8;
                break;
            case 'ManualSuspendedUsers':
                return 11;
                break;
            default:
                return 0;
        }
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        userId: '',
        displayName: '',
        SubAffliateIndex: '',
        CallerId: '',
        Notes: '',
        PhoneFax: '',
        // AccountType: '',
        AccountStatusID: getAccountStatusID()
    });

    useEffect(() => {

        // return () => {
        //     reset('password');
        // };



    }, [filterValue]);

    const submit = (e) => {
        e.preventDefault();

        // post(route('user.update'));
        setFilterObj({ ...filterObj, ...data })
        console.log(filterObj)

    };

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">

                {flash.message &&
                    <div className="bg-green-100 border-l-4 mb-2 border-green-500 text-green-700 p-4" role="alert">
                        <p>{flash.message}</p>
                    </div>
                }

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={className}>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">All Users</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="userId" value="UserId" />

                                    <TextInput
                                        id="userId"
                                        className="mt-1 block w-full "
                                        value={data.userId}
                                        isFocused
                                        autoComplete="userId"
                                        onChange={(e) => setData('userId', e.target.value)}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>
                                    <InputLabel htmlFor="displayName" value="Display Name" />

                                    <TextInput
                                        id="displayName"
                                        className="mt-1 block w-full "
                                        value={data?.displayName}
                                        isFocused
                                        autoComplete="displayName"
                                        onChange={(e) => setData('displayName', e.target.value)}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>
                                    <InputLabel htmlFor="SubAffliateIndex" value="Affiliate" />

                                    <select
                                        name="SubAffliateIndex"
                                        id="SubAffliateIndex"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={data?.SubAffliateIndex}
                                        onChange={(e) => setData('SubAffliateIndex', e.target.value)}
                                    >
                                        <option value=''>All</option>
                                        {
                                            affiliates?.map(a => <option value={a.affiliate_index} key={a.affiliate_index}>
                                                {a.affiliate_name}
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>
                                    <InputLabel htmlFor="CallerId" value="MAC Address" />

                                    <TextInput
                                        id="CallerId"
                                        className="mt-1 block w-full"
                                        value={data?.CallerId}
                                        isFocused
                                        autoComplete="CallerId"
                                        onChange={(e) => setData('CallerId', e.target.value)}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>
                                    <InputLabel htmlFor="Notes" value="User Notes" />

                                    <TextInput
                                        id="Notes"
                                        className="mt-1 block w-full "
                                        value={data?.Notes}
                                        isFocused
                                        autoComplete="Notes"
                                        onChange={(e) => setData('Notes', e.target.value)}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>

                                <div>
                                    <InputLabel htmlFor="PhoneFax" value="Mobile Number" />

                                    <TextInput
                                        id="PhoneFax"
                                        className="mt-1 block w-full "
                                        value={data?.PhoneFax}
                                        isFocused
                                        autoComplete="PhoneFax"
                                        onChange={(e) => setData('PhoneFax', e.target.value)}
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
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
                                        value={data?.AccountStatusID}
                                        onChange={(e) => setData('AccountStatusID', e.target.value)}
                                    >

                                        {
                                            status?.map((a, index) => !!a && <option value={index} key={index}>
                                                {a}
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */}
                                </div>




                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton>Search</PrimaryButton>
                                <PrimaryButton onClick={() => reset()} className="resetBtn">Reset</PrimaryButton>

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
