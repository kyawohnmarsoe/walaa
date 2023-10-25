import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function PrepaidNeededSearch ({ className = '', affiliates, setFilterObj, filterObj })
{


    const errorMsg = ['Wrong Password', 'User is Online', 'Access-Reject-User-Status is Inactive'];

    const { data, setData, post, processing, errors, reset } = useForm({
        AffiliateIndex: '',
        Days: 7,
        Show: ''
    });

    const submit = (e) =>
    {
        e.preventDefault();

        setFilterObj({
            ...filterObj,
            ...data
        })
        console.log(filterObj)
    };

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">Prepaid Needed</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <InputLabel htmlFor="Days" value="Number of prepaid cards needed for the next "
                                        className='inline' />

                                    <TextInput
                                        id="Days"
                                        className="mt-1 w-10 "
                                        value={ data.Days }
                                        isFocused
                                        autoComplete="Days"
                                        onChange={ (e) => setData('Days', e.target.value) }
                                    />
                                    <span className=" font-medium text-sm text-gray-700 "> Days </span>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="AffiliateIndex" value="Affiliate" />

                                    <select
                                        name="AffiliateIndex"
                                        id="AffiliateIndex"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.AffiliateIndex }
                                        onChange={ (e) => setData('AffiliateIndex', e.target.value) }
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
                                    <InputLabel htmlFor="Show" value="Show" />

                                    <select
                                        name="Show"
                                        id="Show"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.Show }
                                        onChange={ (e) => setData('Show', e.target.value) }
                                    >
                                        <option value=''>All</option>
                                        <option value=''>Needed</option>
                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                            </div>

                            <div className='grid grid-cols-1  gap-4'>
                                <div className="font-medium text-sm text-gray-700 italic">
                                    Your current deposit balance : <span className="text-emerald-700">3,869,000 IQD</span>
                                    <br />
                                    Remaining balance after this: <span className="text-red-700"> 57,500 IQD</span>
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
    )
}
