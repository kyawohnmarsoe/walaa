import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";
import { useEffect, useState } from "react";
import { usePage, router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import TextInput from '@/Components/TextInput';

export default function TicketissuesTable({ issues }) {
    const [loading, setLoading] = useState(false);

    const { user } = usePage().props

    useEffect(() => {

    }, [])

    function editClick(id) {
        router.get(`/issues/${id}`);
    }

    function deleteData(e) {
        e.preventDefault()
        let issueId = document.getElementById('issue_id').value
        router.delete(`/issues/${issueId}`);
        onCloseModal();
    }

    const callModal = (issue) => {
        document.getElementById('issue_type').textContent = ` ${issue.issue_type}`
        document.getElementById('issue_id').value = `${issue.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${issue.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
        let issueId = document.getElementById('issue_id').value
        document.getElementById('tr_' + issueId).classList.toggle('bg-gray-300');
    };


    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="deleteModal" title="Delete Issue Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure delete -
                            <span className="font-bold text-sky-700" id="issue_type"></span>?
                        </div>
                    </div>
                    <TextInput id="issue_id" name="id" type="hidden" />
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Delete</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <table className="table" id="issue_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Issues</th>
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
                        {issues && issues.map(dt => (
                            <tr key={dt.id} id={"tr_" + (dt.id)}>
                                <td>{dt.issue_type}</td>

                                <td className="w-2.5">
                                    <button className="btn btn-xs btn-outline btn-block btn-default"
                                        onClick={() => editClick(dt.id)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                        onClick={() => callModal(dt)}>
                                        Delete
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
