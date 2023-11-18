import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react'
import '../../css/paginate.css'
import AccountsTable from '@/Pages/Accounts/AccountsTable';
import CustomerTable from '@/Pages/Customers/CustomerTable';
import AffiliatesTable from '@/Pages/Affiliates/AffiliatesTable';
import TicketTable from '@/Pages/Tickets/TicketsTable';
import TestUsageTable from '@/Pages/Reports/Stats/TestUsage/TestUsageTable';
import TotalItemsCount from '@/Components/DaisyUI/TotalItemsCount'
import PageSize from '@/Components/DaisyUI/PageSize'
import PaymentTable from '@/Pages/Payments/PaymentTable';


export default function PaginatedLinks({
    itemsPerPage,
    items,
    sub_accounts,
    accounts,
    users,
    remarks,
    tableName,
    apitoken,
    listname,
    filterObj,
    setFilterObj }) {
    const [itemOffset, setItemOffset] = useState(0);

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
            {
                // pageCount > 1 &&
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
            }

            {
                tableName == 'account' && <AccountsTable accounts={currentItems} listname={listname} />
            }

            {
                tableName == 'customer' && <CustomerTable customers={currentItems} accounts={accounts} sub_accounts={sub_accounts} apitoken={apitoken} />
            }

            {
                tableName == 'affiliate' && <AffiliatesTable affiliates={currentItems} apitoken={apitoken} />
            }

            {
                tableName == 'ticket' && <TicketTable tickets={currentItems} users={users} remarks={remarks} />
            }

            {
                tableName == 'testUsage' && <TestUsageTable items={currentItems} />
            }

            {
                tableName == 'payments' && <PaymentTable items={currentItems} />
            }

        </>
    );
}