import React from "react";
import { useEffect, useState } from "react";

export default function AffiliatesTable({ affiliates, apitoken }) {
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()

        // get deposit balance
        const instance = axios.create({
            baseURL: 'https://rapi.earthlink.iq/api/reseller/affiliate/deposit/balance',
            headers: { 'Authorization': `Bearer ${apitoken}` }
        });
        let passData = {
            TargetAffiliateIndex: "11111",
            Amount: "1",
            DepositPassword: "Elink3"
        }
        instance.get('', passData).then(res => {
            if (res) {
                console.log(res.data)
            }

        }).catch(err => {
            if (err) {
                console.log(err.message)
            }
        })
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
        <div className="overflow-x-auto mt-3">

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>Affiliate Index</th>
                        <th>Affiliate Name</th>
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
                            </tr>
                        ))}
                    </tbody>
                }

            </table>

        </div >
    )
}
