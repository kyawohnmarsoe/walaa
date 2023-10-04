import React from "react";
import { useEffect, useState } from "react";

export default function CustomerTable({ customers }) {
    const [loading, setLoading] = useState(false);

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
        <div className="overflow-x-auto mt-3">

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Index</th>
                        <th>Name</th>
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
