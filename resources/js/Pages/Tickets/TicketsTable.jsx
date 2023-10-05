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
                        <th>Ticket Number</th>
                        <th>Topic</th>
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
                                <td>{dt.ticket_number}</td>
                                <td>{dt.topic}</td>
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div>
    )
}
