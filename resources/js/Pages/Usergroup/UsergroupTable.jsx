import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import TextInput from '@/Components/TextInput';

export default function UsergroupTable({ usergroups }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    function editClick(id) {
        router.get(`/usergroup/${id}`);
    }

    function deleteData(e) {
        document.getElementById('deleteModal').close()
        e.preventDefault()
        let groupId = document.getElementById('group_id').value
        // console.log(groupId);        
        router.delete(`/usergroup/${groupId}`);
    }

    const callModal = (usergroup) => {
        document.getElementById('group_name').textContent = ` ${usergroup.group_name}`
        document.getElementById('group_id').value = `${usergroup.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${usergroup.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        let groupId = document.getElementById('group_id').value
        document.getElementById('tr_' + groupId).classList.toggle('bg-gray-300');
    };

    return (
        <div className="overflow-x-auto mt-3">
            <Modal id="deleteModal" title="Delete Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure to delete -
                            <span className="font-bold text-sky-700" id="group_name"></span>?
                        </div>
                    </div>
                    <TextInput id="group_id" name="group_id" type="hidden" />
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Delete</PrimaryButton>}
                    </div>
                </form>
            </Modal>

            <table className="table" id="usergroup_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#</th>
                        <th>Group Name</th>
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
                        {usergroups && usergroups.map((ug, i) => (
                            <tr key={ug.id} id={"tr_" + (ug.id)}>
                                <td>{i + 1}</td>
                                <td>{ug.group_name}</td>
                                <td>
                                    <PrimaryButton className="bg-sky-800" padding_x='px-2' disabled='' onClick={() => editClick(ug.id)}>
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                        Edit
                                    </PrimaryButton>
                                </td>
                                <td>
                                    {/* <DangerButton padding_x='px-2' disabled='' onClick={() => callModal(ug)}>
                                        <svg className="h-4 w-4 text-white mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />  <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" /></svg>
                                        Delete
                                    </DangerButton> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
