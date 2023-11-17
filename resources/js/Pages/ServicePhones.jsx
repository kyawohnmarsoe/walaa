import React, { useEffect, useState } from "react";

export default function ServicePhones({ apitoken }) {
    const [phones, setPhones] = useState(null)

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
    });

    useEffect(() => {
        instance.get('/support/phones')
            .then(res => {
                setPhones(res.data)
                console.log(res.data)
            })
            .catch(err => { console.log(err.message) })
    }, [])

    console.log(phones)

    return (
        <>
            {phones && <div className="pt-12 px-3 ">
                <h2 className="text-lg font-medium text-gray-800 pb-4">Service phones:</h2>
                <table>
                    <tbody>
                        {
                            phones?.map((p, index) => <tr key={index}>
                                <td>{p.providerName} </td>
                                <td> : {p.number}</td>
                            </tr>)
                        }
                    </tbody>
                </table></div>}
        </>
    )
}
