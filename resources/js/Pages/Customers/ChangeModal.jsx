import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';


export default function ChangeModal({ modals, setModals, user, apitoken, accountTypes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        UserId: user.userID,
        AccountIndex: ''
    })

    const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
    const { value, errMessage } = updateInfo

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
    });

    const submit = (e) => {
        e.preventDefault();
        // console.log(data)
        // console.log(filterObj)

        instance.post('/user/chnageaccounttype', data)
            .then(res => {
                // console.log(res.data.value)

                !res.data.value ? setUpdateInfo({ errMessage: res?.data?.error?.message || 'Can not change account type for this user!', value: '' }) :
                    (setUpdateInfo({ errMessage: '', value: res.data.value }), location.reload())


            })
            .catch(err => {
                setUpdateInfo({ errMessage: err.message, value: '' })
            })


    }

    const closeModal = () => {
        setModals({
            ...modals,
            change: false
        });

        setUpdateInfo({ errMessage: '', value: '' })

        setData({
            ...data,
            AccountIndex: '',
        })



        // flash.status == 201 && 

    };


    return (
        <Modal show={modals.change} onClose={closeModal} maxWidth={'xl'}>
            <form onSubmit={submit} className="p-6 scroll-form" autoComplete="off">
                <h2 className="text-lg font-medium text-gray-900">
                    Change User's Accont Type
                </h2>

                <p className="mt-1 text-sm ">
                    You are about to change the account of this user: <span className="font-bold text-sky-700">{user?.userID}</span>
                </p>

                <div className="mt-6">
                    <InputLabel htmlFor="AccountIndex" value="Account Type:" />
                    <select
                        name="AccountIndex"
                        id="AccountIndex"
                        className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                        value={data?.AccountIndex}
                        onChange={(e) => setData('AccountIndex', e.target.value)}
                    >
                        <option>Select New Account </option>
                        {
                            accountTypes?.map((a, index) => !!a && <option value={a.account_index} key={index}>
                                {a.account_name}
                            </option>)
                        }

                    </select>
                </div>

                <div className="mt-6 flex justify-end">
                    {value && <span className='text-success pr-4'> Update Success </span>}

                    {errMessage && <span className='text-red-500 pr-4'> {errMessage} </span>}

                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" >
                        Submit
                    </PrimaryButton>
                </div>

            </form>
        </Modal>
    )
}
