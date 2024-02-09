import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';

export default function FilterForm({ className = '', customers, apitoken, errors }) {

    const { processing } = useForm();

    const [values, setValues] = useState({
        user_id: '',
        ticket_source: '',
        topic: '',
        level_of_importance: '',
        ticket_number: '',
        filter_ticket_status: '',
        search_value: ''
    });

    const [optionsCustomers, setOptionsCustomers] = useState([])

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
                        "label": e.customer_user_id + ' ' + e.display_name
                    }
                );
            });
        }
        setOptionsCustomers(optionsCustomersArr)

    }

    useEffect(() => {
        getCustomers()
    }, [])

    function topicHandleChange(e) {
        const value = e.target.value
        setValues(values => ({
            ...values,
            'topic': value,
        }))
    }

    function statusHandleChange(e) {
        const value = parseInt(e.target.value)
        setValues(values => ({
            ...values,
            'filter_ticket_status': value,
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
        router.post('/device/tickets', values)
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Filter Device Ticket</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="search_value" value="Search" />
                        <TextInput
                            id="search_value"
                            name="search_value"
                            value={values.search_value}
                            onChange={handleChange}
                            type="text"
                            className="mt-1 block w-full"
                            placeholder="By Ticket Number / Title / Remarks "
                            autoComplete="off"
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
                        <InputLabel htmlFor="filter_ticket_status" value="Status" />
                        <SelectOption
                            id="filter_ticket_status"
                            className="mt-1 block w-full"
                            options={optionsStatus}
                            select_text="Status"
                            name="filter_ticket_status"
                            onChange={statusHandleChange}
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
