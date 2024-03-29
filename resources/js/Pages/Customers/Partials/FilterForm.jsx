import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';

export default function FilterForm({ className = '', accounts, sub_accounts, affiliates, user_groups }) {

    const { processing } = useForm();

    const [values, setValues] = useState({
        account_index: '',
        sub_account_id: '',
        affiliate_index: '',
        customer_user_id: '',
        display_name: '',
        mobile_number: '',
        status: '',
        active_status: '',
        user_group_id: '',
    });

    const [optionsAccounts, setOptionsAccounts] = useState([])
    const [optionsSubAccounts, setOptionsSubAccounts] = useState([])
    const [optionsAffiliates, setOptionsAffiliates] = useState([])
    const [optionsUserGroups, setOptionsUserGroups] = useState([])

    const optionsStatus = [
        {
            "index": "Offline",
            "name": "Offline"
        },
        {
            "index": "Online",
            "name": "Online"
        },
        {
            "index": "OnlineNoNet",
            "name": "OnlineNoNet"
        }
    ];
    const optionsActiveStatus = [
        {
            "index": 0,
            "name": "Disable"
        },
        {
            "index": 1,
            "name": "Active"
        }
    ];

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

    const getUserGroups = () => {
        let optionsUserGroupsArr = [];
        {
            user_groups.map((e) => {
                optionsUserGroupsArr.push(
                    {
                        "index": e.id,
                        "name": e.group_name
                    }
                );
            });
        }
        setOptionsUserGroups(optionsUserGroupsArr)
    }

    useEffect(() => {
        getAffiliates()
        getAccounts()
        getUserGroups()
    }, [])

    function affiliatesHandleChange(e) {
        const value = e.target.value
        console.log('affiliate=>', value)
        setValues(values => ({
            ...values,
            'affiliate_index': value,
        }))
    }

    function accountsHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'account_index': value,
        }))

        let optionsSubAccountsArr = [];
        {
            sub_accounts.filter((subacc) => {
                if (subacc.account_index == value) {
                    optionsSubAccountsArr.push(
                        {
                            "index": subacc.id,
                            "name": subacc.account_name
                        }
                    );
                }
            });
        }
        setOptionsSubAccounts(optionsSubAccountsArr)
    }

    function subAccountsHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'sub_account_id': value,
        }))
    }

    function statusHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'status': value,
        }))
    }

    function activeStatusHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'active_status': value,
        }))
    }

    function userGroupsHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'user_group_id': value,
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
        router.post('/customers', values)
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Manage Users</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">
                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <InputLabel htmlFor="account_index" value="Accounts" />
                        <SelectOption
                            id="account_index"
                            className="mt-1 block w-full"
                            options={optionsAccounts}
                            select_text="Main Accounts"
                            name="account_index"
                            onChange={accountsHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="sub_account_id" value="Sub Accounts" />
                        <SelectOption
                            id="sub_account_id"
                            className="mt-1 block w-full"
                            options={optionsSubAccounts}
                            select_text="Sub Accounts"
                            name="sub_account_id"
                            onChange={subAccountsHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="affiliate_index" value="Affiliates" />
                        <SelectOption
                            id="affiliate_index"
                            className="mt-1 block w-full"
                            options={optionsAffiliates}
                            select_text="Affiliates"
                            name="affiliate_index"
                            onChange={affiliatesHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="customer_user_id" value="Email" />
                        <TextInput
                            id="customer_user_id"
                            name="customer_user_id"
                            value={values.customer_user_id}
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
                            name="display_name"
                            value={values.display_name}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="mobile_number" value="Phone Number" />
                        <TextInput
                            id="mobile_number"
                            name="mobile_number"
                            value={values.mobile_number}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="API User Status" />
                        <SelectOption
                            id="status"
                            className="mt-1 block w-full"
                            options={optionsStatus}
                            select_text="Status"
                            name="status"
                            onChange={statusHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="active_status" value="Active / Disable Status" />
                        <SelectOption
                            id="active_status"
                            className="mt-1 block w-full"
                            options={optionsActiveStatus}
                            select_text="Active / Disable Status"
                            name="active_status"
                            onChange={activeStatusHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="user_group_id" value="User Groups" />
                        <SelectOption
                            id="user_group_id"
                            className="mt-1 block w-full"
                            options={optionsUserGroups}
                            select_text="User Groups"
                            name="user_group_id"
                            onChange={userGroupsHandleChange}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Search</PrimaryButton>
                    <PrimaryButton disabled={processing}
                        onClick={() => window.location.reload(false)} className="resetBtn">
                        Reset
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
