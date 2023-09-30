import React from "react";
import { useEffect, useState } from "react";
import { router } from '@inertiajs/react'

export default function AffiliatesTable({ affiliates }) {
    const [loading, setLoading] = useState(false);

    const addApiClick = () => {
        router.get('/affiliates/store')
    }

    const onDeleteClick = aff => {
        if (!window.confirm("Are you sure you want to delete this data?")) {
            return
        }
        console.log(aff.id);
    }

    useEffect(() => {
        console.log(affiliates);

    }, [])

    return (
        <div className="overflow-x-auto">

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-6"
                onClick={ev => addApiClick()}
            >
                Add Affiliate Api Data
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Affiliate Index</th>
                        <th>Affiliate Name</th>
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
                        {affiliates && affiliates.map(aff => (
                            <tr key={aff.affiliate_index}>
                                <td>{aff.affiliate_index}</td>
                                <td>{aff.affiliate_name}</td>
                                <td>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={ev => onDeleteClick(aff)}>
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
