import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function AccountTable({ api_token }) {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAccounts = (url) => {
        setLoading(true)

        let instance = axios.create({
            baseURL: 'https://rapi.earthlink.iq/api/reseller/accounts/all',
            headers: { 'Authorization': `Bearer ${api_token}` }
        });

        instance.get('/')
            .then(res => {
                setLoading(false)
                setAccounts(res.data.value)
                console.log(res.data.value)
            })
            .catch(err => {
                setLoading(false)
                console.log(err.message)
            })
    }

    useEffect(() => {
        getAccounts();
    }, [])

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Account Index</th>
                        <th>Account Name</th>
                        <th>Description</th>
                        <th>Account Price</th>
                        <th>End User Account Price</th>
                        <th>Image</th>
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
                        {accounts.map(acc => (
                            <tr key={acc.accountIndex}>
                                <td>{acc.accountIndex}</td>
                                <td>{acc.accountName}</td>
                                <td style={{ whiteSpace: "pre-line" }}>
                                    {acc.accountDescription}
                                </td>
                                <td>{acc.accountPrice}</td>
                                <td>{acc.endUserAccountPrice}</td>
                                <td>
                                    {
                                        acc.accountImagePath ?
                                            <img
                                                src={acc.accountImagePath}
                                                width={60}
                                                alt='Image'
                                            />
                                            :
                                            ''
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }



            </table>
        </div>
    )
}
