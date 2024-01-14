import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage, router } from '@inertiajs/react';


export default function AddInvoiceModal ({ modals, setModals, auth, affiliates, customers, userIndexByGroup, accounts })
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
       
    })

    const [invoiceData, setInvoiceData] = useState({
        invoiceDescription: '',
        invoiceDuration: '',
        displayName: '',
        salePrice: '',
        retailPriceCurrency: '',
        retailPrice: '',
        recordDate: '',
        invoiceStatus: 'NotPaid',
        lastStatusChanged: '',
        userID: '',
        paidPrice: '0',
        discountedPrice: '',
        modifyUser: auth.user.name,
        paymentDueDate: '',
        paymentDueDateTime: '',
    })

    const setDataAll = () =>{
        const user = customers.find(c => c.customer_user_index == data.userIndex)
        const acc = accounts.find(a => a.account_name == data.accountName)
        const invoiceDuration = data.invoiceFrom.replaceAll('-', '/') + ' - ' + data.invoiceTo.replaceAll('-', '/')

        setInvoiceData({ ...invoiceData, userID: user.customer_user_id, salePrice: acc.account_price, invoiceDuration: invoiceDuration })
        

    //    document.getElementById('invoiceForm').submit(e);
    }

    const submit = (e) =>
    {
        e.preventDefault();
        setDataAll()
        // invoiceData.invoiceDuration && router.post('/invoices/store', { invoice: { ...data, ...invoiceData } });
        // invoiceData.invoiceDuration && console.log(invoiceData)

        router.post('/invoices/store', { invoice: { ...data, ...invoiceData } });
    }

    const closeModal = () =>
    {
        setModals({
            addInvoice: false,
            // editInvoice: false,
        });



        setData({
            invoinceID: '',
            userIndex: '',
            displayName: '',
            affiliateName: '',
            invoiceType: '',
            accountName: '',
            invoiceFrom: '',
            invoiceTo: '',
            invoiceDuration: '',
            invoiceDescription: '',
            referenceRecord: '',
            notes: '',
            salePrice: '',
            retailPriceCurrency: '',
            retailPrice: '',
            recordDate: '',
            invoiceStatus: 'NotPaid',
            lastStatusChanged: '',
            userID: '',
            paidPrice: '0',
            discountedPrice: '',
            modifyUser: auth.user.name,
            paymentDueDate: '',
            paymentDueDateTime: '',
        })

        flash.status == 201 && location.reload()

    };


    return (
        <Modal show={ modals.addInvoice } onClose={ closeModal } maxWidth={ 'xl' }>
            <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
                {/* <form className="p-6 scroll-form" autoComplete="off" id="invoiceForm"> */}
                <h2 className="text-lg font-medium text-gray-900">
                    Add New Invoice
                </h2>

                {/* <p className="mt-1 text-sm ">
                    You are about to change the account of this user: <span className="font-bold text-sky-700"></span>
                </p> */}

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


                <div className="mt-6 flex justify-end">
                    { flash.status == 201 &&
                        <span className='text-success pr-4'> Invoice added successfully! </span>
                    }
                    <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" disabled={ flash.status == 201 && true }>
                        Submit
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
