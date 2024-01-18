import React from 'react';
import { Head } from '@inertiajs/react';


function Invoice ({ invoice })
{
    console.log(invoice)
    return (
        <div >
            <Head title="Invoice" />
            {/* Height  Should be 300 px */}
            <div className="bg-white p-3 max-w-xxl mx-auto  rounded-md" style={ { maxWidth: '850px' }
            }>
              
                <div>
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                       
                        <tbody style={ { border: '2px dotted gray', }}>
                            <tr>
                                <td colSpan={ 6 } >
                                    <img src="/img/logo.png" alt="Logo" style={ { minWidth: '80%',height:'70px', textAlign:'center', margin:'auto' } } />
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
                                <td colSpan={ 6 } style={ { textAlign: 'center', margin: 'auto' } } className='font-semibold text-sm'>
                                    نستقبل مكالماتكم يوميا خلال اوقات العمل من الساعة ال ١٠ صباحا الى الساعة ال ١٢ مساءا كل ايام الاسبوع
                                <br/>
                                    زين العراق 07800000181 اسياسيل 07700003552 - 07700003662 كورك 07500088111
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
