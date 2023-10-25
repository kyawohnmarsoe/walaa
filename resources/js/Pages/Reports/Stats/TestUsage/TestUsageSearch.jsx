import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function TestUsageSearch ({ className = '', affiliates, filterObj, setFilterObj })
{

    const { data, setData, post, processing, errors, reset } = useForm({
        UserID: '',
        affiliateId: ''
    });

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
                            <h2 className="text-lg font-medium text-sky-600">Test Usage Report</h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Last 30 days report
                            </p>
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

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
                                    <InputLabel htmlFor="UserID" value="UserID" />

                                    <TextInput
                                        id="UserID"
                                        className="mt-1 block w-full "
                                        value={ data.UserID }
                                        isFocused
                                        autoComplete="UserID"
                                        onChange={ (e) => setData('UserID', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
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
