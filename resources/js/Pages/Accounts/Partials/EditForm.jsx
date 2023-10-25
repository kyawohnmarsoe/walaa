import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function EditForm({ className = '', accounts, account }) {

    const { processing, recentlySuccessful } = useForm();

    const [values, setValues] = useState({
        account_index: account.account_index,
        account_name: account.account_name,
        is_max_account: account.is_max_account,
        account_description: account.account_description,
        end_user_account_price: account.end_user_account_price

    });

    const [optionsAccounts, setOptionsAccounts] = useState([])

    const getAccounts = () => {
        let optionsAccountsArr = [];
        {
            accounts.map((e) => {
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

    useEffect(() => {
        getAccounts()

    }, [])

    function accountsHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'account_index': value,
        }))
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post(`/accounts/${account.id}`, values)
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit Account</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="account_index" value="Main Accounts" />
                        <SelectOption
                            id="account_index"
                            className="mt-1 block w-full"
                            options={optionsAccounts}
                            select_text="Main Accounts"
                            value={values.account_index}
                            name="account_index"
                            onChange={accountsHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="account_name" value="Account Name" />
                        <TextInput
                            id="account_name"
                            name="account_name"
                            value={values.account_name}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="is_max_account" value="Max Account" />
                        <TextInput
                            id="is_max_account"
                            name="is_max_account"
                            value={values.is_max_account}
                            onChange={handleChange}
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
                            value={values.end_user_account_price}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div className='col-span-2'>
                        <InputLabel htmlFor="account_description" value="Account Description" />
                        <Textarea
                            id="account_description"
                            name="account_description"
                            placeholder="Description..."
                            value={values.account_description}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            minRows={3}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Update</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}