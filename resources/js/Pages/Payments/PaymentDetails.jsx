import React from 'react';

function PaymentDetails ({ payment })
{
    console.log(payment)
    return (
        <div className="bg-white p-8 max-w-md mx-auto shadow-md rounded-md">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Invoice</h1>
                <p className="text-gray-500">Invoice #123456</p>
            </div>
            <div className="mt-8">
                <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-600">From</div>
                    <address>
                        Your Company Name<br />
                        123 Main Street<br />
                        City, State, ZIP<br />
                        Phone: (123) 456-7890<br />
                        Email: youremail@example.com
                    </address>
                </div>
                <div>
                    <div className="text-sm font-semibold text-gray-600">Bill To</div>
                    <address>
                        Client Name<br />
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
                            <th className="py-2 px-4 border">Item</th>
                            <th className="py-2 px-4 border">Description</th>
                            <th className="py-2 px-4 border">Quantity</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border">Item 1</td>
                            <td className="py-2 px-4 border">Description of Item 1</td>
                            <td className="py-2 px-4 border">2</td>
                            <td className="py-2 px-4 border">$50.00</td>
                            <td className="py-2 px-4 border">$100.00</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border">Item 2</td>
                            <td className="py-2 px-4 border">Description of Item 2</td>
                            <td className="py-2 px-4 border">3</td>
                            <td className="py-2 px-4 border">$75.00</td>
                            <td className="py-2 px-4 border">$225.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <div className="text-right">
                    <p className="text-gray-600">Subtotal: $325.00</p>
                    <p className="text-gray-600">Tax (10%): $32.50</p>
                    <p className="text-gray-600">Total: $357.50</p>
                </div>
            </div>
            <div className="mt-8">
                <p className="text-gray-600">Payment Information:</p>
                <p className="text-gray-600">Bank: Your Bank</p>
                <p className="text-gray-600">Account Number: 1234567890</p>
                <p className="text-gray-600">SWIFT/BIC: XXXXXXXX</p>
            </div>
        </div>
    );
}

export default PaymentDetails;
