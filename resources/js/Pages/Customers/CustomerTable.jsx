import React from "react";
import { useEffect, useState } from "react";
import { router, Link, usePage } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from '@/Components/TextInput';
import Dropdown from '@/Components/Dropdown';
import RefillModal from "./Partials/RefillModal";
import ChangeModal from "./Partials/ChangeModal";
import NotifyModal from "./Partials/NotifyModal";
import WhatsappNotifyModal from "./Partials/WhatsappNotifyModal";

export default function CustomerTable({ customers, accounts, sub_accounts, sys_users, user_groups, apitoken, deposit_password, auth }) {

    const [loading, setLoading] = useState(false);
    const { url } = usePage()
    const [modals, setModals] = useState({
        reFill: false,
        change: false,
        extend: false,
        notify: false,
        whatsappnotify: false,
    })

    const [user, setUser] = useState([])

    function locClick(lat, long) {
        window.open(`https://maps.google.com/?q=${lat},${long}`, '_blank');
    }
    function editLocalCusClick(index) {
        router.get(`/customers/${index}`);
    }

    function addTicketClick(cus_id) {
        router.get(`/tickets/create/${cus_id}`);
    }

    function disableCustomer(e) {
        e.preventDefault()
        let customerUserIndex = document.getElementById('customer_user_index').value
        router.delete(`/customers/${customerUserIndex}`);
        onCloseModal();
    }

    const callModal = (cus) => {
        document.getElementById('email').textContent = ` ${cus.email}`
        document.getElementById('customer_user_index').value = `${cus.customer_user_index}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${cus.customer_user_index}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
        let customerUserIndex = document.getElementById('customer_user_index').value
        document.getElementById('tr_' + customerUserIndex).classList.toggle('bg-gray-300');
    };

    const callRefillModal = (cus) => {
        setModals({ ...modals, reFill: true })
        setUser(cus)
    }

    const callChangeModal = (cus) => {
        setModals({ ...modals, change: true })
        setUser(cus)
    }

    const callNotifyModal = (cus) => {
        setModals({ ...modals, notify: true })
        setUser(cus)
    }

    const callWhatsappNotifyModal = (cus) => {
        setModals({ ...modals, whatsappnotify: true })
        setUser(cus)
    }


    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
    });
    const extendUser = () => {
        instance.post(`/user/extend/${cus.customer_user_index}`)
            .then(res => {
                res.data.isSuccessful ? (alert(`Extend Success!`), location.reload()) : alert(`Sorry! ${res.data.error?.message}`);

                console.log(res)

            })
            .catch(err => {
                console.log(err)
            })

        console.log('extendUser running..')
    }
    const extendHandler = () => {
        const result = confirm("Are you sure you want to extend this user!")
        result && extendUser()
    }

    function handleTicketSubmit(user_id) {
        router.get(`/tickets/user/${user_id} `);
    }

    function handleInvoiceSubmit(customer_user_index) {
        router.get(`/invoices/user/${customer_user_index} `);
    }

    useEffect(() => {

    }, [])


    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="deleteModal" title="Disable Customer Confirmation" closeModal={onCloseModal}>
                <form onSubmit={disableCustomer} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure disable -
                            <span className="font-bold text-sky-700" id="email"></span>?
                        </div>
                    </div>
                    <TextInput id="customer_user_index" name="customer_user_index" type="hidden" />
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Disable</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <RefillModal modals={modals} setModals={setModals}
                accountTypes={accounts} sub_accounts={sub_accounts} apitoken={apitoken} user={user}
                deposit_password={deposit_password} auth={auth}
            />
            <ChangeModal modals={modals} setModals={setModals}
                accountTypes={accounts} apitoken={apitoken} user={user}
            />

            <NotifyModal modals={modals} setModals={setModals} user={user} />

            <WhatsappNotifyModal modals={modals} setModals={setModals} user={user} />

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>User Email</th>
                        <th>Display Name</th>

                        <th>Mobile Number</th>
                        <th>Affiliate Name</th>
                        <th>Account Info</th>
                        <th>Expiration Date	</th>
                        <th>Location</th>
                        {/* <th>Active/Disable</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>

                {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                }
                {!loading &&
                    <tbody>
                        {customers && customers.map(cus => (
                            <tr key={"key_" + (cus.id)} id={"tr_" + (cus.customer_user_index)}>
                                <td>
                                    <div key={"email_" + (cus.id)} className="font-bold text-sky-700">
                                        <Link href={`/customers/details/${cus.customer_user_index}`}>
                                            {cus.email}
                                        </Link>
                                    </div>

                                    {cus.ticket_id &&
                                        <small key={"usrticket_" + (cus.ticket_id)} className="block mt-2">
                                            <a className='inline-flex items-center underline decoration-sky-300 text-sm font-medium text-sky-600 focus:border-sky-700 cursor-pointer'
                                                onClick={() => handleTicketSubmit(cus.id)}
                                                key={cus.ticket_id}>
                                                View Ticket
                                            </a>
                                        </small>
                                    }

                                    {
                                        cus.invoice_id &&
                                        <small key={"usrinvoice_" + (cus.invoice_id)} className="block mt-2">
                                            <a className='inline-flex items-center underline decoration-sky-300 text-sm font-medium text-sky-600 focus:border-sky-700 cursor-pointer'
                                                onClick={() => handleInvoiceSubmit(cus.customer_user_index)}
                                                key={cus.invoice_id}>
                                                View Invoice
                                            </a>
                                        </small>
                                    }

                                    {
                                        user_groups.filter(user_gp => user_gp.id == cus.user_group_id)
                                            .map(filteredRes => (
                                                <small key={"usrgp_" + (cus.id)} className="block mt-2">
                                                    User Group : {filteredRes.group_name}
                                                </small>
                                            ))
                                    }
                                </td>
                                <td>{cus.display_name}</td>
                                <td>
                                    <strong>Mobile 1</strong> : {cus.mobile_number}
                                    <br />
                                    <strong>Mobile 2</strong> : {cus.mobile_number2}
                                </td>
                                <td>{cus.affiliate_name}</td>
                                <td>
                                    <strong>Main Acc Name</strong> : {cus.account_name}
                                    <br />
                                    <strong>Acc Status</strong> : {cus.account_status}
                                    <br />
                                    <strong>Acc Pkg Type</strong> : {cus.account_package_type}

                                    {
                                        sub_accounts.filter(subacc => subacc.id == cus.sub_account_id)
                                            .map(filteredRes => (
                                                <span key={"subAcDiv_" + (cus.id)}>
                                                    <br />
                                                    <strong>Sub Acc Name</strong> : {filteredRes.account_name}
                                                </span>
                                            ))
                                    }
                                </td>
                                <td>
                                    {cus.manual_expiration_date}
                                </td>
                                <td>
                                    {
                                        cus.latitude &&
                                        <div key={"loc_" + (cus.id)} className="text-sky-700">
                                            <Link className="items-center underline" onClick={() => locClick(cus.latitude, cus.longitude)} >
                                                View Location
                                            </Link>
                                        </div>
                                    }

                                </td>
                                {/* <td className={cus.active_status == 1 ? 'text-emerald-500' : 'text-red-500'}>
                                    {cus.active_status == 1 ? 'Active' : 'Disable'}
                                </td> */}
                                < td >
                                    <div className="sm:flex sm:items-center">
                                        <div className="relative">
                                            <Dropdown >
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            Actions

                                                            <svg
                                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="https://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>

                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content align={'left'} width={'30'} >
                                                    {cus?.can_refill && <><div className="px-3 pt-2 pb-2 cursor-pointer" style={{ width: '100px' }}
                                                        onClick={() => callRefillModal(cus)}>Refill</div></>}
                                                    {cus?.can_change_account && <><div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => callChangeModal(cus)}>Change</div> </>}

                                                    {
                                                        cus?.can_extend_user &&
                                                        <>
                                                            <div className="px-3 pb-2 cursor-pointer"
                                                                onClick={extendHandler}>Extend</div>
                                                        </>
                                                    }

                                                    <div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => editLocalCusClick(cus.customer_user_index)}>
                                                        Edit
                                                    </div>
                                                    <div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => callModal(cus)}>
                                                        Disable
                                                    </div>

                                                    <div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => addTicketClick(cus.id)}>
                                                        Add Ticket
                                                    </div>

                                                    <div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => callNotifyModal(cus)}>
                                                        Notify SMS
                                                    </div>

                                                    <div className="px-3 pb-2 cursor-pointer"
                                                        onClick={() => callWhatsappNotifyModal(cus)}>
                                                        Whatsapp
                                                    </div>

                                                    {/* {
                                                        cus.account_status == "ExpiringSoon" ?
                                                            cus.sms_status === 0 ?
                                                                <>
                                                                    <div className="px-3 pb-2 cursor-pointer"
                                                                        onClick={() => callNotifyModal(cus)}>
                                                                        Notify SMS
                                                                    </div>

                                                                    <div className="px-3 pb-2 cursor-pointer"
                                                                        onClick={() => clickWhatsapp(cus)}>
                                                                        Whatsapp
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        sys_users.filter(user => user.id == cus.sms_sent_by)
                                                                            .map(filteredRes => (
                                                                                <small key={"user_" + (user.id)} className="text-red-500 block mt-2">
                                                                                    SMS sent by : {filteredRes.email}
                                                                                </small>
                                                                            ))
                                                                    }
                                                                </>
                                                            : ''
                                                    } */}

                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))
                        }
                    </tbody >
                }

            </table >
        </div >
    )
}
