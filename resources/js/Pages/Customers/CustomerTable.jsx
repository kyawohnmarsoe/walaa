import React from "react";
import { useEffect, useState } from "react";

export default function CustomerTable({ customers, sub_accounts }) {
    const [loading, setLoading] = useState(false);

    const onDeleteClick = cus => {
        if (!window.confirm("Are you sure you want to delete this data?")) {
            return
        }
        console.log(cus.id);
    }

    useEffect(() => {
        console.log(sub_accounts);

    }, [])

    return (
        <div className="overflow-x-auto mt-3">

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>User Index</th>
                        <th>Name</th>
                        <th>Display Name</th>
                        <th>Email</th>
                        <th>User Status</th>
                        <th>Affiliate Name</th>
                        <th>Account Name</th>
                        <th>Account Status</th>
                        <th>Account Package Type</th>
                        <th>Sub Account Name</th>
                        {/* <th>Action</th> */}
                    </tr>
                </thead>

                {loading &&
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center">
                                Loading...
                            </td>
                        </tr>
                    </tbody>
                }
                {!loading &&
                    <tbody>
                        {customers && customers.map(cus => (
                            <tr key={cus.id}>
                                <td>{cus.customer_user_index}</td>
                                <td>{cus.first_name} {cus.last_name}</td>
                                <td>{cus.display_name}</td>
                                <td>{cus.email}</td>
                                <td>
                                    {
                                        cus.status == 'Offline' ?
                                            <span className="text-red-600">{cus.status}</span>
                                            :
                                            <span className="text-lime-600">{cus.status}</span>
                                    }
                                </td>
                                <td>{cus.affiliate_name}</td>
                                <td>{cus.account_name}</td>
                                <td>{cus.account_status}</td>
                                <td>{cus.account_package_type}</td>
                                <td>
                                    {
                                        sub_accounts.filter(subacc => subacc.id == cus.sub_account_id)
                                            .map(filteredRes => (
                                                filteredRes.account_name
                                            ))
                                    }
                                </td>

                                {/* <td>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={ev => onDeleteClick(cus)}>
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
