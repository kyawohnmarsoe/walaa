import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import PaymentSearch from "./PaymentSearch";
import PaymentForm from "./PaymentForm"
import { useState } from "react";

export default function Payments ({ customers, auth }) {
    const[customer,setCustomer]=useState({})
  return (
      <AuthenticatedLayout
          user={ auth.user }
          header={ <h2 className="font-semibold text-xl text-gray-800 leading-tight">Payments</h2> }
      >
          <Head title="Payments" />
          <PaymentSearch
              className='p-4'
              customers={ customers }
          />

          <PaymentForm
              className='p-4'
              customers={ customers }
          />
      </AuthenticatedLayout>
  )
}
