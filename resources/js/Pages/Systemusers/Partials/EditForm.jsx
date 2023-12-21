import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import SelectOption from '@/Components/SelectOption';

export default function EditForm({ className = '', systemuser, user_has_group, user_groups }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: systemuser.name,
        email: systemuser.email,
        group_id: user_has_group,
        active_status: systemuser.active_status
    });

    const optionsActiveStatus = [
        {
            "index": 0,
            "name": "Disable"
        },
        {
            "index": 1,
            "name": "Active"
        }
    ];

    function activeStatusHandleChange(e) {
        const value = e.target.value
        setData(values => ({
            ...data,
            'active_status': value,
        }))
    }

    const handleChange = (e) => {
        // const checked = e.target.checked;
        const value = parseInt(e.target.value);
        setData("group_id",
            !data.group_id.includes(value)
                ? [...data.group_id, value]
                : data.group_id.filter((item) => item !== value)
        );
    };

    useEffect(() => {
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('systemuser.update', systemuser.id));
    };

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('systemuser')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    System User List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit System User</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <div className='grid grid-cols-2 gap-8'>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="active_status" value="Active / Disable Status" />
                        <SelectOption
                            id="active_status"
                            className="mt-1 block w-full"
                            options={optionsActiveStatus}
                            select_text="Active / Disable Status"
                            name="active_status"
                            value={data.active_status}
                            onChange={activeStatusHandleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="group_id[]" value="User Group" />
                        <div className='grid grid-cols-3 gap-4'>
                            {
                                user_groups.map((usr_gp, index) => {
                                    return (
                                        <label className="flex items-center mt-1" key={index}>
                                            <Checkbox
                                                name="group_id[]"
                                                id={`group_id${usr_gp.id}`}
                                                value={usr_gp.id}
                                                onChange={handleChange}
                                                defaultChecked={data.group_id.includes(usr_gp.id)}
                                            />
                                            <span className="ml-2 text-sm text-gray-600">
                                                {usr_gp.group_name}
                                            </span>
                                        </label>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
