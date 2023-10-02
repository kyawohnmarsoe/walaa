import OnlineUsersTableRow from './OnlineUsersTableRow'

export default function OnlineUsersTable ({ users })
{

  return (
    <div className="overflow-x-auto">
      {/* <Pagination /> */ }
      <table className="table">
        {/* head */ }
        <thead>
          <tr className='bg-emerald-300'>
            <th>#</th>
            {/* <th>User Index</th> */ }
            <th>Username</th>
            <th>Online Status</th>
            <th>Online Time</th>
            <th>Online Since</th>
            <th>MAC Address</th>
            <th>Expiration Date</th>
            <th>UserIP</th>
            <th>Login From</th>
            <th>Login Affiliate</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            !!users?.length ? users.map(user => <OnlineUsersTableRow user={ user } key={ user.userIndex } />)
              : <tr><td className='text-error'>No User Found!</td></tr>
          }
        </tbody>

        {/* foot */ }
        <tfoot>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Online Status</th>
            <th>Online Time</th>
            <th>Online Since</th>
            <th>MAC Address</th>
            <th>Expiration Date</th>
            <th>UserIP</th>
            <th>Login From</th>
            <th>Login Affiliate</th>
            <th>Action</th>
          </tr>
        </tfoot>

      </table>
    </div>
  )
}
