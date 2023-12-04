import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage, router } from '@inertiajs/react';


export default function AddExpenseModal ({ modals, setModals, auth, users })
{
    let { flash } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        walletUserId: '',
        type: '',
        description: '',
        amount: '',
        submittedBy: '',
        modifyUser: auth.user.email
    })

   

    const submit = (e) =>
    {
        e.preventDefault();
        console.log({ expense: data })
        router.post(`/expenses/store/`, { expense: data })
    }

    const closeModal = () =>
    {
        setModals({
            addExpense: false,
            // editExpense: false,
        });

      

        setData({
            walletUserId: '',
            type: '',
            description: '',
            amount: '',
            submittedBy: '',
        })

        flash.status == 201 && location.reload()

    };


    return (
        <Modal show={ modals.addExpense } onClose={ closeModal } maxWidth={ 'xl' }>
            <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Add New Expense 
                </h2>

                {/* <p className="mt-1 text-sm ">
                    You are about to change the account of this user: <span className="font-bold text-sky-700"></span>
                </p> */}

                <div className="mt-6">
                    <InputLabel htmlFor="walletUserId" value="Wallet:" />

                    <select
                        name="walletUserId"
                        id="walletUserId"
                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                        value={ data?.walletUserId }
                        required
                        onChange={ (e) => setData('walletUserId', e.target.value) }
                    >
                       
                       {
                            (auth.user.id == 1) ?

                            users?.map( u => <option value={ u.id } key={ u.id } >
                                    { u.name } ({ u.balance.toLocaleString() } IQD)
                                </option> )  : <option value={ auth.user.id } key={ auth.user.id } >
                                    { auth.user.name } ({ auth.user.balance.toLocaleString() } IQD)
                                </option>
                       }

                      

                    </select> 

                    
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
                        <span className='text-success pr-4'> Expense added successfully! </span>
                    }
                    <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" disabled={ flash.status == 201 && true}>
                        Submit
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
