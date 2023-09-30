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
                <h2 className="text-lg font-medium text-primary">Security</h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>
            
            <div className="mt-6 space-y-6 ">
                
                <div>
                    Password 

                <p className=" mb-1 text-sm text-gray-600">
                   The password used on the router
                </p>

                <a href="#" className=' text-primary'>Show</a> | <a href="#" className='text-primary'>Change</a>
                
                </div>
               
                <div>
                     Account Password 

                <p className=" mb-1 text-sm text-gray-600">
                   The account password is used to prevent the user from changing the subscription password from the subscriber information page until he enters it.
                </p>

                <a href="#" className=' text-primary'>Show</a> | <a href="#" className='text-primary'>Change</a>
                
                </div>
            
            </div>
            
        </section>
    );
}
