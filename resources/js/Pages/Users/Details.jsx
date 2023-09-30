import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React,{useEffect,useState} from 'react'
import UserStatus from './Partials/UserStatus';
import AccessDetails from './Partials/AccessDetails';
import CustomerInformation from './Partials/CustomerInformation';
import Security from './Partials/Security';
import AccountingInformation from './Partials/AccountingInformation';
import Alert from '../../Components/DaisyUI/Alert';

export default function Details({ auth,apitoken,id }) {
     const [userData,setUserData] = useState({user:null,errMessage:'',loading:true})
    const {user,errMessage,loading} = userData

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
        });

    useEffect(()=>{
       instance.get(`/user/${id}`)
        .then(res => {
            setUserData({user:res.data.value,errMessage:'',loading:false}) 
            console.log('response'+res.data.value)
        })
        .catch(err => {
          setUserData({user:null,errMessage:err.message,loading:false})
          console.log('error'+err)
        })
    },[])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Details</h2>}
        >
            <Head title="Details" />

           
          <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            {
            loading && <div className='text-center'><span className="loading loading-spinner loading-lg"></span></div>
          }

          {
            errMessage && <Alert msg={errMessage} css='alert alert-error'/>
          }

          {
            (user===null)&& !loading && <Alert msg='Something Went Wrong' css='alert alert-error'/>
          }

           { user && (<div>
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg mb-4">
                            <AccessDetails
                                user={user}
                                className="max-w-none"/>
                        </div>

                        <div className='grid md:grid-cols-2 gap-4'>
                                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <UserStatus  
                                    user={user}
                                    className="max-w-xl" />
                            </div>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <Security 
                                    user={user}
                                    className="max-w-xl" />
                            </div>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <CustomerInformation  
                                    user={user}
                                    className="max-w-xl" />
                            </div>
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <AccountingInformation  
                                    user={user}
                                    className="max-w-xl" />
                            </div>
                        </div>
                </div>)
                }
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
