import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UserStatus({ user,className = '' }) {
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
                <h2 className="text-lg font-medium text-primary">User Status</h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>
            
             <table className="mt-6 space-y-6 ">
                <tr>
                    <td>Status</td>
                    <td>: {user?.accountStatus && (<span style={{color:user.serviceStatusColorHex}}>{user.accountStatus}</span>) }</td>
                </tr>
                <tr>
                    <td>MAC</td>
                    <td>: {user?.mac}</td>
                </tr>
                <tr>
                    <td>IP</td>
                    <td>: {user?.userIP}</td>
                </tr>
                <tr>
                    <td>Account Type</td>
                    <td>: {user?.accountPackageType} <a href="#" className='text-primary'>Refill</a></td>
                </tr>
             </table>
            
        </section>
    );
}
