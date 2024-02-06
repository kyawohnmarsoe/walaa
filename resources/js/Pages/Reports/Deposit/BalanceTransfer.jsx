import React, { useRef, useEffect, useState } from "react";
import { useForm, usePage, router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryBtn from '@/Components/PrimaryBtn';
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import PaginatedLinks from '@/Components/PaginatedLinks';


export default function BalanceTransfer ({ className = '', affiliates, apitoken, auth, deposit_password, transactions })
{
    let { flash } = usePage().props
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })
    const [main, setMain] = useState({ affiliate: '', errMessage: '', failMessage: '', value: '' })
    const { affiliate, errMessage, failMessage, value } = main
    const { data, setData, post, processing, errors, reset } = useForm({
        TargetAffiliateIndex: '',
        Amount: '',
        DepositPassword: deposit_password,
        affiliate_name: '',
        notes: '',
        balance:0
    });



    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${ apitoken }` }
    });

    const [deposit, setDeposit] = useState({ current: '' })

    useEffect(() =>
    {
        instance.get('/affiliate/deposit/balance')
            .then(res =>
            { setDeposit({ ...deposit, current: res.data.value }) })
            .catch(err => { console.log(err.message) })
    }, [value])

    useEffect(() =>
    {
        flash.status == 201 && location.reload()
    }, [flash.status])

    useEffect(() =>
    {
      
        instance.get('/affiliate')
            .then(res =>
            {
                setMain({ affiliate: res.data.value.mainAffiliate, errMessage: '', failMessage: '', value: '' })

            })
            .catch(err =>
            {
                setMain({ affiliate: '', errMessage: err.message, failMessage: '', value: '' })
                console.log(err.message)
            })
    }, [])

    const [confirmingTransfer, setConfirmingTransfer] = useState(false);

    const confirmTransfer = () =>
    {
        data?.TargetAffiliateIndex && data?.Amount &&
            setConfirmingTransfer(true);
    };

    const closeModal = () =>
    {
        setConfirmingTransfer(false);
        reset();
        setMain({ ...main, failMessage: '' })
    };

    // api / reseller / affiliate / deposit / transferBalance
    const submit = (e) =>
    {
        e.preventDefault();

        console.log('submit')

        router.post(`/deposit/store/`, data) 
        
        return 

        instance.post('/affiliate/deposit/transferBalance1', data)
            .then(res =>
            {
                console.log(res.data)
                res.data.value ? ( setMain({ ...main, failMessage: '', value: res.data.value }), 
                    router.post(`/deposit/store/`, data) ):
                    setMain({ ...main, failMessage: res.data.error.message, value: '' })

            })
            .catch(err =>
            {
               
                setMain({ ...main, failMessage: err.message, value: '' })
               
                console.log(err.message)
            })

    };

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Balance Transfer</h2> }
        >
            <Head title="Balance Transfer" />

            <Modal show={ confirmingTransfer } onClose={ closeModal } maxWidth={ 'xl' }>
                <form onSubmit={ submit } className="p-6" >
                    <h2 className="text-lg font-medium text-gray-900">
                        Please type deposit password to confirm your transfer?
                    </h2>

                    {/* <p className="mt-1 text-sm text-red-600">
                        { main?.failMessage }
                    </p> */}

                    <div className="mt-6">
                        <InputLabel htmlFor="DepositPassword" value="DepositPassword" className="sr-only" />

                        <TextInput
                            id="DepositPassword"
                            type="password"
                            name="DepositPassword"
                            value={ data?.DepositPassword }
                            onChange={ (e) => setData('DepositPassword', e.target.value) }
                            className="mt-1 block w-full"
                            isFocused
                            min="5000"
                        />

                        <InputError message={ errors.DepositPassword } className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        { value && <span className='text-success pr-4'> Transfer Success </span> }

                        { failMessage && <span className='text-red-500 pr-4'> { failMessage } </span> }

                        <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3" disabled={ processing }>
                            Transfer
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> } */}

            <div className="pt-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className='p-4'>
                            <header>
                                <h2 className="text-lg font-medium text-sky-600">Balance Transfer</h2>

                                {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                            </header>

                            <form onSubmit={ submit } className="mt-6 space-y-6 ">
                                {
                                    main.errMessage && <div className='grid grid-cols-1 gap-4'>
                                        {/* <div></div> */ }
                                        <div className="text-red-500">Cannot retrive main affiliate data from the server, please try again!</div>
                                    </div>
                                }
                                <div className='grid md:grid-cols-3 gap-4'>
                                    <h2 className="text-lg font-medium text-gray-600">From Affiliate Account</h2>

                                    <div>
                                        <InputLabel htmlFor="Affiliate" value="Affiliate" />

                                        <TextInput
                                            id="Affiliate"
                                            className="mt-1 block w-full disabled bg-gray-100"
                                            defaultValue={ main.affiliate }
                                            readOnly={ true }
                                        />

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-3 gap-4'>
                                    <h2 className="text-lg font-medium text-gray-600">To Affiliate Account</h2>

                                    <div>
                                        <InputLabel htmlFor="TargetAffiliateIndex" value="Affiliate" />

                                        <select
                                            name="TargetAffiliateIndex"
                                            id="TargetAffiliateIndex"
                                            className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                                            value={ data?.TargetAffiliateIndex }
                                            onChange={ (e) => setData('TargetAffiliateIndex', e.target.value) }
                                        required
                                        >
                                            <option value=''>All</option>
                                            {
                                                affiliates?.map(a => <option value={ a.affiliate_index } key={ a.affiliate_index }>
                                                    { a.affiliate_name }
                                                </option>)
                                            }

                                        </select>

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>



                                </div>


                                <div className='grid md:grid-cols-3 gap-4'>
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-600">Transfer details</h2>
                                        <div className="font-medium text-sm text-gray-700 italic">
                                            Your current deposit balance : <span className="text-emerald-700">{ deposit.current.toLocaleString() } IQD </span>
                                            <br />
                                            {/* Remaining balance after this: <span className="text-red-700"> 57,500 IQD</span> */ }
                                        </div>
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="Amount" value="Amount" />

                                        <TextInput
                                            id="Amount"
                                            className="mt-1 block w-full "
                                            value={ data.Amount }
                                            autoComplete="Amount"
                                            onChange={ (e) => setData('Amount', e.target.value) }
                                            type="number"
                                            placeholder="Minimum amount is 5000 IQD"
                                            min="5000"
                                        // required
                                        />

                                        <div className="text-sm mt-1 text-sky-600">** Please fill all required fields to continue transition.</div>

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                </div>

                               

                                <div className='grid md:grid-cols-3 gap-4'>
                                    <div></div>
                                    <div>
                                        <InputLabel htmlFor="notes" value="Notes" />

                                        <TextInput
                                            id="notes"
                                            className="mt-1 block w-full disabled "
                                            value={ main.notes }
                                            onChange={ (e) => setData('notes', e.target.value) }

                                        />

                                        {/* <InputError className="mt-2" message={errors.name} /> */ }
                                    </div>

                                </div>

                                <div className='grid md:grid-cols-3 gap-4'>
                                    <div></div>
                                    <div className="items-center gap-4">
                                        {/* <PrimaryBtn onClick={ confirmTransfer }>Transfer</PrimaryBtn> */}
                                        <div className="mb-3">
                                            <PrimaryButton disabled={ processing }>
                                                Transfer
                                            </PrimaryButton>
                                        </div>
                                        <div>
                                            { value && <span className='text-success text-sm'> Transfer Success </span> }

                                            { failMessage && <span className='text-red-500 text-sm'> { failMessage } </span> }
                                        </div>
                                       
                                        {/* <PrimaryButton disabled={ processing } onClick={ () => reset() } className="resetBtn">Reset</PrimaryButton> */ }

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
                                    
                                </div>


                            </form>
                        </section>
                    </div>
                </div>
            </div >

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">


                            <PaginatedLinks
                                itemsPerPage={ filterObj.RowCount }
                                items={ transactions }
                                tableName="balance_transfer"
                                setFilterObj={ setFilterObj }
                                filterObj={ filterObj }
                                auth={ auth }
                                apitoken={ apitoken }
                                affiliates={ affiliates }
                            />

                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout >
    )
}
