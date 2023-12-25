import React, { useState, useEffect } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Transfer ({ auth,wallets })
{
    let { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({    
        user_id: "",
        fromWallet: "",
        toWallet:"",
        type: "Transfer",
        description: "",
        amount: "",
       
    })

    const submit = (e) =>
    {
        e.preventDefault();
        router.post('/wallets/store', {
            invoice: {
                "user_id": "",
                "fromWallet": "",
                "toWallet": "",
                "type": "Transfer",
                "description": "",
                "amount": "",
            }
        })
        console.log(data)

        // router.post('/invoice/store', { invoice: data });
    };

    useEffect(() =>
    {
        (flash.status == 201) && reset()
        console.log(flash.status)
    }, [flash])

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallet Transfer</h2> }
        >
            <Head title="Wallet Transfer" />
            <div className="pt-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="p-4">
                            <header>
                                <h2 className="text-lg font-medium text-sky-600">Wallet Transfer</h2>

                                {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}

                            </header>

                            <form onSubmit={ submit } className="mt-6 space-y-6 ">
                                <div className='grid grid-cols-3 gap-4'>

                                    <div>
                                        <InputLabel htmlFor="fromWallet" value="From" />

                                        <select
                                            name="fromWallet"
                                            id="fromWallet"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.fromWallet }
                                            onChange={ (e) => setData('fromWallet', e.target.value) }
                                        >
                                            <option value='All'>All</option>
                                            {
                                                wallets?.map(a => <option value={ a.id } key={ a.id }>
                                                    { a.id }
                                                </option>)
                                            }

                                        </select>

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="toWallet" value="To" />

                                        <select
                                            name="toWallet"
                                            id="toWallet"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.toWallet }
                                            onChange={ (e) => setData('toWallet', e.target.value) }
                                        >
                                            <option value='All'>All</option>
                                            {
                                                wallets?.map(a => <option value={ a.id } key={ a.id }>
                                                    { a.id }
                                                </option>)
                                            }

                                        </select>

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="description" value="Description" />

                                        <TextInput
                                            id="description"
                                            className="mt-1 block w-full "
                                            value={ data.description }
                                            isFocused
                                            autoComplete="description"
                                            type="number"
                                            onChange={ (e) => setData('description', e.target.value) }
                                        />

                                        {/* <InputError className="mt-2" message={ errors.description } />  */}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="amount" value="Amount" />

                                        <TextInput
                                            id="amount"
                                            className="mt-1 block w-full "
                                            value={ data.amount }
                                            isFocused
                                            autoComplete="amount"
                                            onChange={ (e) => setData('amount', e.target.value) }
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
