import React from "react";
import InputLabel from "../InputLabel";

export default function PageSize ({ className, filterObj, setFilterObj })
{
    const onChangeHandler = (e) =>
    {
        setFilterObj({ ...filterObj, RowCount: e.target.value })
    }

    return (
        <div className="pagination-wrapper">
            <InputLabel htmlFor="sessionType" value="Page Size" /> :
            <select className={ className }
                value={ filterObj.RowCount }
                onChange={ (e) => onChangeHandler(e) }
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}
