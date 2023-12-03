import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function SetPaymentModal ({ modals, setModals, apitoken, item,auth })
{
    let { flash } = usePage().props

    const { data, setData, post, processing, errors, reset } = useForm({
        id:item.id,
        userID: item.userID,
        paidPrice: item.paidPrice,
        balance: item.balance,
        currentPayment:'',
        notes: item.notes,
        modifyUser: auth.user.email ,
    })


    const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
    const { value, errMessage } = updateInfo

    // const [newUserData, setNewUserData] = useState({ newUser: null })
    // const { newUser } = newUserData

    const submit = (e) =>
    {
        e.preventDefault();
        router.post(`/invoices/update/${ item.id }`, { payment: data })
       
    }

    const closeModal = () =>
    {
        setModals({
            setPayment: false
        });

        setUpdateInfo({ errMessage: '', value: '' })

        setData({
            ...data,
            currentPayment: '',
            notes: item.notes,
        })

        // flash.status = '';

        flash.status == 201 && location.reload()

    };
    return (
        <Modal show={ modals.setPayment } onClose={ closeModal } maxWidth={ 'xl' }>
            <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Set Payment
                </h2>

                <p className="mt-1 text-sm text-red-600">
                    { }
                </p>

                <div className="mt-6">
                    <p>UserID : { data?.userID }</p>
                    <p>Paid Amount : { data?.paidPrice }</p>
                    <p>Balance : { data?.balance }</p>
                </div>


                <div className="mt-6">
                    <InputLabel htmlFor="currentPayment" value="Current Payment :" />

                    <TextInput
                        id="currentPayment"
                        className="mt-1 block w-full  "
                        type="number"
                        min={0}
                        max={ data?.balance }
                        value={ data?.currentPayment }
                        onChange={ (e) => setData('currentPayment', e.target.value) }
                        required
                    />

                </div>


                <div className="mt-6">
                    <InputLabel htmlFor="notes" value="Notes :" />

                    <TextInput
                        id="notes"
                        className="mt-1 block w-full  "
                        value={ data?.notes }
                        onChange={ (e) => setData('notes', e.target.value) }
                    />

                </div>



                <div className="mt-6 flex justify-end">
                    {/* { value && <span className='text-success pr-4'> Refill Success </span> } */ }

                    { errMessage && <span className='text-red-500 pr-4'> { errMessage } </span> }
                    { flash.status == 201 &&
                        <span className='text-success pr-4'> Payment Success </span>
                    }
                    <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" >
                        Submit
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
