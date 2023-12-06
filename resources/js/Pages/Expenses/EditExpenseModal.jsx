import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage, router } from '@inertiajs/react';


export default function EditExpenseModal ({ modals, setModals, auth, users, user, expense })
{
    let { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({
        walletUserId: expense.walletUserId,
        type: expense.type,
        description: expense.description,
        amount: expense.amount,
        submittedBy: expense.submittedBy,
        modifyUser: auth.user.email
    })

  

    const submit = (e) =>
    {
        e.preventDefault();
        router.post(`/expenses/update/${ expense.id }`, { expense: data, prevAmount: expense.amount } )
    }

    const closeModal = () =>
    {
        setModals({
            // addExpense: false,
            editExpense: false,
        });

       

        setData({
            walletUserId: expense.walletUserId,
            type: expense.type,
            description: expense.description,
            amount: expense.amount,
            submittedBy: expense.submittedBy,
            modifyUser: auth.user.email
        })

        flash.status == 201 && location.reload()

    };


    return (
        <Modal show={ modals.editExpense } onClose={ closeModal } maxWidth={ 'xl' }>
            <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Edit Expense
                </h2>

                {/* <p className="mt-1 text-sm ">
                    You are about to change the account of this user: <span className="font-bold text-sky-700"></span>
                </p> */}

                <div className="mt-6">
                    <InputLabel htmlFor="walletUserId" value=" Wallet:" />

                    <TextInput
                        name="walletUserId"
                        id="walletUserId"
                        className="mt-1 block w-full bg-gray-100"
                        defaultValue={ user?.name }
                        readOnly={ true }
                    />
                    
                    <InputError className="mt-2" message={ errors.AccountId } />

                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="type" value="Type :" />

                    <TextInput
                        id="type"
                        className="mt-1 block w-full  "
                        value={ data?.type }
                        onChange={ (e) => setData('type', e.target.value) }
                        required
                    />

                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="description" value="Description :" />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full  "
                        value={ data?.description }
                        onChange={ (e) => setData('description', e.target.value) }
                        required
                    />

                </div>


                <div className="mt-6">
                    <InputLabel htmlFor="amount" value="Amount :" />

                    <TextInput
                        id="amount"
                        className="mt-1 block w-full  "
                        type="number"
                        value={ data?.amount }
                        onChange={ (e) => setData('amount', e.target.value) }
                        required
                    />

                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="submittedBy" value="Submitted By :" />

                    <TextInput
                        id="submittedBy"
                        className="mt-1 block w-full  "
                        value={ data?.submittedBy }
                        onChange={ (e) => setData('submittedBy', e.target.value) }

                    />

                </div>


                <div className="mt-6 flex justify-end">
                    { flash.status == 201 &&
                        <span className='text-success pr-4'> Expense updated successfully! </span>
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
