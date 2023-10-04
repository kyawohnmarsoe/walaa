import React from "react";
import InputLabel from "../InputLabel";

export default function PageSize ({ className, itemsPerPage, setItemsPerPage })
{
    return (
        <div className="pagination-wrapper">
            <InputLabel htmlFor="sessionType" value="Page Size" /> :
            <select className={ className }
                value={ itemsPerPage }
                onChange={ (e) => setItemsPerPage(e.target.value) }
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}
