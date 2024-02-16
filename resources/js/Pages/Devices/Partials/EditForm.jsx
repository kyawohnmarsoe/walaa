import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectOption from '@/Components/SelectOption';

export default function EditForm({ className = '', device, towers }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        tower_id: device.tower_id,
        device_name: device.device_name ?? '',
        ip_address: device.ip_address ?? '',
        device_type: device.device_type ?? '',
        device_model: device.device_model ?? '',
        no_of_ports: device.no_of_ports ?? '',
        notes: device.notes ?? '',
        device_status: device.device_status
    });

    const optionsStatus = [
        {
            "index": 0,
            "name": "Down"
        },
        {
            "index": 1,
            "name": "Up"
        }
    ];

    const [optionsTowers, setOptionsTowers] = useState([])

    const getTowers = () => {
        let optionsTowersArr = [];
        {
            towers.map((e) => {
                optionsTowersArr.push(
                    {
                        "index": e.id,
                        "name": e.tower_name
                    }
                );
            });
        }
        setOptionsTowers(optionsTowersArr)
    }

    function statusHandleChange(e) {
        const value = e.target.value
        setData(data => ({
            ...data,
            'device_status': value,
        }))
    }

    function towersHandleChange(e) {
        const value = e.target.value
        // console.log(value);
        setData(data => ({
            ...data,
            'tower_id': value,
        }))
    }

    useEffect(() => {
        getTowers()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('devices.update', device.id));
    };

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('devices')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Device List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit device</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <div className='grid grid-cols-3 gap-8'>

                    <div>
                        <InputLabel htmlFor="tower_id" value="Tower" className='required' />
                        <SelectOption
                            id="tower_id"
                            className="mt-1 block w-full"
                            options={optionsTowers}
                            select_text="Tower"
                            name="tower_id"
                            value={data.tower_id}
                            onChange={towersHandleChange}
                        />
                        <InputError message={errors.tower_id} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="device_name" value="Device Name" className='required' />
                        <TextInput
                            id="device_name"
                            name="device_name"
                            value={data.device_name}
                            className="mt-1 block w-full"
                            autoComplete="device_name"
                            isFocused={true}
                            onChange={(e) => setData('device_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.device_name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="device_type" value="Device Type" className='required' />
                        <TextInput
                            id="device_type"
                            name="device_type"
                            value={data.device_type}
                            className="mt-1 block w-full"
                            autoComplete="device_type"
                            isFocused={true}
                            onChange={(e) => setData('device_type', e.target.value)}
                            required
                        />
                        <InputError message={errors.device_type} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="device_model" value="Device Model" />
                        <TextInput
                            id="device_model"
                            name="device_model"
                            value={data.device_model}
                            className="mt-1 block w-full"
                            autoComplete="device_model"
                            isFocused={true}
                            onChange={(e) => setData('device_model', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ip_address" value="IP Address" />
                        <TextInput
                            id="ip_address"
                            name="ip_address"
                            value={data.ip_address}
                            className="mt-1 block w-full"
                            autoComplete="ip_address"
                            isFocused={true}
                            onChange={(e) => setData('ip_address', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="no_of_ports" value="Number of ports" />
                        <TextInput
                            id="no_of_ports"
                            name="no_of_ports"
                            value={data.no_of_ports}
                            className="mt-1 block w-full"
                            autoComplete="no_of_ports"
                            isFocused={true}
                            onChange={(e) => setData('no_of_ports', e.target.value)}
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

                    <div>
                        <InputLabel htmlFor="device_status" value="Up / Down Status" />
                        <SelectOption
                            id="device_status"
                            className="mt-1 block w-full"
                            options={optionsStatus}
                            select_text="Up / Down Status"
                            name="device_status"
                            value={data.device_status}
                            onChange={statusHandleChange}
                        />
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
