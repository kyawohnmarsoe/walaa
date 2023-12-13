import { useState, useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function DepositForm({ className = '', accounts, apitoken, deposit_password, deposit_id }) {

    const { processing } = useForm();

    const { flash } = usePage().props

    const [values, setValues] = useState({
        deposit_password: deposit_password,
    });

    useEffect(() => {
    }, [])

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
        router.post(`/customers/change_deposit_pass/${deposit_id}`, values)
    }


    return (
        <section className={className}>
            {/* <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 false '
                    href={route('customers.create')}>
                    Add User
                </a>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('customers')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Users List
                </a>
            </div> */}
            <header>
                <h2 className="text-lg font-medium text-sky-600">Change Deposit Password</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                {flash.message &&
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                        <p>{flash.message}</p>
                    </div>
                }

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="deposit_password" value="Deposit Password" />
                        <TextInput
                            id="deposit_password"
                            name="deposit_password"
                            value={values.deposit_password}
                            onChange={handleChange}
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
