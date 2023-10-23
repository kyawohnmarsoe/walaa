import React, { useState } from "react";
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function UserSessionsSearch ({ className = '', affiliates, setFilterObj, filterObj })
{


    const errorMsg = ['Wrong Password', 'User is Online', 'Access-Reject-User-Status is Inactive'];

    const { data, setData, post, processing, errors, reset } = useForm({
        UserID: '',
        SelectedAffiliateIndex: '',
        UserMac: '',
        StartAccountingDate: Date.now(),
        EndAccountingDate: Date.now()
    });

    const onDateChange = (id, date) =>
    {
        const d = date.toLocaleDateString()
        setData(id, date)
        console.log('date' + date)
        // console.log('id' + id)
        // console.log('date' + d)
    }

    const submit = (e) =>
    {
        e.preventDefault();

        // post(route('user.update'));
        const startDate = data.StartAccountingDate.toLocaleDateString()
        const endDate = data.EndAccountingDate.toLocaleDateString()

        setFilterObj({
            ...filterObj,
            UserID: data.UserID,
            SelectedAffiliateIndex: data.SelectedAffiliateIndex,
            UserMac: data.UserMac,
            StartAccountingDate: startDate,
            EndAccountingDate: endDate
        })
        console.log(filterObj)
    };

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">User Sessions</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

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

                                <div>
                                    <InputLabel htmlFor="UserMac" value="UserMac" />

                                    <TextInput
                                        id="UserMac"
                                        className="mt-1 block w-full "
                                        value={ data.UserMac }
                                        isFocused
                                        autoComplete="UserMac"
                                        onChange={ (e) => setData('UserMac', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>


                                <div>
                                    <InputLabel htmlFor="SelectedAffiliateIndex" value="Affiliate" />

                                    <select
                                        name="SelectedAffiliateIndex"
                                        id="SelectedAffiliateIndex"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.SelectedAffiliateIndex }
                                        onChange={ (e) => setData('SelectedAffiliateIndex', e.target.value) }
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
                                    <InputLabel htmlFor="StartAccountingDate" value="StartAccountingDate" />



                                    <DatePicker
                                        selected={ data.StartAccountingDate }
                                        onChange={ (date) => onDateChange('StartAccountingDate', date) }
                                        className="mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm"
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={ Date.now() }
                                    />


                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="EndAccountingDate" value="EndAccountingDate" />



                                    <DatePicker
                                        selected={ data.EndAccountingDate }
                                        onChange={ (date) => onDateChange('EndAccountingDate', date) }
                                        className="mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm"
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={ Date.now() }

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
    )
}
