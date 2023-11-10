import React from "react";
import { useForm, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from "@/Components/PrimaryBtn";

export default function PaymentSearch ({ className = '', affiliates, setFilterObj, filterObj })
{
    const { data, setData, post, processing, errors, reset } = useForm({
        userID: '',
        affiliateName: '',
        invoiceStatus: ''
    });

    const submit = (e) =>
    {
        e.preventDefault();
        // setFilterObj({ ...filterObj, ...data })
        // console.log(filterObj)
        router.post('/payments/search', data)
    };

    const pageReset = (e) =>
    {
        router.get('/payments')
    }

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">Payment</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="userID" value="UserID" />

                                    <TextInput
                                        id="userID"
                                        className="mt-1 block w-full "
                                        value={ data.userID }
                                        isFocused
                                        autoComplete="userID"
                                        onChange={ (e) => setData('userID', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>


                                <div>
                                    <InputLabel htmlFor="affiliateName" value="Affiliate" />

                                    <select
                                        name="affiliateName"
                                        id="affiliateName"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.affiliateName }
                                        onChange={ (e) => setData('affiliateName', e.target.value) }
                                    >
                                        <option value=''>All</option>
                                        {
                                            affiliates?.map(a => <option value={ a.affiliate_name } key={ a.affiliate_index }>
                                                { a.affiliate_name }
                                            </option>)
                                        }

                                    </select>

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>


                                <div>
                                    <InputLabel htmlFor="invoiceStatus" value="Invoice Status" />

                                    <select
                                        name="invoiceStatus"
                                        id="invoiceStatus"
                                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                        value={ data?.invoiceStatus }
                                        onChange={ (e) => setData('invoiceStatus', e.target.value) }
                                    >
                                        <option value='All'>All</option>
                                        <option value='NotPaid'>NotPaid</option>
                                        <option value='Paid'>Paid</option>

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
