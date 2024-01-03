import React from "react";
import { useEffect, useState } from "react";
import { usePage, router } from '@inertiajs/react';
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Modal from "@/Components/DaisyUI/Modal";
import InputLabel from '@/Components/InputLabel';
import TextInput from "@/Components/TextInput";
import Textarea from '@/Components/Textarea';
import { format } from 'date-fns';

export default function TicketTable({ tickets, users, user_groups, remarks }) {
    const [loading] = useState(false);

    const { topic, level_of_importance } = usePage().props
    const [topicData] = useState([topic])
    const [levelData] = useState([level_of_importance])

    const [values, setValues] = useState({
        ticket_id: '',
        remarks: '',
        ticket_status: '',
        attachfile_name: '',
    });

    useEffect(() => {
        // console.log(ticketSource);
        // console.log(ticketSource[0]['ts_3']);     
    }, [])

    function splitFile(props, dt) {

        let files = props.split(",");
        return (
            <div>
                {files.map((file, index) => {
                    return <a className='inline-flex items-center px-1 pt-1 underline decoration-sky-300 text-sm font-medium text-sky-600 focus:border-sky-700 cursor-pointer'
                        key={index} onClick={() => callModal(dt, 'ticket_fileModal', file)}>
                        {file.length > 10 ? `(${index + 1}) ${file.substring(0, 10)}...` : file}
                    </a>;
                })}
            </div>
        );
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const callModal = (ticket, modal_id, attachfile_name) => {
        setValues(values => ({
            ...values,
            remarks: '',
            ticket_id: ticket.id,
            ticket_status: ticket.ticket_status,
            attachfile_name: attachfile_name,
        }))

        document.getElementById('show_remarks').innerHTML = ''
        document.getElementById('file_link').innerHTML = ''

        var ticket_number = document.getElementsByClassName('ticket_number')
        for (var i = 0; i < ticket_number.length; i++) {
            ticket_number[i].innerHTML = ` ${ticket.ticket_number}`
        }

        document.getElementById(`${modal_id}`).showModal()
        {
            ticket.ticket_status == 0
                ? ''
                : document.getElementById(`tr_${ticket.id}`).classList.remove('bg-teal-100')
        }
        document.getElementById(`tr_${ticket.id}`).classList.add('bg-gray-300');

        if (modal_id == 'ticket_viewModal') {
            // console.log('Call Modal - ', ticket.id);
            document.getElementsByClassName('ticket_status')[0].innerHTML = ` ${ticket.ticket_status == 0 ? 'Opened' : '<span class="text-bold text-green-500">Closed</span>'}`
            document.getElementsByClassName('user_id')[0].innerHTML = ` ${ticket.customer_user_id}`

            {
                remarks.filter(rm => rm.ticket_id == ticket.id).map(filteredRM => (
                    document.getElementById('show_remarks').innerHTML += `<div class="max-w-2xl rounded overflow-hidden shadow-lg px-3 pt-4 mb-4">
                    <div class="grid grid-cols-3 gap-4"><div class="col-span-2">
                    ${filteredRM.remarks}  <br>                 
                    </div><div class="text-right">
                        <a href='/tickets/delete_remark/${filteredRM.id}' key=${filteredRM.id} class="text-sm text-red-500 underline remove_rm">Remove</a>
                    </div></div>
                    <div class="flex items-center pb-3">
                        <div class="mt-4 mb-2"">
                        <p class="text-sm text-gray-900 leading-none mb-1">
                            ${users.filter(user => user.id == filteredRM.remark_by).map(filteredUser => (
                        filteredUser.name
                    ))}
                        </p><p class="text-xs text-gray-600">
                        ${format(new Date(filteredRM.created_at), 'MMMM, dd yyyy')}                            
                        </p></div></div></div>`
                ))
            }
        } else if (modal_id == 'ticket_fileModal') {
            document.getElementById('file_link').innerHTML += ` ${attachfile_name}`
            document.getElementById('file_link').href = `/uploads/others/${attachfile_name}`
        }

    }

    const onCloseModal = () => {

        document.getElementById('ticket_deleteModal').close()
        {
            values.ticket_status == 0
                ? ''
                : document.getElementById(`tr_${values.ticket_id}`).classList.add('bg-teal-100')
        }
        document.getElementById(`tr_${values.ticket_id}`).classList.remove('bg-gray-300');
    };

    function deleteData(e) {
        // document.getElementById('ticket_deleteModal').close()
        e.preventDefault()
        let ticketId = document.getElementById('ticket_id').value
        // console.log(ticketId)
        router.delete(`/tickets/${ticketId} `);
        onCloseModal();
    }

    function deleteFileData(e) {
        document.getElementById('ticket_fileModal').close()
        e.preventDefault()
        let ticketId = document.getElementById('ticket_id').value;
        console.log(ticketId)
        router.post(`/tickets/attach_file/${ticketId}`, values);
    }

    function clickFileLink(e) {
        document.getElementById('ticket_fileModal').close()
        onCloseModal()
        // console.log(e.target.href)
    }

    function addRemark(e) {
        document.getElementById('ticket_viewModal').close()
        onCloseModal()
        e.preventDefault()
        router.post(`/tickets/store/remark`, values);
    }

    function editData(id) {
        router.get(`/tickets/${id} `);
    }

    return (
        <div className="overflow-x-auto mt-3">

            <Modal id="ticket_deleteModal" title="Delete Confirmation" closeModal={onCloseModal}>
                <form onSubmit={deleteData} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure to delete -
                            <span className="font-bold text-sky-700 ticket_number" id="ticket_number"></span>?
                        </div>
                    </div>
                    <TextInput className="ticket_id" id="ticket_id" name="ticket_id" type="hidden" value={values.ticket_id} />

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onCloseModal}>Cancel</SecondaryButton>
                        <PrimaryButton className="ml-3" disabled="" type="submit" >Delete</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal id="ticket_viewModal" title="View Detail" closeModal={onCloseModal} className=" w-full max-w-2xl max-h-full">
                <form onSubmit={addRemark} className="space-y-2.5 ">
                    <div className="pt-4">
                        <span className="font-bold text-gray-700">
                            Ticket Number :
                        </span>
                        <span className="text-gray-700 ticket_number"></span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700">
                            Status :
                        </span>
                        <span className="text-gray-700 ticket_status"></span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700">
                            User ID :
                        </span>
                        <span className="text-gray-700 user_id"></span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700">
                            Remarks :
                        </span>
                        <div id="show_remarks"></div>
                    </div>

                    <div className="pt-2">
                        <InputLabel htmlFor="ticket_number" value="Remark" />
                        <Textarea
                            id="remarks"
                            name="remarks"
                            placeholder="Remarks..."
                            value={values.remarks}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            minRows={5}
                        />
                    </div>
                    <TextInput
                        className="ticket_id"
                        id="ticket_id"
                        name="ticket_id"
                        type="hidden"
                        value={values.ticket_id}
                    />
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton disabled="" type="submit" >Add Remark</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal id="ticket_fileModal" title="View File" closeModal={onCloseModal}>
                <div className='grid grid-cols-1 gap-4'>
                    <div className="pt-4">
                        <a onClick={clickFileLink} id="file_link" className="font-medium text-sky-600 focus:border-sky-700 cursor-pointer underline decoration-sky-300" target="_blank"></a>
                    </div>
                </div>
                <form onSubmit={deleteFileData} className="space-y-6 ">
                    <TextInput className="ticket_id" id="ticket_id" name="ticket_id" type="hidden" value={values.ticket_id} />
                    <TextInput className="attachfile_name" id="attachfile_name" name="attachfile_name" type="hidden" value={values.attachfile_name} />
                    <div className="mt-6 flex justify-end">
                        <PrimaryButton disabled="" type="submit" >Delete This File</PrimaryButton>
                    </div>
                </form>
            </Modal>

            <table className="table" id="ticket_tbl">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Ticket Number</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Topic</th>
                        <th>Level of Importance</th>
                        <th>Attached File</th>
                        <th>Actions</th>
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
                            <tr key={dt.id}
                                className={dt.ticket_status == 0 ? '' : 'bg-teal-100'}
                                id={"tr_" + (dt.id)}
                            >
                                <td>
                                    <a
                                        className='inline-flex items-center px-1 pt-1 underline decoration-sky-300 text-sm font-medium text-sky-600 focus:border-sky-700 cursor-pointer'
                                        onClick={() => callModal(dt, 'ticket_viewModal', '')}
                                        key={dt.id}
                                    >
                                        {dt.ticket_number}
                                    </a>
                                    <small key={"status_" + (dt.id)} className={`block mt-2 ${dt.ticket_status == 0 ? '' : 'font-bold text-teal-150'}`}>
                                        Status : {dt.ticket_status == 0 ? 'Opened' : 'Closed'}
                                    </small>
                                    {
                                        dt.ticket_status == 1 &&
                                        <small key={"updateduser_" + (dt.id)} className="block mt-2">
                                            Updated by : {
                                                users.filter(user => user.id == dt.updated_by_loggedin_user).map(filteredUser => (
                                                    filteredUser.name
                                                ))
                                            }
                                        </small>
                                    }
                                </td>
                                <td>{dt.title}</td>
                                <td>
                                    {dt.customer_user_id}

                                    {
                                        dt.display_name &&
                                        <small key={"name_" + (dt.id)} className="block mt-2">
                                            Name : {dt.display_name}
                                        </small>
                                    }


                                    {dt.user_group_id &&
                                        user_groups.filter(user_gp => user_gp.id == dt.user_group_id)
                                            .map(filteredRes =>
                                                <small key={"usrgp_" + (dt.id)} className="block mt-2">
                                                    User Group : {filteredRes.group_name}
                                                </small>
                                            )
                                    }
                                </td>
                                <td>{topicData[0][dt.topic]}</td>
                                <td>{levelData[0][dt.level_of_importance]}</td>
                                <td>

                                    {
                                        dt.attach_file ?
                                            dt.attach_file.includes(',') ?
                                                splitFile(dt.attach_file, dt)
                                                :
                                                <a
                                                    className='inline-flex items-center px-1 pt-1 underline decoration-sky-300 text-sm font-medium text-sky-600 focus:border-sky-700 cursor-pointer'
                                                    onClick={() => callModal(dt, 'ticket_fileModal', dt.attach_file)}
                                                    key={dt.id}
                                                >
                                                    {
                                                        dt.attach_file.length > 10 ?
                                                            `${dt.attach_file.substring(0, 10)}...` : dt.attach_file
                                                    }
                                                </a>
                                            : ''
                                    }

                                </td>
                                <td>
                                    <button className="btn btn-xs btn-outline btn-block btn-default"
                                        onClick={() => editData(dt.id)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-xs btn-outline btn-block btn-secondary mt-2"
                                        onClick={() => callModal(dt, 'ticket_deleteModal')}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
