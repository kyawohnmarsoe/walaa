import React, { useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PaginatedLinks from '@/Components/PaginatedLinks';
import WalletTable from './WalletTable'
import WalletSearch from './WalletSearch'
import PrimaryButton from '@/Components/PrimaryButton';
import TransferModal from './TransferModal'

export default function Wallets ({ auth, wallets, users })
{
   
    // console.log(wallets);
    // console.log(users);
    const [modals, setModals] = useState({
        transfer: false,
        // editExpense:false,
    })
    const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10 })

    return (
        <AuthenticatedLayout
            user={ auth.user }
            header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Wallets</h2> }
        >
            <Head title="Wallets" />

            <TransferModal modals={ modals } setModals={ setModals } auth={ auth } users={ users } wallets={ wallets } />


            {/* { loading && <Loading className="mt-12 " /> }
            { errMessage && <Alert className="mt-12" msg={ errMessage } /> } */}

            {/* { !errMessage && !loading &&
                <ErrorLogSearch
                    className='p-4'
                    affiliates={ affiliates }
                    setFilterObj={ setFilterObj }
                    filterObj={ filterObj }

                /> } */}

            <WalletSearch
                className='p-4'
                setFilterObj={ setFilterObj }
                filterObj={ filterObj }
                auth={ auth }
                users={ users }
            />



            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">

                            <div className='flex items-center justify-end gap-4 p-2'>
                                <PrimaryButton className="bg-sky-800" onClick={ () => setModals({ ...modals, transfer: true }) }>
                                    <span > Wallet Transfer</span>
                                </PrimaryButton>
                            </div>


                            <hr />

                            <PaginatedLinks
                                itemsPerPage={ filterObj.RowCount }
                                items={ wallets }
                                tableName="wallets"
                                setFilterObj={ setFilterObj }
                                filterObj={ filterObj }
                                auth={ auth }
                                users={ users }
                            />



                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
