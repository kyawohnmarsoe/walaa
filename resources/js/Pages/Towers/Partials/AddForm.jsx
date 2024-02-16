import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';

export default function AddForm({ className = '' }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        tower_name: '',
        ip_address: '',
        rent_price: '',
        electric_price: '',
        line_price: '',
        address: '',
        latitude: '',
        longitude: '',
        owner_name: '',
        mobile_number: '',
        mobile_number2: '',
        notes: '',
    });

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('towers.store'));
    };

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('towers')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Tower List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Add Tower</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <InputLabel htmlFor="tower_name" value="Tower Name" className='required' />
                        <TextInput
                            id="tower_name"
                            name="tower_name"
                            value={data.tower_name}
                            className="mt-1 block w-full"
                            autoComplete="tower_name"
                            isFocused={true}
                            onChange={(e) => setData('tower_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.tower_name} className="mt-2" />
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
                        <InputLabel htmlFor="rent_price" value="Rent Price" />
                        <TextInput
                            id="rent_price"
                            name="rent_price"
                            value={data.rent_price}
                            className="mt-1 block w-full"
                            autoComplete="rent_price"
                            isFocused={true}
                            onChange={(e) => setData('rent_price', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="electric_price" value="Electric Price" />
                        <TextInput
                            id="electric_price"
                            name="electric_price"
                            value={data.electric_price}
                            className="mt-1 block w-full"
                            autoComplete="electric_price"
                            isFocused={true}
                            onChange={(e) => setData('electric_price', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="line_price" value="Line Price" />
                        <TextInput
                            id="line_price"
                            name="line_price"
                            value={data.line_price}
                            className="mt-1 block w-full"
                            autoComplete="line_price"
                            isFocused={true}
                            onChange={(e) => setData('line_price', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            name="address"
                            value={data.address}
                            className="mt-1 block w-full"
                            autoComplete="address"
                            isFocused={true}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="latitude" value="Latitude" />
                        <TextInput
                            id="latitude"
                            name="latitude"
                            value={data.latitude}
                            className="mt-1 block w-full"
                            autoComplete="latitude"
                            isFocused={true}
                            onChange={(e) => setData('latitude', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="longitude" value="Longitude" />
                        <TextInput
                            id="longitude"
                            name="longitude"
                            value={data.longitude}
                            className="mt-1 block w-full"
                            autoComplete="longitude"
                            isFocused={true}
                            onChange={(e) => setData('longitude', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="owner_name" value="Owner Name" />
                        <TextInput
                            id="owner_name"
                            name="owner_name"
                            value={data.owner_name}
                            className="mt-1 block w-full"
                            autoComplete="owner_name"
                            isFocused={true}
                            onChange={(e) => setData('owner_name', e.target.value)}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="mobile_number" value="Mobile Number" />
                        <TextInput
                            id="mobile_number"
                            name="mobile_number"
                            value={data.mobile_number}
                            className="mt-1 block w-full"
                            autoComplete="mobile_number"
                            isFocused={true}
                            onChange={(e) => setData('mobile_number', e.target.value)}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="mobile_number2" value="Mobile Number 2" />
                        <TextInput
                            id="mobile_number2"
                            name="mobile_number2"
                            value={data.mobile_number2}
                            className="mt-1 block w-full"
                            autoComplete="mobile_number2"
                            isFocused={true}
                            onChange={(e) => setData('mobile_number2', e.target.value)}
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
