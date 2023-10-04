import OnlineUsersTable from './OnlineUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Alert from '../../Components/DaisyUI/Alert'
import React, { useState, useEffect } from 'react'
import '../../../css/paginate.css'
import OnlineUsersSearch from './OnlineUsersSearch';
import Loading from '@/Components/DaisyUI/Loading';
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';

export default function OnlineUsers ({ auth, apitoken, affiliates })
{
  const [onlineUsersData, setOnlineUsersData] = useState({ users: [], errMessage: '', loading: true })
  const { users, errMessage, loading } = onlineUsersData
  const [filterObj, setFilterObj] = useState({})
  const [pagingData, setPagingData] = useState({ pageSize: 10, currentData: null })

  console.log('current-items: ' + pagingData?.currentData?.length)

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


  // useEffect(renderTable =>
  // {
  //   return <OnlineUsersTable users={ pagingData.currentData } />
  // }, [pagingData])

  // const renderTable = () =>
  // {
  //   return <OnlineUsersTable users={ pagingData.currentData } />
  // }

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
          filterObj={ filterObj }

        /> }

      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
              { !errMessage && !loading &&
                <PaginatedItems
                  itemsPerPage={ pagingData.pageSize }
                  items={ users }
                  pagingData={ pagingData }
                  setPagingData={ setPagingData }
                >

                  <OnlineUsersTable users={ pagingData.currentData } />
                  {/* { renderTable() } */ }
                </PaginatedItems>

              }
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
