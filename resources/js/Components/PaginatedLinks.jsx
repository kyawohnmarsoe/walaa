import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react'
import '../../css/paginate.css'
import AccountsTable from '@/Pages/Accounts/AccountsTable';
import CustomerTable from '@/Pages/Customers/CustomerTable';
import AffiliatesTable from '@/Pages/Affiliates/AffiliatesTable';
import TicketTable from '@/Pages/Tickets/TicketsTable';
import DevTicketTable from '@/Pages/Devtickets/TicketsTable';
import SystemusersTable from '@/Pages/Systemusers/SystemusersTable';
import UsergroupTable from '@/Pages/Usergroup/UsergroupTable';
import TestUsageTable from '@/Pages/Reports/Stats/TestUsage/TestUsageTable';
import TotalItemsCount from '@/Components/DaisyUI/TotalItemsCount'
import PageSize from '@/Components/DaisyUI/PageSize'
import ExpenseTable from '@/Pages/Expenses/ExpenseTable';
import InvoiceTable from '@/Pages/Invoices/InvoiceTable';
import WalletTable from '@/Pages/Wallets/WalletTable';
import BalanceTransferTable from '@/Pages/Reports/Deposit/BalanceTransferTable';
import TicketissuesTable from '@/Pages/Ticketissues/TicketissuesTable';
import PaymentTable from '@/Pages/Payments/PaymentTable';
import AffiliatesPaymentsTable from '@/Pages/Affiliates/AffiliatesPaymentsTable';
import TowersTable from '@/Pages/Towers/TowersTable';
import DevicesTable from '@/Pages/Devices/DevicesTable';
import PortsTable from '@/Pages/Ports/PortsTable';

export default function PaginatedLinks({
    auth,
    affiliates,
    itemsPerPage,
    items,
    sub_accounts,
    accounts,
    users,
    remarks,
    user_has_groups,
    user_groups,
    towers,
    issues,
    tableName,
    apitoken,
    totalCount,
    listname,
    filterObj,
    setFilterObj,
    deposit_password,
}) {
    const [itemOffset, setItemOffset] = useState(0);

    // console.log(items)

    let pageSize = +itemsPerPage

    const endOffset = itemOffset + (pageSize);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / pageSize);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * pageSize) % items.length;

        setItemOffset(newOffset);
        console.log(typeof (pageSize))

    };


    return (
        <>
            <div className='pagination-wrapper'>
                <TotalItemsCount total={items.length} />

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=" >>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />

                <PageSize
                    className="pagination"
                    setFilterObj={setFilterObj}
                    filterObj={filterObj}
                />
            </div>

            {
                tableName == 'account' && <AccountsTable accounts={currentItems} listname={listname} />
            }

            {
                tableName == 'customer' &&
                <CustomerTable customers={currentItems} accounts={accounts} sub_accounts={sub_accounts}
                    sys_users={users} user_groups={user_groups} towers={towers} apitoken={apitoken}
                    totalCount={totalCount} deposit_password={deposit_password} auth={auth}
                />
            }

            {
                tableName == 'affiliate' &&
                <AffiliatesTable affiliates={currentItems} apitoken={apitoken} />
            }

            {
                tableName == 'ticket' &&
                <TicketTable tickets={currentItems} users={users} user_groups={user_groups}
                    remarks={remarks} issues={issues}
                />
            }

            {
                tableName == 'devticket' &&
                <DevTicketTable tickets={currentItems} users={users} user_groups={user_groups}
                    remarks={remarks} issues={issues}
                />
            }

            {
                tableName == 'systemuser' &&
                <SystemusersTable systemusers={currentItems} user_has_groups={user_has_groups} />
            }

            {
                tableName == 'ticketissue' &&
                <TicketissuesTable issues={currentItems} />
            }

            {
                tableName == 'tower' &&
                <TowersTable towers={currentItems} />
            }
            {
                tableName == 'device' &&
                <DevicesTable devices={currentItems} />
            }
            {
                tableName == 'port' &&
                <PortsTable ports={currentItems} />
            }

            {
                tableName == 'usergroup' && <UsergroupTable usergroups={currentItems} />
            }

            {
                tableName == 'testUsage' && <TestUsageTable items={currentItems} />
            }

            {
                tableName == 'invoices' && <InvoiceTable items={currentItems} auth={auth} />

            }

            {
                tableName == 'expenses' && <ExpenseTable items={currentItems} auth={auth} users={users} />

            }

            {
                tableName == 'wallets' && <WalletTable items={currentItems} auth={auth} users={users} />

            }

            {
                tableName == 'balance_transfer' && <BalanceTransferTable items={currentItems} auth={auth} users={users} affiliates={affiliates} />

            }

            {
                tableName == 'payments' && <PaymentTable items={currentItems} />


            }

            {
                tableName == 'affiliates_payments' && <AffiliatesPaymentsTable items={currentItems} />
            }

           

        </>
    );
}