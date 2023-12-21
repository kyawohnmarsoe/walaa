import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
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
        // document.getElementById('deleteModal').close()
        e.preventDefault()
        let groupId = document.getElementById('group_id').value
        // console.log(groupId);        
        router.delete(`/usergroup/${groupId}`);
        onCloseModal()
    }

    const callModal = (usergroup) => {
        document.getElementById('group_name').textContent = ` ${usergroup.group_name}`
        document.getElementById('group_id').value = `${usergroup.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${usergroup.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
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
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Delete</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <table className="table" id="usergroup_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#</th>
                        <th>Group Name</th>
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
                        {usergroups && usergroups.map((ug, i) => (
                            <tr key={ug.id} id={"tr_" + (ug.id)}>
                                <td>{i + 1}</td>
                                <td>{ug.group_name}</td>
                                <td className="w-2.5">
                                    <button className="btn btn-xs btn-outline btn-block btn-default"
                                        onClick={() => editClick(ug.id)}>
                                        Edit
                                    </button>

                                    {/* <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                        onClick={() => callModal(ug)}>
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
