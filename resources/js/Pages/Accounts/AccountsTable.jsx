import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react'

export default function AccountsTable({ accounts }) {
    const [loading, setLoading] = useState(false);

    const addApiClick = () => {
        router.get('/accounts/store')
    }

    useEffect(() => {
        console.log(accounts);
    }, [])

    return (
        <div className="overflow-x-auto">

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-6"
                onClick={ev => addApiClick()}
            >
                Add Account Api Data
            </button>

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Account Index</th>
                        <th>Account Name</th>
                        <th>Description</th>
                        <th>Account Price</th>
                        <th>End User Account Price</th>
                        {/* <th>Image</th> */}
                    </tr>
                </thead>

                {loading &&
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                }

                {!loading &&
                    <tbody>
                        {accounts && accounts.map(acc => (
                            <tr key={acc.account_index}>
                                <td>{acc.account_index}</td>
                                <td>{acc.account_name}</td>
                                <td style={{ whiteSpace: "pre-line" }}>
                                    {acc.account_description}
                                </td>
                                <td>{acc.account_price}</td>
                                <td>{acc.end_user_account_price}</td>
                                {/* <td>
                                    {
                                        acc.account_image_path ?
                                            <img
                                                src={acc.account_image_path}
                                                width={60}
                                                alt='Image'
                                            />
                                            :
                                            ''
                                    }
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
