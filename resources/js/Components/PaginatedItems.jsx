import ReactPaginate from 'react-paginate';
import React, { useState } from 'react'
import '../../css/paginate.css'
import AffiliatesTable from '@/Pages/Affiliates/AffiliatesTable';
import AccountsTable from '@/Pages/Accounts/AccountsTable';
import CustomerTable from '@/Pages/Customers/CustomerTable';

export default function PaginatedItems({ itemsPerPage, items, tableName }) {
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

            {
                tableName == 'affiliate' && <AffiliatesTable affiliates={currentItems} />
            }

            {
                tableName == 'account' && <AccountsTable accounts={currentItems} />
            }

            {
                tableName == 'customer' && <CustomerTable customers={currentItems} />
            }
        </>
    );
}