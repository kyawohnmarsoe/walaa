import React from "react";
import { useEffect, useState } from "react";
import { router, Link } from '@inertiajs/react';
import Modal from '@/Components/DaisyUI/Modal';
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';
import RefillModal from "./RefillModal";


export default function CustomerTable ({ customers, accounts, sub_accounts, user_groups, apitoken, modals,
    setModals,
    deposit_password, auth}) {
    const [loading, setLoading] = useState(false);

    function editLocalCusClick(index) {
        router.get(`/customers/${index}`);
    }

    function disableCustomer(e) {
        document.getElementById('deleteModal').close()
        e.preventDefault()
        let customerUserIndex = document.getElementById('customer_user_index').value
        // console.log(customerUserIndex);        
        router.delete(`/customers/${customerUserIndex}`);
    }

    const callModal = (cus) => {
        document.getElementById('email').textContent = ` ${cus.email}`
        document.getElementById('customer_user_index').value = `${cus.customer_user_index}`
        document.getElementById('deleteModal').showModal()
        document.getElementById(`tr_${cus.customer_user_index}`).classList.toggle('bg-gray-300');
    }
    const onCloseModal = () => {
        let customerUserIndex = document.getElementById('customer_user_index').value
        document.getElementById('tr_' + customerUserIndex).classList.toggle('bg-gray-300');
    };

    useEffect(() => {
        // console.log(sub_accounts);
    }, [])

    const [modalUser,setModalUser] = useState(null)

    const modalData = (name,user) =>{
        setModals({ ...modals, [name]: true })
        setModalUser(user)
        // console.log(modalUser)
    }

    return (
        <div className="overflow-x-auto mt-3">
            {
                !!modalUser && <RefillModal modals={ modals } setModals={ setModals } accountTypes={ accounts } apitoken={ apitoken } user={ modalUser } deposit_password={ deposit_password } auth={ auth } />
                 
            }

            <Modal id="deleteModal" title="Disable Customer Confirmation" closeModal={onCloseModal}>
                <form onSubmit={disableCustomer} className="space-y-6 ">
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="pt-4">
                            Are you sure disable -
                            <span className="font-bold text-sky-700" id="email"></span>?
                        </div>
                    </div>
                    <TextInput id="customer_user_index" name="customer_user_index" type="hidden" />
                    <div className="flex items-center gap-4">
                        {<PrimaryButton disabled="" type="submit" >Disable</PrimaryButton>}
                    </div>
                </form>
            </Modal>

            <table className="table">
                <thead>
                    <tr className='bg-emerald-300'>
                        {/* <th>User Index</th> */}
                        <th>Actions</th>

                        <th>Email</th>
                        <th>Display Name</th>
                        <th>Mobile Number</th>
                        <th>Affiliate Name</th>
                        <th>Main Account Info</th>
                        <th>Sub Account Type</th>
                        <th>User Group</th>
                        <th>Active/Disable</th>
                        <th >Actions</th>
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
                            <tr key={cus.id} id={"tr_" + (cus.customer_user_index)}>
                                {/* <RefillModal modals={ modals } setModals={ setModals } accountTypes={ accounts } apitoken={ apitoken } user={ cus } deposit_password={ deposit_password } auth={ auth } /> */}

                               <td> 
                                    {/* { user?.canRefill && <><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => setModals({ ...modals, reFill: true }) }>Refill</button><br /></> } */}
                                    { <><button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => modalData('reFill', cus) }>Refill</button><br /></> }

                                    {/* { user?.canChangeAccount && <><button className="btn btn-xs btn-outline btn-block btn-success mb-1" onClick={ () => setModals({ ...modals, change: true }) }>Change</button> <br /> </> } */}

                                    {/* { user?.canExtendUser && <><button className="btn btn-xs btn-outline btn-block btn-warning" onClick={ extendHandler }>Extend</button> </> } */}

                               </td>
                                <td className="font-bold text-sky-700" ><Link href={ `/user/${ cus?.customer_user_index }` }>{cus.email}</Link></td>
                                <td>{cus.display_name}</td>
                                <td>
                                    <strong>Mobile 1</strong> : {cus.mobile_number}
                                    <br />
                                    <strong>Mobile 2</strong> : {cus.mobile_number2}
                                </td>
                                <td>{cus.affiliate_name}</td>
                                <td>
                                    <strong>Main Acc Name</strong> : {cus.account_name}
                                    <br />
                                    <strong>Acc Status</strong> : {cus.account_status}
                                    <br />
                                    <strong>Acc Pkg Type</strong> : {cus.account_package_type}
                                </td>
                                <td>
                                    {
                                        sub_accounts.filter(subacc => subacc.id == cus.sub_account_id)
                                            .map(filteredRes => (
                                                filteredRes.account_name
                                            ))
                                    }
                                </td>
                                <td>
                                    {
                                        user_groups.filter(user_gp => user_gp.id == cus.user_group_id)
                                            .map(filteredRes => (
                                                filteredRes.group_name
                                            ))
                                    }
                                </td>
                                <td className={cus.active_status == 1 ? 'text-emerald-500' : 'text-red-500'}>
                                    {cus.active_status == 1 ? 'Active' : 'Disable'}
                                </td>
                                <td>
                                    <PrimaryButton style={ { width: "75px" } } className="bg-sky-800 mb-1" padding_x='px-2' disabled='' onClick={() => editLocalCusClick(cus.customer_user_index)}>
                                        <svg className="h-4 w-4 text-white mr-1 " viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                                        Edit
                                    </PrimaryButton>
                                    <DangerButton padding_x='px-2' disabled='' onClick={ () => callModal(cus) } style={ { width: "75px" } }>
                                        Disable
                                    </DangerButton>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                }

            </table>
        </div >
    )
}
