import React, { useState } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
// import EditWalletModal from "./EditWalletModal";
import { useEffect } from "react";

export default function WalletTableRow ({ item, auth, users, user, modals, setModals })
{

    const getFromWallet = (id) =>
    {
        const user = users.filter(u => u.id == id)

        console.log(user)
        return user[0].name;
    }

    const getToWallet = (id) =>
    {
        const user = users.filter(u => u.id == id)

        console.log(user)
        return user[0].name;
    }

    useEffect(() =>
    {
        console.log(item.fromWallet);
    }, [])

    return (
        <>
            {/* <TransferModal modals={ modals } setModals={ setModals } auth={ auth } users={ users } user={ user } wallet={ item } /> */}

            <tr >
                {/* <td>{ user.name }</td> */}
                <td>{ item?.type }</td>

                <td> { item.fromWallet && getFromWallet(item.fromWallet) }</td>


                <td> { item.toWallet && getToWallet(item.toWallet) }</td>
               
                <td>{ item?.description }</td>
                {/* <td>{ item?.amount }</td> */}
                <td>{ (auth.user.id == item.fromWallet) ? item?.amount*-1 : item?.amount }</td>
                {/* <td>{ item?.balance }</td> */}
               
                <td>{ new Date(item?.created_at).toLocaleDateString('en-US') }</td>
                {/* <td><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => setModals({ editWallet: true }) } >Edit</button></td> */}
            </tr>
        </>
    )
}
