import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage, router } from '@inertiajs/react';


export default function TransferModal ({ modals, setModals, auth, users, wallets })
{
    let { flash } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "Transfer",
        fromWallet: auth.user.id,
        toWallet: "",
        description: "",
        amount: "",
    })



    const submit = (e) =>
    {
        e.preventDefault();
        console.log(data)
        router.post(`/wallets/store/`, { wallets: data })
    }

    const closeModal = () =>
    {
        setModals({
            transfer: false,
            // editExpense: false,
        });

        setData({
           
            type: "Transfer",
            fromWallet: auth.user.id,
            toWallet: "",
            description: "",
            amount: "",
           
        })

        flash.status == 201 && location.reload()

    };


    return (
        <Modal show={ modals.transfer } onClose={ closeModal } maxWidth={ 'xl' }>
            <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Wallet Transfer
                </h2>

                {/* <p className="mt-1 text-sm ">
                    You are about to change the account of this user: <span className="font-bold text-sky-700"></span>
                </p> */}

                <div className="mt-6">
                    <InputLabel htmlFor="fromWallet" value="From" />

                    <select
                        name="fromWallet"
                        id="fromWallet"
                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                        value={ data?.fromWallet }
                        onChange={ (e) => setData('fromWallet', e.target.value) }
                    >
                        
                        {/* 
                        <option value='All'>All</option>
                        
                        {
                            users?.map(u => <option value={ u.id } key={ u.id }>
                                { u.name }
                            </option>)
                        } */}

                        {
                            (auth.user.id == 1) ?

                                users?.map(u => <option value={ u.id } key={ u.id }>
                                    { u.name } ({ u.balance.toLocaleString() } IQD)
                                </option> ) : <option value={ auth.user.id } key={ auth.user.id } >
                                    { auth.user.name } ({ auth.user.balance.toLocaleString() } IQD)
                                </option>
                        }

                    </select>

                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="toWallet" value="To" />

                    <select
                        name="toWallet"
                        id="toWallet"
                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                        value={ data?.toWallet }
                        onChange={ (e) => setData('toWallet', e.target.value) }
                    >
                        {/*  

                        <option value='All'>All</option>
                        {
                            users?.map(u => <option value={ u.id } key={ u.id }>
                                { u.name }
                            </option>)
                        }

                        */}

                        {
                            users?.filter(u => u.id !== auth.user.id).map(u => <option value={ u.id } key={ u.id }>
                                { u.name } ({ u.balance.toLocaleString() } IQD)
                            </option>)
                        }

                    </select>

                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full "
                        value={ data.description }
                        isFocused
                        autoComplete="description"
                        onChange={ (e) => setData('description', e.target.value) }
                    />

                    {/* <InputError className="mt-2" message={ errors.description } />  */ }
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="amount" value="Amount" />

                    <TextInput
                        id="amount"
                        className="mt-1 block w-full "
                        value={ data.amount }
                        isFocused
                        autoComplete="amount"
                        type="number"
                        onChange={ (e) => setData('amount', e.target.value) }
                    />

                </div>



                <div className="mt-6 flex justify-end">
                    { flash.status == 201 &&
                        <span className='text-success pr-4'> Successfully Transfered! </span>
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
