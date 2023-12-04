import React, { useState, useEffect } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Edit ({ auth, invoice })
{
    console.log(invoice)
    let { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({
        invoinceID: invoice.invoinceID,
        userIndex: invoice.userIndex,
        displayName: invoice.displayName,
        affiliateName: invoice.affiliateName,
        invoiceType: invoice.invoiceType,
        invoiceDescription: invoice.invoiceDescription,
        invoiceDuration: invoice.invoiceDuration,
        salePrice: invoice.salePrice,
        retailPriceCurrency: invoice.retailPriceCurrency,
        retailPrice: invoice.retailPrice,
        referenceRecord: invoice.referenceRecord,
        recordDate: invoice.recordDate,
        invoiceStatus: invoice.invoiceStatus,
        lastStatusChanged: invoice.lastStatusChanged,
        accountName: invoice.accountName,
        notes: invoice.notes,
        userID: invoice.userID,
        paidPrice: invoice.paidPrice,
        discountedPrice: invoice.discountedPrice,
        modifyUser: auth.user.name,
        paymentDueDate: invoice.paymentDueDate,
        paymentDueDateTime: invoice.paymentDueDateTime
    })

    const submit = (e) =>
    {
        e.preventDefault();
        router.post(`/invoice/update/${ invoice.id }`, { invoice: data })
        console.log('submit')
    };

    useEffect(() =>
    {
        (flash.status == 201) && reset()
        console.log(flash.status)
    }, [flash])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Invoice</h2> }
        >
            <Head title="Edit Invoice" />
            <div className="pt-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-4">
                            <header>
                                <h2 className="text-lg font-medium text-sky-600">Edit Invoice</h2>

                                {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}

                            </header>

                            <form onSubmit={ submit } className="mt-6 space-y-6 ">
                                <div className='grid grid-cols-3 gap-4'>

                                    <div>
                                        <InputLabel htmlFor="invoinceID" value="invoinceID" />

                                        <TextInput
                                            id="invoinceID"
                                            className="mt-1 block w-full "
                                            value={ data.invoinceID }
                                            isFocused
                                            autoComplete="invoinceID"
                                            onChange={ (e) => setData('invoinceID', e.target.value) }
                                        />

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

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

                                    </div>

                                    <div>
                                        <InputLabel htmlFor="displayName" value="displayName" />

                                        <TextInput
                                            id="displayName"
                                            className="mt-1 block w-full "
                                            value={ data.displayName }
                                            isFocused
                                            autoComplete="displayName"
                                            onChange={ (e) => setData('displayName', e.target.value) }
                                        />

                                    </div>

                                    <div>
                                        <InputLabel htmlFor="affiliateName" value="affiliateName" />

                                        <TextInput
                                            id="affiliateName"
                                            className="mt-1 block w-full "
                                            value={ data.affiliateName }
                                            isFocused
                                            autoComplete="affiliateName"
                                            onChange={ (e) => setData('affiliateName', e.target.value) }
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
                                        <InputLabel htmlFor="invoiceDescription" value="invoiceDescription" />

                                        <TextInput
                                            id="invoiceDescription"
                                            className="mt-1 block w-full "
                                            value={ data.invoiceDescription }
                                            isFocused
                                            autoComplete="invoiceDescription"
                                            onChange={ (e) => setData('invoiceDescription', e.target.value) }
                                        />

                                    </div>
                                    <div>
                                        <InputLabel htmlFor="invoiceDuration" value="invoiceDuration" />

                                        <TextInput
                                            id="invoiceDuration"
                                            className="mt-1 block w-full "
                                            value={ data.invoiceDuration }
                                            isFocused
                                            autoComplete="invoiceDuration"
                                            onChange={ (e) => setData('invoiceDuration', e.target.value) }
                                        />

                                    </div>

                                    <div>
                                        <InputLabel htmlFor="salePrice" value="salePrice" />

                                        <TextInput
                                            id="salePrice"
                                            className="mt-1 block w-full "
                                            value={ data.salePrice }
                                            isFocused
                                            autoComplete="salePrice"
                                            onChange={ (e) => setData('salePrice', e.target.value) }
                                        />

                                    </div>
                                    <div>
                                        <InputLabel htmlFor="retailPriceCurrency" value="retailPriceCurrency" />

                                        <TextInput
                                            id="retailPriceCurrency"
                                            className="mt-1 block w-full "
                                            value={ data.retailPriceCurrency }
                                            isFocused
                                            autoComplete="retailPriceCurrency"
                                            onChange={ (e) => setData('retailPriceCurrency', e.target.value) }
                                        />

                                    </div>
                                    <div>
                                        <InputLabel htmlFor="retailPrice" value="retailPrice" />

                                        <TextInput
                                            id="retailPrice"
                                            className="mt-1 block w-full "
                                            value={ data.retailPrice }
                                            isFocused
                                            autoComplete="retailPrice"
                                            onChange={ (e) => setData('retailPrice', e.target.value) }
                                        />

                                    </div>
                                    <div>
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

                                    <div>
                                        <InputLabel htmlFor="recordDate" value="recordDate" />

                                        <TextInput
                                            id="recordDate"
                                            className="mt-1 block w-full "
                                            value={ data.recordDate }
                                            isFocused
                                            autoComplete="recordDate"
                                            onChange={ (e) => setData('recordDate', e.target.value) }
                                        />

                                    </div>

                                </div>


                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={ processing } >Submit</PrimaryButton>
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
