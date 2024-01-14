import React, { useState, useEffect } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create ({ auth, affiliates, customers, userIndexByGroup, accounts })
{
    let { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({
        invoinceID: '',
        userIndex: '',
        affiliateName: '',
        invoiceType: '',
        accountName: '',
        invoiceFrom: '',
        invoiceTo: '',
        referenceRecord: '',
        notes: '',
        invoiceStatus: 'NotPaid',
        paidPrice: '0',
        modifyUser: auth.user.name,
    })

    const submit = (e) =>
    {
        e.preventDefault();
        router.post('/invoices/storedata', { invoice: data });
    }

    useEffect(() =>
    {
        (flash.status == 201) && reset()

        // console.log(flash.status)

    }, [flash])
 

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Invoice</h2> }
        >
            <Head title="Create Invoice" />
            <div className="pt-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-4">
                            <header>
                                <h2 className="text-lg font-medium text-sky-600">Create Invoice</h2>

                                {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}

                            </header>

                            <form onSubmit={ submit } className="mt-6 space-y-6 ">
                                <div className='grid grid-cols-3 gap-4'>
                                    <div className="mt-6">
                                        <InputLabel htmlFor="invoinceID" value="invoinceID" />

                                        <TextInput
                                            id="invoinceID"
                                            className="mt-1 block w-full "
                                            value={ data.invoinceID }
                                            isFocused
                                            required
                                            autoComplete="invoinceID"
                                            onChange={ (e) => setData('invoinceID', e.target.value) }
                                        />

                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="userIndex" value="userIndex" />
                                        <select
                                            name="userIndex"
                                            id="userIndex"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.userIndex }
                                            required
                                            // onChange={ (e) => setData('userIndex', e.target.value) }
                                            onChange={ (e) => setData('userIndex', e.target.value) }
                                        >
                                            <option value='0' key='0' >
                                                All
                                            </option>
                                            {
                                                (userIndexByGroup == 'all') ?

                                                    customers?.map(c => <option value={ c.customer_user_index } key={ c.id } >
                                                        { c.customer_user_id }
                                                    </option>) : userIndexByGroup?.map(c => <option value={ c.id } key={ c.id } >
                                                        { c.customer_user_id }
                                                    </option>)
                                            }



                                        </select>


                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="affiliateName" value="affiliateName" />


                                        <select
                                            name="affiliateName"
                                            id="affiliateName"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.affiliateName }
                                            required
                                            onChange={ (e) => setData('affiliateName', e.target.value) }
                                        >
                                            <option value='0' key='0' >
                                                All
                                            </option>
                                            {
                                                (!!affiliates.length) &&

                                                affiliates?.map(a => <option value={ a.affiliate_name } key={ a.id } >
                                                    { a.affiliate_name }
                                                </option>)
                                            }



                                        </select>

                                    </div>


                                    <div className="mt-6">
                                        <InputLabel htmlFor="invoiceType" value="invoiceType" />


                                        <select
                                            name="invoiceType"
                                            id="invoiceType"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.invoiceType }
                                            required
                                            onChange={ (e) => setData('invoiceType', e.target.value) }
                                        >
                                            <option value='Manually_Create' key='0' >
                                                Manually_Create
                                            </option>
                                            <option value=' Create_New_User' key='1' >
                                                Create_New_User
                                            </option>
                                            <option value='Refill_Deposit' key='2' >
                                                Refill_Deposit
                                            </option>
                                        </select>

                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="accountName" value="accountName" />


                                        <select
                                            name="accountName"
                                            id="accountName"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.accountName }
                                            required
                                            onChange={ (e) => setData('accountName', e.target.value) }
                                        >
                                            {
                                                !!accounts?.length && accounts.map(a => <option value={ a.account_name } key={ a.account_index } >
                                                    { a.account_name }
                                                </option>)
                                            }


                                        </select>

                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="invoiceFrom" value="invoiceFrom" />

                                        <TextInput
                                            id="invoiceFrom"
                                            className="mt-1 block w-full "
                                            value={ data.invoiceFrom }
                                            isFocused
                                            required
                                            type='date'
                                            autoComplete="invoiceFrom"
                                            onChange={ (e) => setData('invoiceFrom', e.target.value) }
                                        />

                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="invoiceTo" value="invoiceTo" />

                                        <TextInput
                                            id="invoiceTo"
                                            className="mt-1 block w-full "
                                            value={ data.invoiceTo }
                                            isFocused
                                            required
                                            type='date'
                                            autoComplete="invoiceTo"
                                            onChange={ (e) => setData('invoiceTo', e.target.value) }
                                        />

                                    </div>


                                    <div className="mt-6">
                                        <InputLabel htmlFor="referenceRecord" value="referenceRecord" />

                                        <TextInput
                                            id="referenceRecord"
                                            className="mt-1 block w-full "
                                            value={ data.referenceRecord }
                                            isFocused

                                            autoComplete="referenceRecord"
                                            onChange={ (e) => setData('referenceRecord', e.target.value) }
                                        />

                                    </div>

                                    <div className="mt-6">
                                        <InputLabel htmlFor="notes" value="notes" />

                                        <TextInput
                                            id="notes"
                                            className="mt-1 block w-full "
                                            value={ data.notes }
                                            isFocused
                                            autoComplete="notes"
                                            onChange={ (e) => setData('notes', e.target.value) }
                                        />

                                    </div>


                                  

                                </div>


                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={ processing } >Create</PrimaryButton>
                                    <PrimaryBtn disabled={ processing } onClick={ () => reset() } className="resetBtn">Reset</PrimaryBtn>
                                    { flash.status == 201 &&
                                        <span className='text-success pr-4'> Successfully Created </span>
                                    }
                                </div>

                            </form>
                        </section>
                    </div>
                </div>
            </div >
        </AuthenticatedLayout>
    )
}
