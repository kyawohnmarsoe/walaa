import React from "react";
import { useEffect, useState } from "react";

export default function TicketTable({ tickets }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(tickets);

    }, [])

    return (
        <div className="overflow-x-auto mt-3">

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>User</th>
                        <th>Ticket Number</th>
                        <th>Ticket Source</th>
                        <th>Topic</th>
                        <th>Address</th>
                        <th>Level of Importance</th>
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
                        {tickets && tickets.map(dt => (
                            <tr key={dt.id}>
                                <td>{dt.user_id}</td>
                                <td>{dt.ticket_number}</td>
                                <td>
                                    {dt.ticket_source}
                                </td>
                                <td>{dt.topic}</td>
                                <td>{dt.ticket_address}</td>
                                <td>{dt.level_of_importance}</td>
                            </tr>
                        ))}



                    </tbody>
                }

            </table>
        </div>
    )
}
