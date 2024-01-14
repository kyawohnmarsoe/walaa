import { useState, useEffect } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';
import InputError from '@/Components/InputError';
import Select, { components } from "react-select";

export default function AddForm({ className = '', customers, apitoken, errors }) {

    const { processing, recentlySuccessful } = useForm();

    const Input = (props) => {
        const { autoComplete = props.autoComplete } = props.selectProps;
        return <components.Input {...props} autoComplete={autoComplete} />;
    };

    const [values, setValues] = useState({
        user_id: '',
        title: '',
        topic: '',
        level_of_importance: '',
        attach_file: [],
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

    function attachFileHandleChange(e) {
        setValues(values => ({
            ...values,
            'attach_file': [],
        }))
        let attachFiles = [];
        const files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                attachFiles.push(files[i]);
            }
            setValues(values => ({
                ...values,
                'attach_file': attachFiles,
            }))
        }
        // console.log(attachFiles);
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
                <h2 className="text-lg font-medium text-sky-600">Add Ticket</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <span className='font-bold text-emerald-700' id="deposit_msg"></span>

                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <InputLabel htmlFor="user_id" value="Users " className='required' />
                        <Select
                            name="user_id"
                            className="autoselect border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            components={{ Input }}
                            autoComplete="user_id"
                            options={optionsCustomers}
                            onChange={customersHandleChange}
                            noOptionsMessage={() => "No Users found..."}
                        />
                        <InputError className="mt-2" message={errors.user_id} />
                    </div>

                    <div>
                        <InputLabel htmlFor="title" value="Ticket Title" />
                        <TextInput
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            className="mt-1 block w-full"
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
                        <InputLabel htmlFor="level_of_importance" value="Level Of Importance" className='required' />
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
                        <InputLabel htmlFor="attach_file" value="File Attachment" />
                        <div className='flex border-none'>
                            <div>
                                <TextInput
                                    id="attach_file"
                                    name="attach_file[]"
                                    onChange={attachFileHandleChange}
                                    type="file"
                                    className="mt-1 block w-full border-none rounded-none"
                                    multiple
                                />
                            </div>
                        </div>
                        <InputError className="mt-2" message={errors.attach_file} />
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
        </section >
    );
}
