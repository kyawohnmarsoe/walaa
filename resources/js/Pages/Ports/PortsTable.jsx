import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";
import { useEffect, useState } from "react";
import { usePage, router } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import TextInput from '@/Components/TextInput';

export default function PortsTable({ ports }) {
    const [loading, setLoading] = useState(false);

    const { user } = usePage().props

    useEffect(() => {

    }, [])

    function editClick(id) {
        router.get(`/ports/${id}`);
    }

    function deleteData(e) {
        e.preventDefault()
        let deviceId = document.getElementById('device_id').value
        // router.delete(`/ports/${deviceId}`);
        onCloseModal();
    }

    const callModal = (device) => {
        document.getElementById('device_name').textContent = ` ${device.device_name}`
        document.getElementById('device_id').value = `${device.id}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${device.id}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        document.getElementById('deleteModal').close()
        let deviceId = document.getElementById('device_id').value
        document.getElementById('tr_' + deviceId).classList.toggle('bg-gray-300');
    };


    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="deleteModal" title="Delete Device Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure delete -
                            <span className="font-bold text-sky-700" id="device_name"></span>?
                        </div>
                    </div>
                    <TextInput id="device_id" name="id" type="hidden" />
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Delete</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <table className="table" id="device_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>No.</th>
                        <th>Device Name</th>
                        <th>Port Name</th>
                        <th>Port Type</th>
                        <th>No. Of Clients</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {loading &&
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }

                {!loading &&
                    <tbody>
                        {ports && ports.map((dt, index) => (
                            <tr key={dt.id} id={"tr_" + (dt.id)}>
                                <td>{index + 1}</td>
                                <td>{dt.device.device_name}</td>
                                <td>{dt.port_name}</td>
                                <td>{dt.port_type}</td>
                                <td>{dt.no_of_clients}</td>
                                <td className={dt.port_status == 1 ? 'text-emerald-500' : 'text-red-500'}>
                                    {dt.port_status == 1 ? 'Up' : 'Down'}
                                </td>
                                <td>{dt.notes}</td>
                                <td className="w-2.5">
                                    <button className="btn btn-xs btn-outline btn-block btn-default"
                                        onClick={() => editClick(dt.id)}>
                                        Edit
                                    </button>

                                    {/* <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                        onClick={() => callModal(dt)}>
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
