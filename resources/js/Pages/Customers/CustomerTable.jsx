import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react'

export default function CustomerTable({ customers }) {
    const [loading, setLoading] = useState(false);

    const addApiClick = () => {
        router.get('/customers/create')
    }

    const onDeleteClick = cus => {
        if (!window.confirm("Are you sure you want to delete this data?")) {
            return
        }
        console.log(cus.id);
    }

    useEffect(() => {
        console.log(customers);

    }, [])

    return (
        <div className="overflow-x-auto">

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-6"
                onClick={ev => addApiClick()}
            >
                Add user
            </button>

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Customer Index</th>
                        <th>Customer Name</th>
                        <th>Action</th>
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
                                <td>{cus.id}</td>
                                <td>{cus.first_name}</td>
                                <td>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={ev => onDeleteClick(cus)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
