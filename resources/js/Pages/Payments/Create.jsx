import React, { useState } from "react";
import { useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create ()
{
    const test = 'test'
    const { data, setData, post, processing, errors, reset } = useForm({
        userIndex: test,
        accountType: test,
        price: test,
        startDate: test,
        endDate: test,
        invoiceDate: test,
        paymentDate: test,
        invoiceType: test,
        description: test,
        notes: test,
        status: test,
        paidAmount: test,
    })

    const submit = (e) =>
    {
        e.preventDefault();

        // post(route('user.update'));
        router.post('/payments/store', data)
    };

    return (
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

                                <div>
                                    <InputLabel htmlFor="userIndex" value="userIndex" />

                                    <TextInput
                                        id="userIndex"
                                        className="mt-1 block w-full "
                                        value={ data.userIndex }
                                        isFocused
                                        autoComplete="userIndex"
                                        onChange={ (e) => setData('userIndex', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="accountType" value="accountType" />

                                    <TextInput
                                        id="accountType"
                                        className="mt-1 block w-full "
                                        value={ data.accountType }
                                        isFocused
                                        autoComplete="accountType"
                                        onChange={ (e) => setData('accountType', e.target.value) }
                                    />

                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="price" />

                                    <TextInput
                                        id="price"
                                        className="mt-1 block w-full "
                                        value={ data.price }
                                        isFocused
                                        autoComplete="price"
                                        onChange={ (e) => setData('price', e.target.value) }
                                    />

                                </div>

                                <div>
                                    <InputLabel htmlFor="startDate" value="startDate" />

                                    <TextInput
                                        id="startDate"
                                        className="mt-1 block w-full "
                                        value={ data.startDate }
                                        isFocused
                                        autoComplete="startDate"
                                        onChange={ (e) => setData('startDate', e.target.value) }
                                    />

                                </div>
                                <div>
                                    <InputLabel htmlFor="endDate" value="endDate" />

                                    <TextInput
                                        id="endDate"
                                        className="mt-1 block w-full "
                                        value={ data.endDate }
                                        isFocused
                                        autoComplete="endDate"
                                        onChange={ (e) => setData('endDate', e.target.value) }
                                    />

                                </div>
                                <div>
                                    <InputLabel htmlFor="invoiceDate" value="invoiceDate" />

                                    <TextInput
                                        id="invoiceDate"
                                        className="mt-1 block w-full "
                                        value={ data.invoiceDate }
                                        isFocused
                                        autoComplete="invoiceDate"
                                        onChange={ (e) => setData('invoiceDate', e.target.value) }
                                    />

                                </div>
                                <div>
                                    <InputLabel htmlFor="paymentDate" value="paymentDate" />

                                    <TextInput
                                        id="paymentDate"
                                        className="mt-1 block w-full "
                                        value={ data.paymentDate }
                                        isFocused
                                        autoComplete="paymentDate"
                                        onChange={ (e) => setData('paymentDate', e.target.value) }
                                    />

                                </div>

                                <div>
                                    <InputLabel htmlFor="invoiceType" value="invoiceType" />

                                    <TextInput
                                        id="invoiceType"
                                        className="mt-1 block w-full "
                                        value={ data.invoiceType }
                                        isFocused
                                        autoComplete="invoiceType"
                                        onChange={ (e) => setData('invoiceType', e.target.value) }
                                    />

                                </div>
                                <div>
                                    <InputLabel htmlFor="description" value="description" />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full "
                                        value={ data.description }
                                        isFocused
                                        autoComplete="description"
                                        onChange={ (e) => setData('description', e.target.value) }
                                    />

                                </div>
                                <div>
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
                                <div>
                                    <InputLabel htmlFor="status" value="status" />

                                    <TextInput
                                        id="status"
                                        className="mt-1 block w-full "
                                        value={ data.status }
                                        isFocused
                                        autoComplete="status"
                                        onChange={ (e) => setData('status', e.target.value) }
                                    />

                                </div>

                                <div>
                                    <InputLabel htmlFor="paidAmount" value="paidAmount" />

                                    <TextInput
                                        id="paidAmount"
                                        className="mt-1 block w-full "
                                        value={ data.paidAmount }
                                        isFocused
                                        autoComplete="paidAmount"
                                        onChange={ (e) => setData('paidAmount', e.target.value) }
                                    />

                                </div>

                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Search</PrimaryButton>
                                <PrimaryButton disabled={ processing } onClick={ () => reset() } className="resetBtn">Reset</PrimaryButton>
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </div >
    )
}
