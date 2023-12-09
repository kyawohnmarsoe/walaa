import { useState, useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';
import Select, { components } from "react-select";
import InputError from '@/Components/InputError';

export default function EditForm({ className = '', ticket, customers, updated_by_loggedin_user }) {

    const { processing, recentlySuccessful } = useForm();

    const { errors } = usePage().props

    const [values, setValues] = useState({
        user_id: ticket.user_id,
        ticket_source: ticket.ticket_source,
        topic: ticket.topic,
        ticket_address: ticket.ticket_address,
        level_of_importance: ticket.level_of_importance,
        ticket_number: ticket.ticket_number,
        ticket_status: ticket.ticket_status,
        updated_by_loggedin_user: updated_by_loggedin_user,
        image: ticket.image,
        attach_file: ticket.attach_file,
    });

    const [urlImage, setUrlImage] = useState();
    const [urlAttachFile, setUrlAttachFile] = useState('');

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
        {
            ticket.image ?
                setUrlImage(`/uploads/${ticket.image}`)
                :
                setUrlImage('')
        }
        {
            ticket.attach_file ?
                setUrlAttachFile(ticket.attach_file)
                :
                setUrlAttachFile('')
        }

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

    function imageHandleChange(e) {
        // console.log(e.target.files);
        setUrlImage(URL.createObjectURL(e.target.files[0]));
        setValues(values => ({
            ...values,
            'image': e.target.files[0],
        }))
    }

    function attachFileHandleChange(e) {
        // console.log(e.target.files);
        setUrlAttachFile('');
        setValues(values => ({
            ...values,
            'attach_file': e.target.files[0],
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
        // console.log(values.image);
        router.post(`/tickets/${ticket.id}`, values)
    }

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('tickets')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Ticket List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit Ticket</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="user_id" value="Users" className='required' />
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
                        <InputError className="mt-2" message={errors.user_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_source" value="Ticket Source" className='required' />
                        <SelectOption
                            id="ticket_source"
                            className="mt-1 block w-full"
                            options={optionsTicketSource}
                            select_text="Ticket Source"
                            name="ticket_source"
                            onChange={ticketSourceHandleChange}
                            value={values.ticket_source}
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
                        <InputLabel htmlFor="level_of_importance" value="Level Of Importance" className='required' />
                        <SelectOption
                            id="level_of_importance"
                            className="mt-1 block w-full"
                            options={optionsLevelImp}
                            select_text="Level"
                            name="level_of_importance"
                            onChange={levelImpHandleChange}
                            value={values.level_of_importance}
                        />
                        <InputError className="mt-2" message={errors.level_of_importance} />
                    </div>

                    <div>
                        <InputLabel htmlFor="ticket_number" value="Ticket Number" className='required' />
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

                    <div>
                        <InputLabel htmlFor="image" value="Image" />
                        <TextInput
                            id="image"
                            name="image"
                            onChange={imageHandleChange}
                            type="file"
                            className="mt-1 block w-full"
                        />
                        <p className="mt-2 text-sm text-gray-500 " id="file_input_help">
                            svg, png, jpg, jpeg or gif.
                        </p>
                        <img className="mt-4 h-auto max-w-xs rounded-lg" src={urlImage} />
                        <InputError className="mt-2" message={errors.image} />
                    </div>

                    <div>
                        <InputLabel htmlFor="attach_file" value="File Attachment" />
                        <TextInput
                            id="attach_file"
                            name="attach_file"
                            onChange={attachFileHandleChange}
                            type="file"
                            className="mt-1 block w-full"
                        />
                        <p className="mt-2 text-sm text-gray-500 " id="file_input_help">
                            docx, doc, pdf, csv, xls or xlsx.
                        </p>
                        <p className="mt-4 text-sm text-emerald-600">{urlAttachFile}</p>
                        <InputError className="mt-2" message={errors.attach_file} />
                    </div>

                    <TextInput
                        id="updated_by_loggedin_user"
                        name="updated_by_loggedin_user"
                        value={values.updated_by_loggedin_user}
                        type="hidden"
                        className="mt-1 block w-full"
                        autoComplete="off"
                    />
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
