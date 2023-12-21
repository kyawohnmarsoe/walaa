import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";
import { useEffect, useState } from "react";
import { usePage, router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import TextInput from '@/Components/TextInput';

export default function SystemusersTable({ systemusers, user_has_groups }) {
    const [loading, setLoading] = useState(false);

    const { user } = usePage().props

    useEffect(() => {
        // console.log(user.roles)
        // console.log(user.permissions)
    }, [])

    function editClick(id) {
        router.get(`/systemuser/${id}`);
    }
    function deleteData(e) {
        // document.getElementById('deleteModal').close()
        e.preventDefault()
        let userId = document.getElementById('user_id').value
        router.delete(`/systemuser/${userId}`);
        onCloseModal();
    }

    const callModal = (systemuser) => {
        document.getElementById('user_name').textContent = ` ${systemuser.name}`
        document.getElementById('user_id').value = `${systemuser.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${systemuser.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
        let userId = document.getElementById('user_id').value
        document.getElementById('tr_' + userId).classList.toggle('bg-gray-300');
    };

    return (
        <div className="overflow-x-auto mt-3">
            <Modal id="deleteModal" title="Disable User Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure disable -
                            <span className="font-bold text-sky-700" id="user_name"></span>?
                        </div>
                    </div>
                    <TextInput id="user_id" name="id" type="hidden" />
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Disable</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <table className="table" id="account_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Group Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                {loading &&
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }

                {!loading &&
                    <tbody>
                        {systemusers && systemusers.map(sys => (
                            <tr key={sys.id} id={"tr_" + (sys.id)}>
                                <td>{sys.name}</td>
                                <td>{sys.email}</td>
                                <td>
                                    <ul>
                                        {
                                            user_has_groups.filter(group => group.user_id == sys.id)
                                                .map(filteredRes => (
                                                    <li key={filteredRes.id}>{filteredRes.group_name}</li>
                                                ))

                                        }
                                    </ul>
                                </td>
                                <td className={sys.active_status == 1 ? 'text-emerald-500' : 'text-red-500'}>
                                    {sys.active_status == 1 ? 'Active' : 'Disable'}
                                </td>
                                <td className="w-2.5">
                                    <button className="btn btn-xs btn-outline btn-block btn-default"
                                        onClick={() => editClick(sys.id)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                        onClick={() => callModal(sys)}>
                                        Disable
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
