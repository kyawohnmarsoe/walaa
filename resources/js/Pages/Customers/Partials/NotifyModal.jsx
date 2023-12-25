import React, { useState } from "react";
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm, router } from '@inertiajs/react';


export default function NotifyModal({ modals, setModals, user }) {
    const { data, setData } = useForm({
        email: user.customer_user_id,
        customer_user_index: user.customer_user_index
    })

    const submit = (e) => {
        e.preventDefault();

        let customer_user_index = user.customer_user_index
        router.get(`/customers/notify/${customer_user_index}`);
        closeModal()
    }

    const closeModal = () => {
        setModals({
            ...modals,
            notify: false
        });
    };


    return (
        <Modal show={modals.notify} onClose={closeModal} maxWidth={'xl'}>
            <form onSubmit={submit} className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Notify via SMS
                </h2>

                <p className="mt-1 text-sm ">
                    Are you sure to send notification message :
                    <span className="font-bold text-sky-700">
                        {user?.customer_user_id}
                    </span>
                    ?
                </p>

                <div className="mt-6 flex justify-end">

                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" >
                        Send
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
