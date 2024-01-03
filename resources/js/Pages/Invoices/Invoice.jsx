import React from 'react';
import { Head } from '@inertiajs/react';


function Invoice ({ invoice })
{
    console.log(invoice)
    return (
        <div className="py-12 ">
            <Head title="Invoice" />

            <div className="bg-white p-8 max-w-xxl mx-auto  rounded-md" style={ { maxWidth: '900px' }
            }>
                <div className='flex justify-end'>
                    <button onClick={ () => window.print() } style={ { border: '1px solid gray', padding: '0px 5px' } }>Print</button>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Invoice #{ invoice.invoinceID }</h1>
                    <p className="text-gray-500">Date : { invoice.recordDate }</p>
                </div>
                <div className="mt-8 " style={ { display: 'flex', justifyContent: 'space-between' } }>
                    <div className="mb-4">
                        <div className="text-sm font-semibold text-gray-600">From</div>
                        <address>
                            WalaaLink<br />
                            123 Main Street<br />
                            City, State, ZIP<br />
                            Phone: (123) 456-7890<br />
                            Email: youremail@example.com
                        </address>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-600">Bill To</div>
                        <address>
                            { invoice.displayName }<br />
                            456 Client Street<br />
                            City, State, ZIP<br />
                            Phone: (789) 123-4567<br />
                            Email: clientemail@example.com
                        </address>
                    </div>
                </div>
                <div className="mt-8">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">#</th>
                                <th className="py-2 px-4 border">Account Type</th>
                                <th className="py-2 px-4 border">Description</th>
                                <th className="py-2 px-4 border">Affiliate</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border"> 1</td>
                                <td className="py-2 px-4 border"> { invoice?.accountName }</td>
                                <td className="py-2 px-4 border">{ invoice?.invoiceDescription }</td>
                                <td className="py-2 px-4 border">{ invoice?.affiliateName }</td>
                                <td className="py-2 px-4 border">{ invoice?.salePrice }</td>
                                <td className="py-2 px-4 border">{ invoice?.salePrice }</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <div className="text-right">
                        <p className="text-gray-600">Subtotal: { invoice?.salePrice }</p>
                        <p className="text-gray-600">Tax (0%): 0.00</p>
                        <p className="text-gray-600">Total: { invoice?.salePrice }</p>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-gray-600">Due Date: { invoice?.paymentDueDate }</p>
                    <p className="text-gray-600">Reference: { invoice?.referenceRecord }</p>
                    <p className="text-gray-600">Invocice Type: { invoice?.invoiceType }</p>
                    <p className="text-gray-600">Invoice Status: { invoice?.invoiceStatus }</p>
                </div>
            </div >
        </div>
    );
}

export default Invoice;
