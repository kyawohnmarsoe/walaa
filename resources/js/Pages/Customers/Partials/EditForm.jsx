import { useState, useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function AddForm({
    className = '', customer, accounts, sub_accounts, affiliates, user_groups,
    towers, devices, ports, apitoken
}) {

    const { processing } = useForm();

    const { errors } = usePage().props

    const [values, setValues] = useState({
        account_index: customer.account_index,
        sub_account_id: customer.sub_account_id,
        affiliate_index: customer.affiliate_index,
        first_name: customer.first_name ?? '',
        last_name: customer.last_name ?? '',
        email: customer.email,
        user_password: customer.user_password ?? '',
        mobile_number: customer.mobile_number ?? '',
        mobile_number2: customer.mobile_number2 ?? '',
        address: customer.address ?? '',
        city: customer.city ?? '',
        company: customer.company ?? '',
        state: customer.state ?? '',
        display_name: customer.display_name ?? '',
        customer_user_notes: customer.customer_user_notes ?? '',
        user_group_id: customer.user_group_id,
        latitude: customer.latitude ?? '',
        longitude: customer.longitude ?? '',

        connection_type: customer.connection_type ?? '',
        tower_id: customer.tower_id ?? '',
        device_id: customer.device_id ?? '',
        port_id: customer.port_id ?? '',
        complete_status: customer.complete_status,
        recommend_point: customer.recommend_point,
    });

    const [optionsAffiliates, setOptionsAffiliates] = useState([])
    const [optionsAccounts, setOptionsAccounts] = useState([])
    const [optionsSubAccounts, setOptionsSubAccounts] = useState([])
    const [optionsUserGroups, setOptionsUserGroups] = useState([])
    const [optionsTowers, setOptionsTowers] = useState([])
    const [optionsDevices, setOptionsDevices] = useState([])
    const [optionsPorts, setOptionsPorts] = useState([])

    const [showAffiliateValue, setShowAffiliateValue] = useState(false)
    const [showAccountValue, setShowAccountValue] = useState(false)

    const [filteredAffiliate, setFilteredAffiliate] = useState([])
    const [filteredAccount, setFilteredAccount] = useState([])

    const optionsConnectType = [
        {
            "index": "FTTH",
            "name": "FTTH"
        },
        {
            "index": "WiFi",
            "name": "WiFi"
        }
    ];
    const optionsComplete = [
        {
            "index": 1,
            "name": "Yes"
        },
        {
            "index": 0,
            "name": "No"
        }
    ];

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

    const getSubAccounts = () => {
        let optionsSubAccountsArr = [];
        {
            sub_accounts.map((e) => {
                optionsSubAccountsArr.push(
                    {
                        "index": e.id,
                        "name": e.account_name
                    }
                );
            });
        }
        setOptionsSubAccounts(optionsSubAccountsArr)
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

    const getTowers = () => {
        let optionsTowersArr = [];
        {
            towers.map((e) => {
                optionsTowersArr.push(
                    {
                        "index": e.id,
                        "name": e.tower_name
                    }
                );
            });
        }
        setOptionsTowers(optionsTowersArr)
    }

    const getDevices = () => {
        let optionsDevicesArr = [];
        {
            devices.map((e) => {
                optionsDevicesArr.push(
                    {
                        "index": e.id,
                        "name": e.device_name
                    }
                );
            });
        }
        setOptionsDevices(optionsDevicesArr)
    }

    const getPorts = () => {
        let optionsPortsArr = [];
        {
            ports.map((e) => {
                optionsPortsArr.push(
                    {
                        "index": e.id,
                        "name": e.port_name
                    }
                );
            });
        }
        setOptionsPorts(optionsPortsArr)
    }

    useEffect(() => {
        getAffiliates()
        getAccounts()
        getSubAccounts()
        getUserGroups()
        getTowers()
        getDevices()
        getPorts()
    }, [])

    function affiliatesHandleChange(e) {
        const value = e.target.value
        // console.log(value);
        setShowAffiliateValue(false)

        setValues(values => ({
            ...values,
            'affiliate_index': value,
        }))

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
        setValues(values => ({
            ...values,
            'account_index': value,
        }))

        const filteredRes = accounts.filter(acc => acc.account_index == value);
        if (filteredRes) {
            setShowAccountValue(true)
            setFilteredAccount(filteredRes)
            // console.log(filteredRes)

            // to get Affiliate deposit
            // const instance = axios.create({
            //     baseURL: 'https://rapi.earthlink.iq/api/reseller/affiliate/deposit/confirmationmsg',
            //     headers: { 'Authorization': `Bearer ${apitoken}` }
            // });
            // let postData = {
            //     // UserID: '',
            //     TargetAffiliateID: showAffiliateValue ? filteredAffiliate[0]['affiliate_index'] : 4336,
            //     AccountID: showAccountValue ? filteredAccount[0]['account_index'] : 56,
            //     AffiliateTypeID: 1
            // }
            // instance.post('', postData).then(res => {
            //     if (res) {
            //         console.log(res.data.value)
            //         res.value == true ??
            //             console.log(res.data.responseMessage)
            //         span.innerHTML = res.data.responseMessage;
            //     }

            // }).catch(err => {
            //     if (err) {
            //         console.log(err.message)
            //         // router.visit('/customers/create', {
            //         //     only: ['customers'],
            //         // })
            //     }
            // })
        }

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

    function userGroupsHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'user_group_id': value,
        }))
    }

    function towerHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'tower_id': value,
        }))

        let optionsDevicesArr = [];
        {
            devices.filter((item) => {
                if (item.tower_id == value) {
                    optionsDevicesArr.push(
                        {
                            "index": item.id,
                            "name": item.device_name
                        }
                    );
                }
            });
        }
        setOptionsDevices(optionsDevicesArr)
    }

    function deviceHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'device_id': value,
        }))

        let optionsPortsArr = [];
        {
            ports.filter((item) => {
                if (item.device_id == value) {
                    optionsPortsArr.push(
                        {
                            "index": item.id,
                            "name": item.port_name
                        }
                    );
                }
            });
        }
        setOptionsPorts(optionsPortsArr)
    }

    function portHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'port_id': value,
        }))
    }

    function connTypeHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'connection_type': value,
        }))
    }

    function completeHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'complete_status': value,
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

    function recommendHandleChange(e) {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setValues(values => ({
                ...values,
                'recommend_point': e.target.value,
            }))
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post(`/customers/${customer.customer_user_index}`, values)
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
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('customers')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Users List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit User</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">
                {showDiv}

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-4 gap-4'>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className='required' />
                        <TextInput
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="user_password" value="User Password" className='required' />
                        <TextInput
                            id="user_password"
                            name="user_password"
                            value={values.user_password}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                        <InputError message={errors.user_password} className="mt-2" />
                    </div>
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
                            name="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-4'>
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
                        <InputLabel htmlFor="mobile_number" value="Mobile Number" />
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
                        <InputLabel htmlFor="mobile_number2" value="Mobile Number 2" />
                        <TextInput
                            id="mobile_number2"
                            name="mobile_number2"
                            value={values.mobile_number2}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
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
                            value={values.user_group_id}
                            onChange={userGroupsHandleChange}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="latitude" value="Latitude" />
                        <TextInput
                            id="latitude"
                            name="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="longitude" value="Longitude" />
                        <TextInput
                            id="longitude"
                            name="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <InputLabel htmlFor="affiliate_index" value="Affiliates" className='required' />
                        <SelectOption
                            id="affiliate_index"
                            className="mt-1 block w-full"
                            options={optionsAffiliates}
                            select_text="Affiliates"
                            name="affiliate_index"
                            value={values.affiliate_index}
                            onChange={affiliatesHandleChange}
                        />
                        <InputError message={errors.affiliate_index} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="account_index" value="Accounts" className='required' />
                        <SelectOption
                            id="account_index"
                            className="mt-1 block w-full"
                            options={optionsAccounts}
                            select_text="Main Accounts"
                            name="account_index"
                            value={values.account_index}
                            onChange={accountsHandleChange}
                        />
                        <InputError message={errors.account_index} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="sub_account_id" value="Sub Accounts" />
                        <SelectOption
                            id="sub_account_id"
                            className="mt-1 block w-full"
                            options={optionsSubAccounts}
                            select_text="Sub Accounts"
                            name="sub_account_id"
                            value={values.sub_account_id}
                            onChange={subAccountsHandleChange}
                        />
                    </div>

                    {/* <div>
                        <InputLabel htmlFor="company" value="Company" />
                        <TextInput
                            id="company"
                            name="company"
                            value={values.company}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div> */}

                    {/* <div>
                        <InputLabel htmlFor="city" value="City" />
                        <TextInput
                            id="city"
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div> */}

                    {/* <div>
                        <InputLabel htmlFor="state" value="State" />
                        <TextInput
                            id="state"
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div> */}
                </div>

                <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />

                <div className='grid grid-cols-4 gap-4'>
                    <div>
                        <InputLabel htmlFor="connection_type" value="Connection Type" />
                        <SelectOption
                            id="connection_type"
                            className="mt-1 block w-full"
                            options={optionsConnectType}
                            select_text="Connection Type"
                            name="connection_type"
                            onChange={connTypeHandleChange}
                            value={values.connection_type}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="tower_id" value="Towers" />
                        <SelectOption
                            id="tower_id"
                            className="mt-1 block w-full"
                            options={optionsTowers}
                            select_text="Towers"
                            name="tower_id"
                            value={values.tower_id}
                            onChange={towerHandleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="device_id" value="Devices" />
                        <SelectOption
                            id="device_id"
                            className="mt-1 block w-full"
                            options={optionsDevices}
                            select_text="Devices"
                            name="device_id"
                            value={values.device_id}
                            onChange={deviceHandleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="port_id" value="Ports" />
                        <SelectOption
                            id="port_id"
                            className="mt-1 block w-full"
                            options={optionsPorts}
                            select_text="Ports"
                            name="port_id"
                            value={values.port_id}
                            onChange={portHandleChange}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-8 gap-4'>
                    <div className='col-start-3 col-span-2'>
                        <InputLabel htmlFor="complete_status" value="Complete" />
                        <SelectOption
                            id="complete_status"
                            className="mt-1 block w-full"
                            options={optionsComplete}
                            select_text="Complete"
                            name="complete_status"
                            onChange={completeHandleChange}
                            value={values.complete_status}
                        />
                    </div>
                    <div className='col-start-5 col-span-2'>
                        <InputLabel htmlFor="recommend_point" value="Recommend" />
                        <TextInput
                            id="recommend_point"
                            name="recommend_point"
                            value={values.recommend_point}
                            onChange={recommendHandleChange}
                            type="number"
                            pattern="[0-9]*"
                            className="mt-1 block w-full"
                            autoComplete="off"
                            min="0" max="10"
                        />
                    </div>
                </div>

                <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10" />
                <div className='grid'>
                    <div>
                        <InputLabel htmlFor="customer_user_notes" value="User Notes" />
                        <Textarea
                            id="customer_user_notes"
                            name="customer_user_notes"
                            placeholder="Notes..."
                            value={values.customer_user_notes}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            minRows={5}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
