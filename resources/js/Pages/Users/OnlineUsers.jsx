import OnlineUsersTable from './OnlineUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ReactPaginate from 'react-paginate';
import Alert from '../../Components/DaisyUI/Alert'
import React, { useState, useEffect } from 'react'
import '../../../css/paginate.css'
import OnlineUsersSearch from './OnlineUsersSearch';
import Loading from '@/Components/DaisyUI/Loading';
import PageSize from '@/Components/DaisyUI/PageSize';
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';

// function PaginatedItems ({ itemsPerPage, items, setItemsPerPage })
// {
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   // Simulate fetching items from another resources.
//   // (This could be items from props; or items loaded in a local state
//   // from an API endpoint with useEffect and useState)
//   const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${ itemOffset } to ${ endOffset }`);
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) =>
//   {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${ event.selected }, which is offset ${ newOffset }`
//     );
//     setItemOffset(newOffset);

//   };

//   return (
//     <>
//       <div className='pagination-wrapper'>
//         <PageSize className="pagination" setItemsPerPage={ setItemsPerPage } itemsPerPage={ itemsPerPage } />
//         <ReactPaginate
//           breakLabel="..."
//           nextLabel="next >"
//           onPageChange={ handlePageClick }
//           pageRangeDisplayed={ 5 }
//           pageCount={ pageCount }
//           previousLabel="< previous"
//           renderOnZeroPageCount={ null }
//           className="pagination"
//         />
//       </div>
//       <OnlineUsersTable users={ currentItems } />
//     </>
//   );
// }

export default function OnlineUsers ({ auth, apitoken, affiliates })
{
  const [onlineUsersData, setOnlineUsersData] = useState({ users: [], errMessage: '', loading: true })
  const { users, errMessage, loading } = onlineUsersData
  const [filterObj, setFilterObj] = useState({})
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState(null);

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${ apitoken }` }
  });

  useEffect(() =>
  {
    instance.post('/activesessions', { ...filterObj, Orderby: 'OnlineTime' })
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
      header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Users</h2> }
    >
      <Head title="Online Users" />

      { loading && <Loading className="mt-12 " /> }
      { errMessage && <Alert className="mt-12" msg={ errMessage } /> }

      { !errMessage && !loading &&
        <OnlineUsersSearch
          className='p-4'
          affiliates={ affiliates }
          setFilterObj={ setFilterObj }

        /> }

      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
              { !errMessage && !loading &&
                <PaginatedItems
                  itemsPerPage={ itemsPerPage }
                  items={ users }
                  setItemsPerPage={ setItemsPerPage }
                  setCurrentItems={ setCurrentItems }
                >
                  <OnlineUsersTable users={ currentItems } />

                </PaginatedItems>

              }
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
