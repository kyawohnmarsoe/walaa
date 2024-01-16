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
               
                <div className="mt-8">
                    <table className="w-full border-collapse border border-gray-300">
                       
                        <tbody style={ { border: '2px dotted gray', }}>
                            <tr>
                                <td colSpan={6}>
                                    <img src="/img/logo.png" alt="Logo" style={ { minWidth: '95%',height:'100px', textAlign:'center', margin:'auto' } } />
                                </td>
                            </tr>
                           
                            <tr>
                                <td className="py-2 px-4 border font-semibold"> Invoice No.</td>
                                <td className="py-2 px-4 border"> { invoice?.invoinceID }</td>
                                
                                <td className="py-2 px-4 border font-semibold">Date</td>
                                <td className="py-2 px-4 border">{ invoice?.recordDate ? invoice?.recordDate : new Date(invoice?.created_at).toLocaleDateString('en-US') } </td>
                            </tr>

                            <tr>
                                <td className="py-2 px-4 border font-semibold"> User Name</td>
                                <td className="py-2 px-4 border"> { invoice?.userID }</td>
                               
                                <td className="py-2 px-4 border font-semibold">Display Name</td>
                                <td className="py-2 px-4 border">{ invoice?.displayName} </td>
                            </tr>

                            <tr>
                                <td className="py-2 px-4 border font-semibold"> Password</td>
                                <td className="py-2 px-4 border"> </td>
                                
                                <td className="py-2 px-4 border font-semibold">Account Type</td>
                                <td className="py-2 px-4 border">{ invoice?.accountName } </td>
                            </tr>

                            <tr>
                                <td className="py-2 px-4 border font-semibold"> Expiration</td>
                                <td className="py-2 px-4 border">{ invoice?.invoiceDuration }</td>
                               
                                <td className="py-2 px-4 border font-semibold">Price</td>
                                <td className="py-2 px-4 border">{ invoice?.salePrice } </td>
                            </tr>
                            <tr>
                                <td colSpan={ 6 } style={ { textAlign: 'center', margin: 'auto' } }>
                                    sdf
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>
               
            </div >
        </div>
    );
}

export default Invoice;
