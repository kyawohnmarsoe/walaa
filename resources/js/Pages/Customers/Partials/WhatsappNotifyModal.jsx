import React, { useState } from "react";
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import { useForm } from '@inertiajs/react';


export default function WhatsappNotifyModal({ modals, setModals, user }) {
    const { data, setData, post } = useForm({
        email: user.customer_user_id,
        customer_user_index: user.customer_user_index,
        message: '',
    })

    const submit = (e) => {
        e.preventDefault();

        let customer_user_index = user.customer_user_index
        post(route('send_whatsapp', customer_user_index));
        closeModal()
    }

    const closeModal = () => {
        setModals({
            ...modals,
            whatsappnotify: false
        });
    };

    return (
        <Modal show={modals.whatsappnotify} onClose={closeModal} maxWidth={'xl'}>
            <form onSubmit={submit} className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Notify via Whatsapp
                </h2>

                <p className="mt-1 text-sm ">
                    Are you sure to send notification message :
                    <span className="font-bold text-sky-700">
                        {user?.customer_user_id}
                    </span>
                    ?
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="message" value="Message :" />
                    <TextInput
                        id="message"
                        name="message"
                        className="mt-1 block w-full  "
                        value={data?.message}
                        onChange={(e) => setData('message', e.target.value)}
                    />
                </div>
                <TextInput type="hidden" id="email" name="email" value={user?.email} />
                <TextInput type="hidden" id="customer_user_index" name="customer_user_index" value={user?.customer_user_index} />

                <div className="mt-6 flex justify-end">

                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" type="submit">
                        Send
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
