import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';
import Select, { components } from "react-select";

export default function FilterForm({ className = '', customers, apitoken, errors }) {

    const { processing } = useForm();

    const Input = (props) => {
        const { autoComplete = props.autoComplete } = props.selectProps;
        return <components.Input {...props} autoComplete={autoComplete} />;
    };

    const [values, setValues] = useState({
        user_id: '',
        ticket_source: '',
        topic: '',
        level_of_importance: '',
        ticket_number: '',
        ticket_status: ''
    });

    const [optionsCustomers, setOptionsCustomers] = useState([])

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
        setOptionsCustomers(optionsCustomersArr)
    }

    useEffect(() => {
        getCustomers()
    }, [])

    function customersHandleChange(e) {
        const value = e.value
        // console.log(value);
        setValues(values => ({
            ...values,
            'user_id': value,
        }))
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
        router.post('/tickets', values)
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Filter Ticket</h2>
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
                            options={optionsCustomers}
                            onChange={customersHandleChange}
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
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Search</PrimaryButton>
                    <PrimaryButton disabled={processing}
                        onClick={() => window.location.reload(false)} className="resetBtn">
                        Reset
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
