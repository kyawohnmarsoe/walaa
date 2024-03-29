import OnlineUsersTable from './OnlineUsersTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Alert from '../../Components/DaisyUI/Alert'
import React, { useState, useEffect } from 'react'
import OnlineUsersSearch from './OnlineUsersSearch';
import Loading from '@/Components/DaisyUI/Loading';
import PaginatedItems from '@/Components/DaisyUI/PaginatedItems';
import axios from 'axios';

export default function OnlineUsers({ auth, apitoken, affiliates, userIndexByGroup }) {
  const [onlineUsersData, setOnlineUsersData] = useState({ users: [], total: 0, errMessage: '', loading: true })
  const { users, total, errMessage, loading } = onlineUsersData
  const [filterObj, setFilterObj] = useState({ StartIndex: 0, RowCount: 10, Orderby: 'userId' })

  // const instance = axios.create({
  //   baseURL: 'https://rapi.earthlink.iq/api/reseller',
  //   headers: { 'Authorization': `Bearer ${apitoken}` }
  // });

  const filterUsersByGroup = (resUsers) => {
    const results = resUsers.filter(r => userIndexByGroup.find(u => u.customer_user_index == r.userIndex))
    return results;
  }

  useEffect(() => {

    // instance.post('/activesessions', filterObj)
    //   .then(res => {
    //     if (res?.data?.value?.itemsList?.length > 0 && userIndexByGroup !== 'all') {
    //       const results = filterUsersByGroup(res?.data?.value?.itemsList)
    //       // console.log(results)
    //       // setOnlineUsersData({ users: results, total: results.length, errMessage: '', loading: false })
    //       setOnlineUsersData({ users: res?.data?.value?.itemsList, total: res?.data?.value?.totalCount, errMessage: '', loading: false })
    //     } else {
    //       setOnlineUsersData({ users: res?.data?.value?.itemsList, total: res?.data?.value?.totalCount, errMessage: '', loading: false })
    //     }
    //   })
    //   .catch(err => {
    //     setOnlineUsersData({ users: [], total: 0, errMessage: err?.message, loading: false })
    //     // console.log(err)
    //   })

    axios.post('/users/online', filterObj)
      .then(res => {
        // console.log(res)
        if (res?.data?.value?.itemsList?.length > 0 && userIndexByGroup !== 'all') {
          const results = filterUsersByGroup(res?.data?.value?.itemsList)
          setOnlineUsersData({ users: res?.data?.value?.itemsList, total: res?.data?.value?.totalCount, errMessage: '', loading: false })
        } else {
          setOnlineUsersData({ users: res?.data?.value?.itemsList, total: res?.data?.value?.totalCount, errMessage: '', loading: false })
        }
      })
      .catch(err => {
        setOnlineUsersData({ users: [], total: 0, errMessage: err?.message, loading: false })
      })


  }, [filterObj])



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Online Users</h2>}
    >
      <Head title="Online Users" />

      {loading && <Loading className="mt-12 " />}
      {errMessage && <Alert className="mt-12" msg={errMessage} />}

      {!errMessage && !loading &&
        <OnlineUsersSearch
          className='p-4'
          affiliates={affiliates}
          setFilterObj={setFilterObj}
          filterObj={filterObj}

        />}

      <div className="py-12 ">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
              {!errMessage && !loading &&
                <PaginatedItems
                  itemsPerPage={filterObj.RowCount}
                  items={users}
                  total={total}
                  setFilterObj={setFilterObj}
                  filterObj={filterObj}
                >

                  <OnlineUsersTable users={users} apitoken={apitoken} />

                </PaginatedItems>

              }
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
