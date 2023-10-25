import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';
import InputError from '@/Components/InputError';

export default function AddForm({ className = '', customers, apitoken, errors }) {

    const { processing, recentlySuccessful } = useForm();

    const [values, setValues] = useState({
        user_id: '',
        ticket_source: '',
        topic: '',
        ticket_address: '',
        level_of_importance: '',
        ticket_number: ''
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

    const getCustomers = () => {
        let optionsCustomersArr = [];
        {
            customers.map((e) => {
                optionsCustomersArr.push(
                    {
                        "index": e.id,
                        "name": e.customer_user_id
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
        const value = e.target.value
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
        router.post('/tickets/store', values)
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Add Ticket</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="user_id" value="Users" />
                        <SelectOption
                            id="user_id"
                            className="mt-1 block w-full"
                            options={optionsCustomers}
                            select_text="Users"
                            name="user_id"
                            onChange={customersHandleChange}
                        />
                        <InputError className="mt-2" message={errors.user_id} />
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
                        <InputError className="mt-2" message={errors.ticket_source} />
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
                        <InputError className="mt-2" message={errors.topic} />
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
                        <InputError className="mt-2" message={errors.ticket_address} />
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
                        <InputError className="mt-2" message={errors.level_of_importance} />
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
                        <InputError className="mt-2" message={errors.ticket_number} />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Add</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Add</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}