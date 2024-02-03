import React from "react";

export default function PaymentTable ({ items }) {
  return (
      <div className="overflow-x-auto">
          {/* <Pagination /> */ }
          <table className="table">
              {/* head */ }
              <thead>
                  <tr className='bg-emerald-300'>
                    
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Previous Balance </th>
                      <th>Paid Amount</th>
                      <th>Current Balance</th>
                      <th>Notes</th>
                      <th>Modify User</th>

                  </tr>
              </thead>

              <tbody>
                  {
                      !!items?.length ? items.map((item, index) => <tr key={ index }>
                          <td> { item.display_name }</td>
                          <td> { item.mobile_number }</td>
                          <td> { item.prev_balance }</td>
                          <td> { item.paid_amount }</td>
                          <td> { item.current_balance }</td>
                          <td> { item.notes }</td>
                          <td> { item.modify_user }</td>
                        </tr>)
                          : <tr><td className='text-error'>No item Found!</td></tr>
                  }
              </tbody>



          </table>
      </div>
  )
}
