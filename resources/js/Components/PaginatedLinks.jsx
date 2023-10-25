import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react'
import '../../css/paginate.css'
import AccountsTable from '@/Pages/Accounts/AccountsTable';
import CustomerTable from '@/Pages/Customers/CustomerTable';
import AffiliatesTable from '@/Pages/Affiliates/AffiliatesTable';
import TicketTable from '@/Pages/Tickets/TicketsTable';


export default function PaginatedLinks({ itemsPerPage, items, tableName, apitoken, listname, sub_accounts }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;

        setItemOffset(newOffset);

    };

    return (
        <>
            {
                pageCount > 1 &&
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            }

            {
                tableName == 'account' && <AccountsTable accounts={currentItems} listname={listname} />
            }

            {
                tableName == 'customer' && <CustomerTable customers={currentItems} sub_accounts={sub_accounts} />
            }

            {
                tableName == 'affiliate' && <AffiliatesTable affiliates={currentItems} apitoken={apitoken} />
            }

            {
                tableName == 'ticket' && <TicketTable tickets={currentItems} />
            }
        </>
    );
}