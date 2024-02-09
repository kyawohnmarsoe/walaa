import React, { useState, useEffect } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from "@/Components/PrimaryBtn";
import Select, { components } from "react-select";
import InputError from '@/Components/InputError';

export default function PaymentSearch ({ className, affiliates, errors, customer_id })
{
    const { processing, recentlySuccessful } = useForm();
    let { flash } = usePage().props
    const Input = (props) =>
    {
        const { autoComplete = props.autoComplete } = props.selectProps;
        return <components.Input { ...props } autoComplete={ autoComplete } />;
    };


    // const [selectedOpt, setSelectedOpt] = useState('')

    const [optionsAffiliatesName, setOptionsAffiliatesName] = useState([])
    const [selectedOptName, setSelectedOptName] = useState('')

    const [values, setValues] = useState({
        affiliate_name: '',
        affiliate_index: '',
        prev_balance: '',
        paid_amount: '',
        current_balance: '',
        notes: '',
        modify_user: ''
    });

    const paindAmountChange = (e) =>
    {

        const current_balance = values.prev_balance + +e.target.value

        setValues({
            ...values,
            paid_amount: e.target.value,
            current_balance: current_balance
        })
    }


    const getAffiliates = () =>
    {
        // let optionsCustomersArr = [];
        // {
        //     affiliates.map((e) =>
        //     {
        //         // console.log(e.affiliate_index)
        //         optionsCustomersArr.push(
        //             {
        //                 "value": e.affiliate_index,
        //                 "label": e.affiliate_name
        //             }
        //         );
        //     });
        // }
        // setOptionsCustomers(optionsCustomersArr)

        let optionsAffiliatesNameArr = [];
        {
            
            affiliates.map((e) =>
            {
                // console.log(e.affiliate_name)
                optionsAffiliatesNameArr.push(
                    {
                        "value": e.affiliate_index,
                        "label": e.affiliate_name
                    }
                );
            });
        }
        setOptionsAffiliatesName(optionsAffiliatesNameArr)
    }

    const getSelectedAffiliate = (affiliate_index) =>
    {
        {
            let selectedRes = affiliates.filter(affiliate => affiliate_index == affiliate.affiliate_index)
            console.log(selectedRes[0])
            // setSelectedOpt(selectedRes[0]['affiliate_index'])
            setSelectedOptName(selectedRes[0]['affilate_index'])
           
            // console.log(selectedRes[0]['balance'])

            setValues({
                ...values,
                prev_balance: selectedRes[0]['balance'],
                affiliate_name: selectedRes[0]['affiliate_name'],
                affiliate_index: selectedRes[0]['affiliate_index'],
                paid_amount: '',
                current_balance: '',
            })
        }
    }


    function AffiliatesNameHandleChange (e)
    {
        const value = e.value
        const label = e.label
        // console.log(e.value)
        setValues(values => ({
            ...values,
            'affiliate_name': value,
            'affiliate_index': label,
        }))
        getSelectedAffiliate(value)
       
    }

    useEffect(() =>
    {
        getAffiliates()
        values.affiliate_index ? getSelectedAffiliate(values.affiliate_index) : ''

    }, [selectedOptName])


    const submit = (e) =>
    {
        e.preventDefault();
        router.post('/affiliates/payments', { payment: values })
        flash.status == 201 && location.reload()
    };

    const pageReset = (e) =>
    {
        router.get('/affilates/payments')
    }

    useEffect(() =>
    {
        flash.status == 201 && location.reload()
    }, [flash.status])

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-sky-600">Payments</h2>

                            {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                        </header>

                        <form onSubmit={ submit } className="mt-6 space-y-6 ">
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="affiliate_name" value="Name " className='required' />
                                    <Select
                                        name="affiliate_name"
                                        className="autoselect border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        components={ { Input } }
                                        autoComplete="affiliate_name"
                                        value={ { value: values.affiliate_index, label: values.affiliate_name } }
                                        options={ optionsAffiliatesName }
                                        onChange={ AffiliatesNameHandleChange }
                                        noOptionsMessage={ () => "No Data found..." }
                                    />
                                    {/* <InputError className="mt-2" message={ errors.affiliate_name } /> */ }
                                </div>

                               

                                <div>
                                    <InputLabel htmlFor="notes" value="notes" />

                                    <TextInput
                                        id="notes"
                                        className="mt-1 block w-full "
                                        value={ values.notes }
                                        isFocused
                                        autoComplete="notes"
                                        onChange={ (e) => setValues({ ...values, notes: e.target.value }) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>


                            </div>
                            <div className='grid grid-cols-3 gap-4'>

                                <div>
                                    <InputLabel htmlFor="prev_balance" value="prev_balance" />

                                    <TextInput
                                        id="prev_balance"
                                        className="mt-1 block w-full bg-gray-100"
                                        defaultValue={ values.prev_balance }
                                        isFocused
                                        autoComplete="prev_balance"
                                        readOnly={ true }

                                    //   onChange={ (e) => setData('prev_balance', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="paid_amount" value="paid_amount" />

                                    <TextInput
                                        id="paid_amount"
                                        className="mt-1 block w-full "
                                        value={ values.paid_amount }
                                        isFocused
                                        autoComplete="paid_amount"
                                        onChange={ (e) => paindAmountChange(e) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                                <div>
                                    <InputLabel htmlFor="current_balance" value="current_balance" />

                                    <TextInput
                                        id="current_balance"
                                        className="mt-1 block w-full bg-gray-100"
                                        defaultValue={ values.current_balance }
                                        isFocused
                                        autoComplete="current_balance"
                                        readOnly={ true }

                                    //   onChange={ (e) => setData('current_balance', e.target.value) }
                                    />

                                    {/* <InputError className="mt-2" message={errors.name} /> */ }
                                </div>

                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={ processing }>Paid</PrimaryButton>
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
