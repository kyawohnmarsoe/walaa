import React, { useState } from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import EditExpenseModal from "./EditExpenseModal";
import { useEffect } from "react";

export default function ExpenseTableRow ({ item, auth,users,user })
{

    const [modals, setModals] = useState({
        editExpense: false
    })

    // const getUser = () =>
    // {
    //     const user = users.filter(u => u.id == item.walletUserId)

    //     console.log(user)
    //     return user;
    // }

    useEffect(()=>{
        console.log(user)
    },[])

    return (
        <>
            <EditExpenseModal modals={ modals } setModals={ setModals } auth={ auth } users={ users } user={ user } expense={ item }/>

            <tr >
                <td>{ user.name }</td>
                 <td>{ item?.type }</td>
                <td>{ item?.description }</td>
                <td>{ item?.amount }</td>
                <td>{ item?.submittedBy }</td>
                <td>{ new Date(item?.created_at).toLocaleDateString('en-US') }</td>
                <td><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => setModals({ editExpense: true }) } >Edit</button></td>
             </tr>
        </>
    )
}
