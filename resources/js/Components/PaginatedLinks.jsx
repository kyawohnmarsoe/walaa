import ReactPaginate from 'react-paginate';
import React, { useState, useEffect } from 'react'
import '../../css/paginate.css'
import AccountsTable from '@/Pages/Accounts/AccountsTable';
import CustomerTable from '@/Pages/Customers/CustomerTable';
import AffiliatesTable from '@/Pages/Affiliates/AffiliatesTable';


export default function PaginatedLinks({ itemsPerPage, items, tableName, apitoken }) {
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
                tableName == 'account' && <AccountsTable accounts={currentItems} />
            }

            {
                tableName == 'customer' && <CustomerTable customers={currentItems} />
            }

            {
                tableName == 'affiliate' && <AffiliatesTable affiliates={currentItems} apitoken={apitoken} />
            }
        </>
    );
}