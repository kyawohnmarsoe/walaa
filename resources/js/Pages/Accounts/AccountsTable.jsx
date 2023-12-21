import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
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
        // document.getElementById('deleteModal').close()
        e.preventDefault()
        let accountId = document.getElementById('account_id').value
        router.delete(`/accounts/${accountId}`);
        onCloseModal();
    }

    const callModal = (account) => {
        document.getElementById('account_name').textContent = ` ${account.account_name}`
        document.getElementById('account_id').value = `${account.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${account.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
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
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Delete</PrimaryButton>
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
                        {
                            listname == '' &&
                            <th>Actions</th>
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

                                {
                                    listname == '' &&
                                    <td className="w-2.5">
                                        <button className="btn btn-xs btn-outline btn-block btn-default"
                                            onClick={() => editLocalAccountClick(acc.id)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                            onClick={() => callModal(acc)}>
                                            Delete
                                        </button>
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
