import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import TextInput from '@/Components/TextInput';

export default function AccountsTable({ accounts, listname }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(accounts);
        // console.log(listname);
    }, [])

    function editLocalAccountClick(id) {
        router.get(`/accounts/${id}`);
    }

    function deleteLocalAccount(e) {
        document.getElementById('deleteModal').close()
        e.preventDefault()
        let accountId = document.getElementById('account_id').value
        // console.log(accountId);        
        router.delete(`/accounts/${accountId}`);
    }

    const callModal = (account) => {
        document.getElementById('account_name').textContent = ` ${account.account_name}`
        document.getElementById('account_id').value = `${account.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${account.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        let accountId = document.getElementById('account_id').value
        document.getElementById('tr_' + accountId).classList.toggle('bg-gray-300');
    };

    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="deleteModal" title="Delete Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteLocalAccount} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure to delete -
                            <span className="font-bold text-sky-700" id="account_name"></span>?
                        </div>
                    </div>
                    <TextInput id="account_id" name="account_id" type="hidden" />
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Delete</PrimaryButton>}
                    </div>
                </form>
            </Modal>

            <table className="table" id="account_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Account Index</th>
                        <th>Account Name</th>
                        <th>Description</th>
                        <th>Account Price</th>
                        <th>End User Account Price</th>
                        {/* <th>Image</th> */}
                        {
                            listname == '' &&
                            <th colspan="2">Actions</th>
                        }
                    </tr>
                </thead>

                {loading &&
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }

                {!loading &&
                    <tbody>
                        {accounts && accounts.map(acc => (
                            <tr key={acc.id} id={"tr_" + (acc.id)}>
                                <td>{acc.account_index}</td>
                                <td>{acc.account_name}</td>
                                <td style={{ whiteSpace: "pre-line" }}>
                                    {acc.account_description}
                                </td>
                                <td>{acc.account_price}</td>
                                <td>{acc.end_user_account_price}</td>
                                {/* <td>
                                    {
                                        acc.account_image_path ?
                                            <img
                                                src={acc.account_image_path}
                                                width={60}
                                                alt='Image'
                                            />
                                            :
                                            ''
                                    }
                                </td> */}
                                {
                                    listname == '' &&
                                    <td>
                                        <PrimaryButton className="bg-sky-800" padding_x='px-2' disabled='' onClick={() => editLocalAccountClick(acc.id)}>
                                            <svg class="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                            Edit
                                        </PrimaryButton>
                                    </td>
                                }
                                {
                                    listname == '' &&
                                    <td>
                                        <DangerButton padding_x='px-2' disabled='' onClick={() => callModal(acc)} >
                                            <svg class="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
                                            Delete
                                        </DangerButton>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
