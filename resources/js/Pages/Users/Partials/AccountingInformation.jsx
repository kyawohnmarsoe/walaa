import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function AccountingInformation({ user,className = '' }) {
    // const user = usePage().props.auth.user;

    // const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    //     name: user.name,
    //     email: user.email,
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     patch(route('profile.update'));
    // };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-primary">Accounting Information</h2>

                {/* <p className="mt-1 text-sm text-error">
                    Information in this section is publicly available to the user and can only be modified by the customer!
                </p> */}
            </header>
            
             <table className="mt-6 space-y-6 ">
                <tr>
                    <td>User Creation Date</td>
                    <td>: {user?.customer?.createdAt}</td>
                </tr>
                <tr>
                    <td>Last Modified</td>
                    <td>: {user?.customer?.updatedAt}</td>
                </tr>
                <tr>
                    <td>Manual Expiration Date:</td>
                    <td>: {user?.manualExpirationDate}</td>
                </tr>
                <tr>
                    <td>Last Refill Date</td>
                    <td>: {user?.lastRefill}</td>
                </tr>
                <tr>
                    <td>Last User Payment Date</td>
                    <td>: {user?.lastPayment}</td>
                </tr>
                <tr>
                    <td>Last Logout On</td>
                    <td>: {user?.logout}</td>
                </tr>
                <tr>
                    <td>Last Error Log</td>
                    <td>: {user?.error}</td>
                </tr>
             </table>
            
        </section>
    );
}
