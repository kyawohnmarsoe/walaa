import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ApiUserEdit({ className = '', auth, apiuser_data }) {
    const { processing } = useForm();

    const { flash } = usePage().props

    const [values, setValues] = useState({
        username: apiuser_data.username,
        password: apiuser_data.password,
    });

    useEffect(() => {
    }, [])

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
        router.post(`/apiuser/${apiuser_data.id}`, values)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Change Api User</h2>
            }
        >
            <Head title="Change Api User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {flash.status == 422 &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>Something went wrong!</p>
                        </div>
                    }


                    {flash.message &&
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            <p>{flash.message}</p>
                        </div>
                    }

                    {flash.error_message &&
                        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p className="font-bold">Warning</p>
                            <p>{flash.error_message}</p>
                        </div>
                    }

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className='p-4'>

                            <header>
                                <h2 className="text-lg font-medium text-sky-600">Change Api User</h2>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                                <div className='grid grid-cols-3 gap-4'>
                                    <div>
                                        <InputLabel htmlFor="username" value="Username" />
                                        <TextInput
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            type="text"
                                            className="mt-1 block w-full"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing} type="submit">Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>


                </div>
            </div>

        </AuthenticatedLayout>
    );
}
