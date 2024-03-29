import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function RefillModal ({ auth, modals, setModals, user, apitoken, accountTypes,sub_accounts,deposit_password }) {
    let { flash } = usePage().props

    const { data, setData, post, errors } = useForm({
        UserId: user.customer_user_id,
        DepositPassword: deposit_password,
        AccountId: user.account_index,
        Status: 'NotPaid',
        PaymentDueDate: '',
        Notes: '',
    })

    const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
    const { value, errMessage } = updateInfo

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
    });

    const getUserInfo = () => {
        console.log({ UserID: user.customer_user_id })
        instance.post('/userpayment/usersInvoice', { UserID: user.customer_user_id })
            .then(res => {
                console.log(res.data.value.itemsList[0])

                if (res.data.value.itemsList.length) {

                    const invoice = res.data.value.itemsList[0];
                    console.log(auth.user.name)
                    post(route('invoices.store', { invoice: { ...invoice, modifyUser: auth.user.name } }));

                    console.log(' data stored')
                } else {
                    console.log('no invoice')
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    const submit = (e) => {

        e.preventDefault();

        instance.post('/user/newrefilldeposit', { ...data, DepositPassword: +data?.DepositPassword })//DepositPassword: +data?.DepositPassword
            .then(res => {
                console.log('refill deposit runing ...')
                res.data.value ? (setUpdateInfo({ errMessage: '', value: res.data.value }), getUserInfo()) :
                    (setUpdateInfo({ errMessage: res.data.error.message, value: '' }))
            })
            .catch(err => {
                setUpdateInfo({ errMessage: err.message, value: '' })
            })
    }

    const closeModal = () => {
        setModals({
            ...modals,
            reFill: false
        });
        setUpdateInfo({ errMessage: '', value: '' })
        setData({
            ...data,
            DepositPassword: deposit_password,
            AccountId: '',
            Status: 'NotPaid',
            PaymentDueDate: '',
            Notes: '',
        })
        flash.status == 201 && location.reload()
    };

    useEffect(() => {
    }, []);

    return (
        <Modal show={modals.reFill} onClose={closeModal} maxWidth={'xl'}>
            <form onSubmit={submit} className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Refill Deposit
                </h2>

                <p className="mt-1 text-sm text-red-600">
                    { }
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="UserId" value="UserId :" />

                    <TextInput
                        id="UserId"
                        className="mt-1 block w-full  bg-gray-100"
                        value={user.customer_user_id}
                        readOnly={true}
                        autoComplete="off"
                    />

                </div>

                {
                    !!+user?.can_change_account &&
                    <div className="mt-6">
                        <InputLabel htmlFor="AccountId" value="Account Type:" />
                        <select
                            name="AccountId"
                            id="AccountId"
                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                            value={data.AccountId}
                            required
                            onChange={(e) => setData('AccountId', e.target.value)}
                        >
                            <option value='00'>Select Account Type </option>
                            {
                                sub_accounts?.map((a, index) => !!a && <option value={a.account_index} key={index}>
                                    {a.account_name}
                                </option>)
                            }

                        </select>
                        <InputError className="mt-2" message={errors.AccountId} />

                    </div>
                }

                <div className="mt-6">
                    <InputLabel htmlFor="Status" value="Invoice Type:" />
                    <select
                        name="Status"
                        id="Status"
                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                        value={data?.Status}
                        onChange={(e) => setData('Status', e.target.value)}
                    >
                        <option value='NotPaid'>Not Paid</option>
                        <option value='Paid'> Paid</option>

                    </select>
                    <InputError className="mt-2" message={errors.Status} />

                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="PaymentDueDate" value="Payment Due Date :" />

                    <TextInput
                        id="PaymentDueDate"
                        className="mt-1 block w-full  "
                        value={data?.PaymentDueDate}
                        onChange={(e) => setData('PaymentDueDate', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.PaymentDueDate} />

                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="Notes" value="Notes :" />

                    <TextInput
                        id="Notes"
                        className="mt-1 block w-full  "
                        value={data?.Notes}
                        onChange={(e) => setData('Notes', e.target.value)}
                    />

                </div>



                <div className="mt-6 flex justify-end">
                    {/* { value && <span className='text-success pr-4'> Refill Success </span> } */}

                    {errMessage && <span className='text-red-500 pr-4'> {errMessage} </span>}
                    {flash.status == 201 &&
                        <span className='text-success pr-4'> Refill Success </span>
                    }
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" >
                        Submit
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
