import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function EditForm({ className = '', issue }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        issue_type: issue.issue_type,
    });

    useEffect(() => {
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('ticket.issues.update', issue.id));
    };

    return (
        <section className={className}>
            <div className='flex items-center justify-end gap-4 p-2'>
                <a
                    className='inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-sky-300 text-sky-600 focus:border-sky-700 cursor-pointer'
                    href={route('ticket.issues')}>
                    <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                    Issues List
                </a>
            </div>
            <header>
                <h2 className="text-lg font-medium text-sky-600">Edit Issue</h2>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6 ">

                <div className='grid grid-cols-2 gap-8'>
                    <div>
                        <InputLabel htmlFor="issue_type" value="Issue Type" />
                        <TextInput
                            id="issue_type"
                            name="issue_type"
                            value={data.issue_type}
                            className="mt-1 block w-full"
                            autoComplete="issue_type"
                            isFocused={true}
                            onChange={(e) => setData('issue_type', e.target.value)}
                            required
                        />
                        <InputError message={errors.issue_type} className="mt-2" />
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} type="submit">Update</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
