import React from "react";
import { useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from "@/Components/PrimaryBtn";

export default function ExpenseSearch ({ className = '', setFilterObj, filterObj, users,auth })
{
    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        walletUserId: ''
    });

    const submit = (e) =>
    {
        e.preventDefault();
        // setFilterObj({ ...filterObj, ...data })
        console.log(data)

        router.post('/expenses/search', data)
    };

    const pageReset = (e) =>
    {
        router.get('/expenses')
    }

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">Expenses</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="type" value="Type" />

                                    <TextInput
                                        id="type"
                                        className="mt-1 block w-full "
                                        value={ data.type }
                                        isFocused
                                        autoComplete="type"
                                        onChange={ (e) => setData('type', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="walletUserId" value="Wallet" />

                                    <select
                                        name="walletUserId"
                                        id="walletUserId"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.walletUserId }
                                        required
                                        onChange={ (e) => setData('walletUserId', e.target.value) }
                                    >
                                        <option value='0' key='0' >
                                           All
                                        </option>
                                        {
                                            !(auth.user.id == 0) ?

                                                users?.map(u => <option value={ u.id } key={ u.id } >
                                                    { u.name } ({ u.balance.toLocaleString() } IQD)
                                                </option>) : <option value={ auth.user.id } key={ auth.user.id } >
                                                    { auth.user.name } ({ auth.user.balance.toLocaleString() } IQD)
                                                </option>
                                        }



                                    </select> 

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>


                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Search</PrimaryButton>
                                <PrimaryBtn disabled={ processing } onClick={ pageReset } className="resetBtn">Reset</PrimaryBtn>

                                {/* <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition> */}
                            </div>

                        </form>
                    </section>
                </div>
            </div>
        </div >
    )
}
