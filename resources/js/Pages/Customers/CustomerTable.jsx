import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';

export default function CustomerTable({ customers, accounts, sub_accounts, user_groups, apitoken }) {
    const [loading, setLoading] = useState(false);

    function editLocalCusClick(index) {
        router.get(`/customers/${index}`);
    }

    function disableCustomer(e) {
        document.getElementById('deleteModal').close()
        e.preventDefault()
        let customerUserIndex = document.getElementById('customer_user_index').value
        // console.log(customerUserIndex);        
        router.delete(`/customers/${customerUserIndex}`);
    }

    const callModal = (cus) => {
        document.getElementById('email').textContent = ` ${cus.email}`
        document.getElementById('customer_user_index').value = `${cus.customer_user_index}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${cus.customer_user_index}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        let customerUserIndex = document.getElementById('customer_user_index').value
        document.getElementById('tr_' + customerUserIndex).classList.toggle('bg-gray-300');
    };

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
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Disable</PrimaryButton>}
                    </div>
                </form>
            </Modal>

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        {/* <th>User Index</th> */}
                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Mobile Number</th>
                        <th>Affiliate Name</th>
                        <th>Main Account Info</th>
                        <th>Sub Account Type</th>
                        <th>User Group</th>
                        <th>Active/Disable</th>
                        <th colSpan="2">Actions</th>
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
                                <td>{cus.email}</td>
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
                                <td>
                                    <PrimaryButton className="bg-sky-800" padding_x='px-2' disabled='' onClick={() => editLocalCusClick(cus.customer_user_index)}>
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                        Edit
                                    </PrimaryButton>
                                </td>
                                <td>
                                    <DangerButton padding_x='px-2' disabled='' onClick={() => callModal(cus)} >
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
                                        Disable
                                    </DangerButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
