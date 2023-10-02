import AllUsersTable from './AllUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import Alert from '../../Components/DaisyUI/Alert'
import React, { useState, useEffect } from 'react'
import '../../../css/paginate.css'


function PaginatedItems({ itemsPerPage,items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
   
  };

  return (
    <>
     
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      
      />
   
      
       <AllUsersTable users={currentItems} />
      
    </>
  );
}

export default function Management({ auth, apitoken }) {

const [onlineUsersData, setOnlineUsersData] = useState({ users: [], errMessage: '', loading: true })
  const { users, errMessage, loading } = onlineUsersData

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${apitoken}` }
  });

    useEffect(()=>{
       instance.post('/user/all',{params: { OrderBy: 'Online Status'}})
        .then(res => {
            setOnlineUsersData({users:res.data.value.itemsList,errMessage:'',loading:false}) 
            // console.log(res.data.value.itemsList[0].customer.customerFullName)
            console.log(res.data.value.itemsList[0])
        })
        .catch(err => {
          setOnlineUsersData({users:[],errMessage:err.message,loading:false})
          console.log(err)
        })
    },[])

           
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2>}
        >
            <Head title="User Management" />

            <div className="py-12 ">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                   {
                                loading && <div className='text-center'><span className="loading loading-spinner loading-lg"></span></div>
                            }
                             {
                                errMessage && <tr className='text-error'><td>{errMessage}</td></tr>
                            }
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="text-gray-900">
                            
                             {
                                !!users.length && <PaginatedItems itemsPerPage={4} items={users} />

                            } 
                           
                           
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
