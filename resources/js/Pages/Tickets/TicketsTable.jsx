import React from "react";
import { useEffect, useState } from "react";
import { usePage, router } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/DaisyUI/Modal";
import TextInput from "@/Components/TextInput";

export default function TicketTable({ tickets }) {
    const [loading] = useState(false);

    const { ticket_source, topic, level_of_importance } = usePage().props
    const [ticketSource] = useState([ticket_source])
    const [topicData] = useState([topic])
    const [levelData] = useState([level_of_importance])


    useEffect(() => {
        // console.log(ticketSource);
        // console.log(ticketSource[0]['ts_3']);
    }, [])

    function editData(id) {
        router.get(`/tickets/${id}`);
    }

    const callModal = (ticket) => {
        document.getElementById('ticket_number').textContent = `${ticket.ticket_number}`
        document.getElementById('ticket_id').value = `${ticket.id}`
        document.getElementById('ticket_deleteModal').showModal()
    }
    function deleteData(e) {
        document.getElementById('ticket_deleteModal').close()
        e.preventDefault()
        let ticketId = document.getElementById('ticket_id').value
        router.delete(`/tickets/${ticketId}`);
    }

    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="ticket_deleteModal" title="Delete Confirmation">
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            Are you sure to delete -
                            <span className="font-bold text-sky-700" id="ticket_number"></span>?
                        </div>
                    </div>
                    <TextInput id="ticket_id" name="ticket_id" type="hidden" />
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Delete</PrimaryButton>}
                    </div>
                </form>
            </Modal>

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>User</th>
                        <th>Ticket Number</th>
                        <th>Ticket Source</th>
                        <th>Topic</th>
                        <th>Address</th>
                        <th>Level of Importance</th>
                        <th colspan="2">Actions</th>
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
                        {tickets && tickets.map(dt => (
                            <tr key={dt.id}>
                                <td>{dt.customer_user_id}</td>
                                <td>{dt.ticket_number}</td>
                                <td>{ticketSource[0][dt.ticket_source]}</td>
                                <td>{topicData[0][dt.topic]}</td>
                                <td>{dt.ticket_address}</td>
                                <td>{levelData[0][dt.level_of_importance]}</td>
                                <td>
                                    <PrimaryButton className="bg-sky-800" onClick={() => editData(dt.id)}>
                                        <svg class="h-5 w-6 text-white" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                            <line x1="16" y1="5" x2="19" y2="8" />
                                        </svg>
                                        Edit
                                    </PrimaryButton>
                                </td>
                                <td>
                                    <DangerButton onClick={() => callModal(dt)} >
                                        <svg class="h-5 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                                            <line x1="18" y1="9" x2="12" y2="15" />  <line x1="12" y1="9" x2="18" y2="15" />
                                        </svg>
                                        Delete
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
