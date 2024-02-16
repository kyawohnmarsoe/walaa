import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function AddForm({ className = '', devices }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        device_id: '',
        port_name: '',
        port_number: '',
        port_type: '',
        no_of_clients: '',
        notes: '',
    });

    const [optionsDevices, setOptionsDevices] = useState([])

    const getDevices = () => {
        let optionsDevicesArr = [];
        {
            devices.map((e) => {
                optionsDevicesArr.push(
                    {
                        "index": e.id,
                        "name": e.device_name
                    }
                );
            });
        }
        setOptionsDevices(optionsDevicesArr)
    }

    useEffect(() => {
        getDevices()
    }, []);

    function devicesHandleChange(e) {
        const value = e.target.value
        // console.log(value);
        setData(data => ({
            ...data,
            'device_id': value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('ports.store'));
    };

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('ports')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Ports List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Add Port</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <div className='grid grid-cols-3 gap-4'>

                    <div>
                        <InputLabel htmlFor="device_id" value="Device" className='required' />
                        <SelectOption
                            id="device_id"
                            className="mt-1 block w-full"
                            options={optionsDevices}
                            select_text="Device"
                            name="device_id"
                            onChange={devicesHandleChange}
                        />
                        <InputError message={errors.device_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="port_name" value="Port Name" className='required' />
                        <TextInput
                            id="port_name"
                            name="port_name"
                            value={data.port_name}
                            className="mt-1 block w-full"
                            autoComplete="port_name"
                            isFocused={true}
                            onChange={(e) => setData('port_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.port_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="port_number" value="Port Number" />
                        <TextInput
                            id="port_number"
                            name="port_number"
                            value={data.port_number}
                            className="mt-1 block w-full"
                            autoComplete="port_number"
                            isFocused={true}
                            onChange={(e) => setData('port_number', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="port_type" value="Port Type" className='required' />
                        <TextInput
                            id="port_type"
                            name="port_type"
                            value={data.port_type}
                            className="mt-1 block w-full"
                            autoComplete="port_type"
                            isFocused={true}
                            onChange={(e) => setData('port_type', e.target.value)}
                            required
                        />
                        <InputError message={errors.port_type} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="no_of_clients" value="Number of clients" />
                        <TextInput
                            id="no_of_clients"
                            name="no_of_clients"
                            value={data.no_of_clients}
                            className="mt-1 block w-full"
                            autoComplete="no_of_clients"
                            isFocused={true}
                            onChange={(e) => setData('no_of_clients', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="notes" value="Notes" />
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Notes..."
                            value={data.notes}
                            className="mt-1 block w-full"
                            autoComplete="notes"
                            onChange={(e) => setData('notes', e.target.value)}
                        />
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Add</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
