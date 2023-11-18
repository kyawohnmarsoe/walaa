import React from "react";
import { useEffect, useState } from "react";
import { Link } from '@inertiajs/react';
import RefillModal from "./RefillModal";
import ChangeModal from "./ChangeModal";

export default function CustomerTable({ customers, accounts, sub_accounts, apitoken }) {
    const [loading, setLoading] = useState(false);

    const [modals, setModals] = useState({
        reFill: false,
        change: false,
        extend: false,
    })

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
                        <th>Actions</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Accounting Info</th>
                        <th>Expiration Date</th>
                        <th>Account Info</th>
                        <th>Online Status</th>
                        <th>Others</th>
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
                            <>
                                <RefillModal modals={modals} setModals={setModals} accountTypes={accounts} apitoken={apitoken} user={cus} />
                                <ChangeModal modals={modals} setModals={setModals} accountTypes={accounts} apitoken={apitoken} user={cus} />

                                <tr key={cus.id}>
                                    <td>{cus.customer_user_index}</td>
                                    <td>
                                        {cus.can_refill &&
                                            <>
                                                <button className="btn btn-xs btn-outline btn-block btn-info mb-1"
                                                    onClick={() => setModals({ ...modals, reFill: true })}>
                                                    Refill
                                                </button><br />
                                            </>
                                        }
                                        {cus.can_change_account &&
                                            <>
                                                <button className="btn btn-xs btn-outline btn-block btn-success mb-1"
                                                    onClick={() => setModals({ ...modals, change: true })}>
                                                    Change
                                                </button> <br />
                                            </>
                                        }
                                        {cus.can_extend_user &&
                                            <>
                                                <button className="btn btn-xs btn-outline btn-block btn-warning">
                                                    Extend
                                                </button>
                                            </>
                                        }
                                    </td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold text-sky-700">
                                                    <Link href={`/user/${cus.user_index}`}>{cus.email}</Link>
                                                </div>

                                                <div>
                                                    <strong>Affiliate </strong>
                                                    <span className="text-sm opacity-50"> : {cus.affiliate_name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{cus.display_name}</td>
                                    <td>
                                        <strong>Last Refill</strong> : {cus.last_refill}
                                        <br />
                                        <strong>Payment</strong> :
                                        {!!cus.unpaid_invoices ?
                                            <span style={{ color: cus.service_status_color_hex }}>
                                                {cus.unpaid_invoices} Unpaid
                                            </span>
                                            : <span className="text-emerald-700">All Paid</span>
                                        }
                                        <br />
                                        <strong>Notes</strong> : {cus.last_refill}
                                    </td>
                                    <td>{cus.manual_expiration_date}</td>
                                    <td>
                                        <strong>Acc Name</strong> : {cus.account_name}
                                        <br />
                                        <strong>Acc Status</strong> : {cus.account_status}
                                        <br />
                                        <strong>Days Left</strong> : {+cus.active_days_left}
                                        <br />
                                        <strong>Acc Pkg Type</strong> : {cus.account_package_type}
                                    </td>
                                    <td>
                                        <strong>Status</strong> : <span style={{ color: cus.online_status_color }}>{cus.status}</span>
                                        <br />
                                        <strong>MAC</strong> : {cus.caller_id}
                                        <br />
                                        <strong>IP</strong> : <a href={`http://${cus.user_ip}`} className="text-sky-700" target="_blank">{cus.user_ip}</a>
                                        <br />
                                        <strong>Lock MAC</strong> : {+cus.lock_mac}
                                    </td>
                                    <td>
                                        <strong>Mobile</strong> : {cus.mobile_number}
                                        <br />
                                        <strong>Mobile 2</strong> : {cus.mobile_number2}
                                        <br />
                                        <strong>User Notes</strong> : {cus.customer_user_notes}
                                        <br />
                                        <strong>Router IP</strong> : {cus.router}
                                    </td>
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
                            </>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
