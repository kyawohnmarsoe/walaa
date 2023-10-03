import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function AddForm({ className = '', accounts, affiliates, apitoken }) {

    const { processing, recentlySuccessful } = useForm();

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        customer_user_id: '',
        customer_user_index: '',
        mobile_number: '',
        mobile_number2: '',
        address: '',
        email: '',
        city: '',
        user_active_manage: '',
        company: '',
        state: '',
        display_name: '',
        caller_id: '',
        customer_user_notes: '',
    });

    const [optionsAffiliates, setOptionsAffiliates] = useState([])
    const [optionsAccounts, setOptionsAccounts] = useState([])

    const [showAffiliateValue, setShowAffiliateValue] = useState(false)
    const [showAccountValue, setShowAccountValue] = useState(false)

    const [filteredAffiliate, setFilteredAffiliate] = useState([])
    const [filteredAccount, setFilteredAccount] = useState([])

    let span = document.getElementById("deposit_msg");

    const getAffiliates = () => {
        let optionsAffiliatesArr = [];
        {
            affiliates.map((e) => {
                optionsAffiliatesArr.push(
                    {
                        "index": e.affiliate_index,
                        "name": e.affiliate_name
                    }
                );
            });
        }
        setOptionsAffiliates(optionsAffiliatesArr)
    }

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
        getAffiliates()
        getAccounts()
        console.log(apitoken)

    }, [])

    function affiliatesHandleChange(e) {
        const value = e.target.value
        // console.log(value);
        setShowAffiliateValue(false)

        const filteredRes = affiliates.filter(aff => aff.affiliate_index == value);
        if (filteredRes) {
            setShowAffiliateValue(true)
            setFilteredAffiliate(filteredRes)
            // console.log(filteredRes)
        }
    }

    function accountsHandleChange(e) {
        const value = e.target.value
        // console.log(value);
        setShowAccountValue(false)

        const filteredRes = accounts.filter(acc => acc.account_index == value);
        if (filteredRes) {
            setShowAccountValue(true)
            setFilteredAccount(filteredRes)
            // console.log(filteredRes)

            // to get Affiliate deposit
            const instance = axios.create({
                baseURL: 'https://rapi.earthlink.iq/api/reseller/affiliate/deposit/confirmationmsg',
                headers: { 'Authorization': `Bearer ${apitoken}` }
            });
            let postData = {
                // UserID: '',
                TargetAffiliateID: showAffiliateValue ? filteredAffiliate[0]['affiliate_index'] : 4336,
                AccountID: showAccountValue ? filteredAccount[0]['account_index'] : 56,
                AffiliateTypeID: 1
            }
            instance.post('', postData).then(res => {
                if (res) {
                    console.log(res.data.value)
                    res.value == true ??
                        console.log(res.data.responseMessage)
                    span.innerHTML = res.data.responseMessage;
                }

            }).catch(err => {
                console.log(err.message)

            })
        }
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
        router.post('/customers/store', values)
    }

    let showDiv = showAccountValue || showAffiliateValue ?
        <div>
            {
                showAccountValue ?
                    <span className='font-bold text-emerald-700'>
                        Account Price : {filteredAccount[0]['account_price']}
                    </span>
                    : ''
            }

            {
                showAffiliateValue ?
                    <span className='p-4 font-bold text-emerald-700'>
                        {/* Affiliate Deposit :  */}
                    </span>
                    : ''
            }
        </div>
        : '';

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Add User</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="affiliate_index" value="Affiliates" />

                    <SelectOption
                        id="affiliate_index"
                        className="mt-1 block w-full"
                        options={optionsAffiliates}
                        name="affiliate_index"
                        onChange={affiliatesHandleChange}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="account_index" value="Accounts" />

                    <SelectOption
                        id="account_index"
                        className="mt-1 block w-full"
                        options={optionsAccounts}
                        name="account_index"
                        onChange={accountsHandleChange}
                    />
                </div>

                {showDiv}

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="mobile_number" value="Mobile Number" />

                    <TextInput
                        id="mobile_number"
                        value={values.mobile_number}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="company" value="Company" />

                    <TextInput
                        id="company"
                        value={values.company}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="display_name" value="Display Name" />

                    <TextInput
                        id="display_name"
                        value={values.display_name}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="City" />

                    <TextInput
                        id="city"
                        value={values.city}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="state" value="State" />

                    <TextInput
                        id="state"
                        value={values.state}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="customer_user_id" value="User Id" />

                    <TextInput
                        id="customer_user_id"
                        value={values.customer_user_id}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="customer_user_index" value="User Index" />

                    <TextInput
                        id="customer_user_index"
                        value={values.customer_user_index}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
                </div>


                <div>
                    <InputLabel htmlFor="customer_user_notes" value="User Notes" />

                    <Textarea
                        id="customer_user_notes"
                        placeholder="Notes..."
                        value={values.customer_user_notes}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                        minRows={5}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Add</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Add.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
