import AllUsersTable from './AllUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import Alert from '../../Components/DaisyUI/Alert'
import React, { useState, useEffect } from 'react'
import '../../../css/paginate.css'
import Loading from '@/Components/DaisyUI/Loading';
import UserManagementSearch from './UserManagementSearch';

function PaginatedItems ({ itemsPerPage, items })
{
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${ itemOffset } to ${ endOffset }`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) =>
  {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${ event.selected }, which is offset ${ newOffset }`
    );
    setItemOffset(newOffset);

  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={ handlePageClick }
        pageRangeDisplayed={ 5 }
        pageCount={ pageCount }
        previousLabel="< previous"
        renderOnZeroPageCount={ null }
        className="pagination"
      />

      <AllUsersTable users={ currentItems } />
    </>
  );
}

export default function Management ({ auth, apitoken, affiliates, accountTypes })
{

  const [onlineUsersData, setOnlineUsersData] = useState({ users: [], errMessage: '', loading: true })
  const { users, errMessage, loading } = onlineUsersData
  const [filterObj, setFilterObj] = useState({})

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${ apitoken }` }
  });

  useEffect(() =>
  {
    instance.post('/user/all', {
      ...filterObj,
      // CallerId: '64:D1:54:23:A3:AA',
      OrderBy: 'Account Name'
    })
      .then(res =>
      {
        setOnlineUsersData({ users: res.data.value.itemsList, errMessage: '', loading: false })
        // setOnlineUsersData({ users: [], errMessage: '', loading: false })
        console.log(res.data.value.itemsList)
      })
      .catch(err =>
      {
        setOnlineUsersData({ users: [], errMessage: err.message, loading: false })
        console.log(err)
      })
  }, [filterObj])


  return (
    <AuthenticatedLayout
      user={ auth.user }
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">User Management</h2> }
    >
      <Head title="User Management" />

      { loading && <Loading className="mt-12 " /> }
      { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

      { !errMessage && !loading && <UserManagementSearch className='p-4' affiliates={ affiliates } accountTypes={ accountTypes } setFilterObj={ setFilterObj } /> }

      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm ">
            <div className="text-gray-900">

              { !errMessage && !loading && <PaginatedItems itemsPerPage={ 4 } items={ users } /> }

            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
