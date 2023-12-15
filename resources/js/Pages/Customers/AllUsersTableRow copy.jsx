import React, { useState, useEffect } from "react";
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';


export default function AllUsersTableRow ({ user, accountTypes, apitoken, })
{
  let { flash } = usePage().props
  // const [flash, setFlash] = useState(usePage().props)

  const { data, setData, post, processing, errors, reset } = useForm({
    UserId: user?.userID,
    DepositPassword: '',
    AccountId: user?.accountName,
    Status: 'Not Paid',
    PaymentDueDate: '',
    Notes: '',
  })


  const [filterObj, setFilterObj] = useState({ UserId: user.userID, AccountIndex: '' })
  const [updateInfo, setUpdateInfo] = useState({ value: '', errMessage: '' })
  const { value, errMessage } = updateInfo

  const getButton = (type) =>
  {
    const str = user?.accountStatus.toLowerCase()
    const position = str.indexOf(type);
    if (position !== -1)
    {
      return true
    } else { return false }
  }

  const accChangeHandler = (e) =>
  {
    e.preventDefault();
    setFilterObj({ ...filterObj, AccountIndex: e.target.value })
    // console.log(data)
    // console.log(filterObj)
  }

  const instance = axios.create({
    baseURL: 'https://rapi.earthlink.iq/api/reseller',
    headers: { 'Authorization': `Bearer ${ apitoken }` }
  });

  const changeAcc = (e) =>
  {
    e.preventDefault();
    // console.log(data)
    // console.log(filterObj)

    instance.post('/user/chnageaccounttype', filterObj)
      .then(res =>
      {
        // console.log(res.data.value)

        res.data.value ? setUpdateInfo({ errMessage: '', value: res.data.value }) :
          setUpdateInfo({ errMessage: res?.data?.error?.message || 'Can not change account type for this user!', value: '' })
        // location.reload()

      })
      .catch(err =>
      {
        setUpdateInfo({ errMessage: err.message, value: '' })
      })


  }

  const reFill = (e) =>
  {

    // console.log(data)
    e.preventDefault();
    instance.post('/user/newrefilldeposit', { ...data, DepositPassword: +data?.DepositPassword })
      .then(res =>
      {
        !res.data.value ?
          setUpdateInfo({ errMessage: res.data.error.message, value: '' }) :
          setUpdateInfo({ errMessage: '', value: res.data.value })

        // !res.data.value && console.log('store data')
        // !res.data.value && post(route('payments.store', data));

      })
      .catch(err =>
      {
        // console.log(err)
        setUpdateInfo({ errMessage: err.message, value: '' })
      })



  }

  const submit = (e) =>
  {
    e.preventDefault();
    alert('submit')
    // patch(route('profile.update'));
  };

  const [modals, setModals] = useState({
    reFill: false,
    change: false,
    accPasswordShow: false,
    accPasswordChange: false,
  })

  const closeModal = () =>
  {
    setModals({
      reFill: false,
      change: false,
      accPasswordShow: false,
      accPasswordChange: false,
    });

    setUpdateInfo({ errMessage: '', value: '' })

    setData({
      ...data,
      DepositPassword: '',
      AccountId: '',
      Status: '',
      PaymentDueDate: '',
      Notes: '',
    })

    // flash.status = '';

    flash.status == 201 && location.reload()

  };

  return (
    <>
      <Modal show={ modals.reFill } onClose={ closeModal } maxWidth={ 'xl' }>
        <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
          <h2 className="text-lg font-medium text-gray-900">
            Refill Deposit
          </h2>

          <p className="mt-1 text-sm text-red-600">
            { }
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="UserId" value="UserId :" />

            <TextInput
              id="UserId"
              className="mt-1 block w-full  bg-gray-100"
              value={ data?.UserId }
              readOnly={ true }
              autoComplete="off"
            />

          </div>

          <div className="mt-6">
            <InputLabel htmlFor="DepositPassword" value="Deposit Password :" />

            <TextInput
              id="DepositPassword"
              className="mt-1 block w-full  "
              value={ data?.DepositPassword }
              // type='number'
              onChange={ (e) => setData('DepositPassword', e.target.value) }
              autoComplete="off"
            />
            <InputError className="mt-2" message={ errors.DepositPassword } />

          </div>

          {
            // !!+user?.activeDaysLeft &&
            <div className="mt-6">
              <InputLabel htmlFor="AccountId" value="Account Type:" />
              <select
                name="AccountId"
                id="AccountId"
                className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
                value={ data?.AccountId }
                onChange={ (e) => setData('AccountId', e.target.value) }
              >
                <option value='00'>Select Account Type</option>
                {
                  accountTypes?.map((a, index) => !!a && <option value={ a.account_index } key={ index }>
                    { a.account_name }
                  </option>)
                }

              </select>
              <InputError className="mt-2" message={ errors.AccountId } />

            </div>
          }

          <div className="mt-6">
            <InputLabel htmlFor="Status" value="Invoice Type:" />
            <select
              name="Status"
              id="Status"
              className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
              value={ data?.Status }
              onChange={ (e) => setData('Status', e.target.value) }
            >
              <option value='Not Paid'>Not Paid</option>
              <option value='Paid'> Paid</option>

            </select>
            <InputError className="mt-2" message={ errors.Status } />

          </div>

          <div className="mt-6">
            <InputLabel htmlFor="PaymentDueDate" value="Payment Due Date :" />

            <TextInput
              id="PaymentDueDate"
              className="mt-1 block w-full  "
              value={ data?.PaymentDueDate }
              // readOnly={ true }
              onChange={ (e) => setData('PaymentDueDate', e.target.value) }
            />
            <InputError className="mt-2" message={ errors.PaymentDueDate } />

          </div>

          <div className="mt-6">
            <InputLabel htmlFor="Notes" value="Notes :" />

            <TextInput
              id="Notes"
              className="mt-1 block w-full  "
              value={ data?.Notes }
              onChange={ (e) => setData('Notes', e.target.value) }
            />

          </div>



          <div className="mt-6 flex justify-end">
            { value && <span className='text-success pr-4'> Refill Success </span> }

            { errMessage && <span className='text-red-500 pr-4'> { errMessage } </span> }
            { flash.status == 201 &&
              <span className='text-success pr-4'> Refill Success </span>
            }
            <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

            <PrimaryButton className="ml-3" onClick={ reFill }>
              Submit
            </PrimaryButton>
          </div>

        </form>
      </Modal>

      <tr>
        {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}

        <td>{ user?.userIndex }</td>
        <td>

          <button className="btn btn-xs btn-outline btn-block btn-info mb-1" onClick={ () => setModals({ ...modals, reFill: true }) }>Refill</button> <br />

          { getButton('suspended') || getButton('SuspendedByAgent') ? <><button className="btn btn-xs btn-outline btn-block btn-success mb-1" onClick={ () => setModals({ ...modals, change: true }) }>Change</button> <br /> </> : '' }

          { getButton('expiringsoon') && <><button className="btn btn-xs btn-outline btn-block btn-warning">Extend</button> </> }

          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */ }
        </td>

        <td>
          <div className="flex items-center space-x-3">
            {/* <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div> */}
            <div>
              <div className="font-bold text-sky-700"><Link href={ `/user/${ user?.userIndex }` }>{ user?.userID }</Link></div>

              <div> <strong>Affiliate </strong><span className="text-sm opacity-50"> : { user?.affiliateName }</span></div>
            </div>
          </div>
        </td>

        <td> { user?.displayName }</td>

        <td>
          <strong>Last Refill</strong> : { user?.lastRefill }
          <br />
          <strong>Payment</strong> : { !!user?.unPaidInvoices ? <span style={ { color: user?.serviceStatusColorHex } }>{ user?.unPaidInvoices } Unpaid</span> : <span className="text-emerald-700">All Paid</span> }
          <br />
          <strong>Notes</strong> : { user?.lastRefill }

          {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */ }
        </td>

        {/* <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th> */}

        <td>{ user?.manualExpirationDate }</td>

        <td>
          <strong>Acc Name</strong> : { user?.accountName }
          <br />
          <strong>Acc Status</strong> : { user?.accountStatus }
          <br />
          <strong>Days Left</strong> : { +user?.activeDaysLeft }
        </td>

        <td>
          {/* <strong>Status</strong> : { user?.onlineStatus && <span style={ { color: user?.onlineStatusColor } }>{ user?.onlineStatus }</span> } */ }
          <strong>Status</strong> : <span style={ { color: user?.onlineStatusColor } }>{ user?.onlineStatus }</span>
          <br />
          <strong>MAC</strong> : { user?.callerID }
          <br />
          <strong>IP</strong> : <a href={ `https://${ user?.userIP }` } className="text-sky-700" target="_blank">{ user?.userIP }</a>
          <br />
          <strong>Lock MAC</strong> : { +user?.lockMac }
        </td>

        <td>
          <strong>Mobile</strong> : { user?.mobileNumber }
          <br />
          <strong>Mobile 2</strong> : { user?.mobileNumber2 }
          <br />
          <strong>User Notes</strong> : { user?.userNotes }
          <br />
          <strong>Router IP</strong> : { user?.router }
        </td>

      </tr>

      <Modal show={ modals.change } onClose={ closeModal } maxWidth={ 'xl' }>
        <form onSubmit={ submit } className="p-6 scroll-form" autoComplete="off">
          <h2 className="text-lg font-medium text-gray-900">
            Change User's Accont Type
          </h2>

          <p className="mt-1 text-sm ">
            You are about to change the account of this user: <span className="font-bold text-sky-700">{ user?.userID }</span>
          </p>

          <div className="mt-6">
            <InputLabel htmlFor="AccountIndex" value="Account Type:" />
            <select
              name="AccountIndex"
              id="AccountIndex"
              className='mt-1 block w-full border-gray-300 focus:border-sky-500 focus:ring-sky-500 rounded-md shadow-sm '
              value={ data?.AccountIndex }
              onChange={ accChangeHandler }
            >
              <option>Select New Account </option>
              {
                accountTypes?.map((a, index) => !!a && <option value={ a.account_index } key={ index }>
                  { a.account_name }
                </option>)
              }

            </select>
          </div>

          <div className="mt-6 flex justify-end">
            { value && <span className='text-success pr-4'> Update Success </span> }

            { errMessage && <span className='text-red-500 pr-4'> { errMessage } </span> }

            <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

            <PrimaryButton className="ml-3" onClick={ changeAcc }>
              Submit
            </PrimaryButton>
          </div>

        </form>
      </Modal>
    </>
  )
}
