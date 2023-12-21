import React from "react";
import { useEffect, useState } from "react";
import { router, Link } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from '@/Components/TextInput';
import RefillModal from "./Partials/RefillModal";
import ChangeModal from "./Partials/ChangeModal";

export default function CustomerTable({ customers, accounts, sub_accounts, user_groups, apitoken, deposit_password, auth }) {
    const [loading, setLoading] = useState(false);

    const [modals, setModals] = useState({
        reFill: false,
        change: false,
        extend: false,
    })

    const [user, setUser] = useState([])

    function editLocalCusClick(index) {
        router.get(`/customers/${index}`);
    }

    function disableCustomer(e) {
        // document.getElementById('deleteModal').close()
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

    useEffect(() => {
        // console.log(sub_accounts); 
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
                accountTypes={accounts} apitoken={apitoken} user={user}
                deposit_password={deposit_password} auth={auth}
            />
            <ChangeModal modals={modals} setModals={setModals}
                accountTypes={accounts} apitoken={apitoken} user={user}
            />

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Actions</th>
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Mobile Number</th>
                        <th>Affiliate Name</th>
                        <th>Main Account Info</th>
                        <th>Sub Account Type</th>
                        <th>User Group</th>
                        <th>Active/Disable</th>
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
                            <tr key={cus.id} id={"tr_" + (cus.customer_user_index)}>
                                <td>
                                    {cus?.can_refill && <><button className="btn btn-xs btn-outline btn-block btn-info mb-1"
                                        onClick={() => callRefillModal(cus)}>Refill</button><br /></>}

                                    {cus?.can_change_account && <><button className="btn btn-xs btn-outline btn-block btn-success mb-1"
                                        onClick={() => callChangeModal(cus)}>Change</button> <br /> </>}

                                    {cus?.can_extend_user && <><button className="btn btn-xs btn-outline btn-block btn-warning" onClick={extendHandler}>Extend</button> </>}

                                    <>
                                        <button className="btn btn-xs btn-outline btn-block btn-primary mt-1" onClick={() => editLocalCusClick(cus.customer_user_index)}>
                                            Edit
                                        </button>
                                    </>

                                    <>
                                        <button className="btn btn-xs btn-outline btn-block btn-warning mt-1" onClick={() => callModal(cus)}>
                                            Disable
                                        </button>
                                    </>
                                </td>
                                <td>
                                    <div className="font-bold text-sky-700">
                                        <Link href={`/customers/${cus.customer_user_index}`}>{cus.email}</Link>
                                    </div>
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
                                </td>
                                <td>
                                    {
                                        sub_accounts.filter(subacc => subacc.id == cus.sub_account_id)
                                            .map(filteredRes => (
                                                filteredRes.account_name
                                            ))
                                    }
                                </td>
                                <td>
                                    {
                                        user_groups.filter(user_gp => user_gp.id == cus.user_group_id)
                                            .map(filteredRes => (
                                                filteredRes.group_name
                                            ))
                                    }
                                </td>
                                <td className={cus.active_status == 1 ? 'text-emerald-500' : 'text-red-500'}>
                                    {cus.active_status == 1 ? 'Active' : 'Disable'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
