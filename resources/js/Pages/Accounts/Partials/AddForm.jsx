import { useState, useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function AddForm ({ className = '', accounts })
{

    const { processing, recentlySuccessful } = useForm();

    const { errors } = usePage().props

    const [values, setValues] = useState({
        account_index: '',
        account_name: '',
        is_max_account: '',
        account_description: '',
        end_user_account_price: ''

    });

    const [optionsAccounts, setOptionsAccounts] = useState([])

    const getAccounts = () =>
    {
        let optionsAccountsArr = [];
        {
            accounts.map((e) =>
            {
                optionsAccountsArr.push(
                    {
                        "index": e.account_index,
                        "name": e.account_name
                    }
                );
            });
        }
        setOptionsAccounts(optionsAccountsArr)
    }

    useEffect(() =>
    {
        getAccounts()

    }, [])

    function accountsHandleChange (e)
    {
        const value = e.target.value
        // console.log(value);
        setValues(values => ({
            ...values,
            'account_index': value,
        }))
    }

    function handleChange (e)
    {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit (e)
    {
        e.preventDefault()
        router.post('/accounts/insert', values)
    }

    return (
        <section className={ className }>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={ route('accounts') }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Local Account List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Add Additional Account</h2>
            </header>

            <form onSubmit={ handleSubmit } className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="account_index" value="Main Accounts" />
                        <SelectOption
                            id="account_index"
                            className="mt-1 block w-full"
                            options={ optionsAccounts }
                            select_text="Main Accounts"
                            name="account_index"
                            onChange={ accountsHandleChange }
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="account_name" value="Account Name" />
                        <TextInput
                            id="account_name"
                            name="account_name"
                            value={ values.account_name }
                            onChange={ handleChange }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                        <InputError message={ errors.account_name } className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="is_max_account" value="Max Account" />
                        <TextInput
                            id="is_max_account"
                            name="is_max_account"
                            value={ values.is_max_account }
                            onChange={ handleChange }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="end_user_account_price" value="User Account Price" />
                        <TextInput
                            id="end_user_account_price"
                            name="end_user_account_price"
                            value={ values.end_user_account_price }
                            onChange={ handleChange }
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                        <InputError message={ errors.end_user_account_price } className="mt-2" />
                    </div>

                    <div className='col-span-2'>
                        <InputLabel htmlFor="account_description" value="Account Description" />
                        <Textarea
                            id="account_description"
                            name="account_description"
                            placeholder="Description..."
                            value={ values.account_description }
                            onChange={ handleChange }
                            className="mt-1 block w-full"
                            minRows={ 3 }
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={ processing } type="submit">Add</PrimaryButton>

                    <Transition
                        show={ recentlySuccessful }
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Add</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
