import PageSize from '@/Components/DaisyUI/PageSize';
import ReactPaginate from 'react-paginate';
import OnlineUsersTable from '@/Pages/Users/OnlineUsersTable';
import { useEffect, useState } from 'react';

export default function PaginatedItems ({ itemsPerPage, items, setItemsPerPage, setCurrentItems, children })
{
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${ itemOffset } to ${ endOffset }`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) =>
    {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${ event.selected }, which is offset ${ newOffset }`
        );
        setItemOffset(newOffset);

    };

    useEffect(() =>
    {
        setCurrentItems(currentItems);
    }, [itemsPerPage])

    return (
        <>
            <div className='pagination-wrapper'>
                <PageSize
                    className="pagination"
                    setItemsPerPage={ setItemsPerPage }
                    itemsPerPage={ itemsPerPage }
                />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={ handlePageClick }
                    pageRangeDisplayed={ 5 }
                    pageCount={ pageCount }
                    previousLabel="< previous"
                    renderOnZeroPageCount={ null }
                    className="pagination"
                />
            </div>
            {/* <OnlineUsersTable users={ currentItems } /> */ }
            { children }
        </>
    );
}

