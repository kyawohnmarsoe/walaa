import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';
import Select, { components } from "react-select";
import NavLink from '@/Components/NavLink';

export default function EditForm({ className = '', ticket, customers }) {

    const { processing, recentlySuccessful } = useForm();

    const [values, setValues] = useState({
        user_id: ticket.user_id,
        ticket_source: ticket.ticket_source,
        topic: ticket.topic,
        ticket_address: ticket.ticket_address,
        level_of_importance: ticket.level_of_importance,
        ticket_number: ticket.ticket_number,
        ticket_status: ticket.ticket_status
    });

    const [optionsCustomers, setoptionsCustomers] = useState([])
    const [selectedOpt, setSelectedOpt] = useState('')

    const optionsTicketSource = [
        {
            "index": "ts_1",
            "name": "Phone"
        },
        {
            "index": "ts_2",
            "name": "Email"
        },
        {
            "index": "ts_3",
            "name": "Other"
        },
    ];
    const optionsTopic = [
        {
            "index": "tp_1",
            "name": "Inquiries"
        },
        {
            "index": "tp_2",
            "name": "Subscriber Data"
        },
        {
            "index": "tp_3",
            "name": "Maintenance"
        },
        {
            "index": "tp_4",
            "name": "Accounts"
        },
        {
            "index": "tp_5",
            "name": "Administration"
        },
    ];
    const optionsLevelImp = [
        {
            "index": "lv_1",
            "name": "Not Important"
        },
        {
            "index": "lv_2",
            "name": "Normal"
        },
        {
            "index": "lv_3",
            "name": "A Task"
        },
        {
            "index": "lv_4",
            "name": "Very Important"
        }
    ];
    const optionsStatus = [
        {
            "index": "0",
            "name": "Opened"
        },
        {
            "index": "1",
            "name": "Closed"
        }
    ];

    const Input = (props) => {
        const { autoComplete = props.autoComplete } = props.selectProps;
        return <components.Input {...props} autoComplete={autoComplete} />;
    };

    const getCustomers = () => {
        let optionsCustomersArr = [];
        {
            customers.map((e) => {
                optionsCustomersArr.push(
                    {
                        "value": e.id,
                        "label": e.customer_user_id
                    }
                );
            });
        }
        setoptionsCustomers(optionsCustomersArr)
    }

    const getSelectedCustomer = (selected_id) => {
        {
            let selectedRes = customers.filter(cus => selected_id == cus.id)
            // console.log("selected user ", selectedRes[0]['customer_user_id'])
            setSelectedOpt(selectedRes[0]['customer_user_id'])
        }
    }

    useEffect(() => {
        getCustomers()
        getSelectedCustomer(ticket.user_id)
        // console.log("old user value ", values.user_id)
    }, [])

    function customersHandleChange(e) {
        const value = e.value
        setValues(values => ({
            ...values,
            'user_id': value,
        }))
        // console.log('onchange user value ', value)
        getSelectedCustomer(value)
    }

    function ticketSourceHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'ticket_source': value,
        }))
    }
    function topicHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'topic': value,
        }))
    }
    function levelImpHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'level_of_importance': value,
        }))
    }
    function statusHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'ticket_status': value,
        }))
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post(`/tickets/${ticket.id}`, values)
    }

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <NavLink className='border-b-2 border-sky-700 text-gray-900 focus:border-sky-700' href={route('tickets')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Ticket List
                </NavLink>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit Ticket</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="user_id" value="Users" />
                        <Select
                            name="user_id"
                            className="autoselect border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            components={{ Input }}
                            autoComplete="user_id"
                            value={{ value: values.user_id, label: selectedOpt }}
                            options={optionsCustomers}
                            onChange={(e) => customersHandleChange(e)}
                            noOptionsMessage={() => "No Users found..."}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_source" value="Ticket Source" />
                        <SelectOption
                            id="ticket_source"
                            className="mt-1 block w-full"
                            options={optionsTicketSource}
                            select_text="Ticket Source"
                            name="ticket_source"
                            onChange={ticketSourceHandleChange}
                            value={values.ticket_source}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="topic" value="Topic" />
                        <SelectOption
                            id="topic"
                            className="mt-1 block w-full"
                            options={optionsTopic}
                            select_text="Topic"
                            name="topic"
                            onChange={topicHandleChange}
                            value={values.topic}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_address" value="Ticket Address" />
                        <Textarea
                            id="ticket_address"
                            name="ticket_address"
                            placeholder="Ticket Address..."
                            value={values.ticket_address}
                            onChange={handleChange}
                            className="mt-1 block w-full"
                            minRows={5}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="level_of_importance" value="Level Of Importance" />
                        <SelectOption
                            id="level_of_importance"
                            className="mt-1 block w-full"
                            options={optionsLevelImp}
                            select_text="Level"
                            name="level_of_importance"
                            onChange={levelImpHandleChange}
                            value={values.level_of_importance}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_number" value="Ticket Number" />
                        <TextInput
                            id="ticket_number"
                            name="ticket_number"
                            value={values.ticket_number}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_status" value="Status" />
                        <SelectOption
                            id="ticket_status"
                            className="mt-1 block w-full"
                            options={optionsStatus}
                            select_text="Status"
                            name="ticket_status"
                            onChange={statusHandleChange}
                            value={values.ticket_status}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Update</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
