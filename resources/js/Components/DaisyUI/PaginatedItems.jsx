import PageSize from '@/Components/DaisyUI/PageSize';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import TotalItemsCount from './TotalItemsCount';

export default function PaginatedItems({ type = 'Users', itemsPerPage, items, total, children, filterObj, setFilterObj }) {

    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${ itemOffset } to ${ endOffset }`);
    const currentItems = items.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(items.length / itemsPerPage);
    const pageCount = Math.ceil(total / itemsPerPage);


    const handlePageClick = (event) => {
        // const newOffset = (event.selected * itemsPerPage) % items.length;

        const newOffset = (event.selected * itemsPerPage) % total;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        console.log(filterObj)
    };

    useEffect(() => {
        setFilterObj({ ...filterObj, StartIndex: itemOffset, RowCount: itemsPerPage })
    }, [itemOffset, itemsPerPage])

    return (
        <>
            <div className='pagination-wrapper'>
                <TotalItemsCount total={total} type={type} />

                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
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

            {children}
        </>
    );
}

