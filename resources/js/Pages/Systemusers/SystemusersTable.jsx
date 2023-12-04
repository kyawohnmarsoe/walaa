import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
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
        document.getElementById('deleteModal').close()
        e.preventDefault()
        let userId = document.getElementById('user_id').value
        router.delete(`/systemuser/${userId}`);
    }

    const callModal = (systemuser) => {
        document.getElementById('user_name').textContent = ` ${systemuser.name}`
        document.getElementById('user_id').value = `${systemuser.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${systemuser.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
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
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Disable</PrimaryButton>}
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
                        <th colSpan="2">Actions</th>
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
                                <td>
                                    <PrimaryButton className="bg-sky-800" padding_x='px-2' disabled='' onClick={() => editClick(sys.id)}>
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                        Edit
                                    </PrimaryButton>
                                </td>
                                <td>
                                    <DangerButton padding_x='px-2' disabled='' onClick={() => callModal(sys)}>
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
                                        Disable
                                    </DangerButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
