import React from "react";
import InputLabel from "../InputLabel";

export default function PageSize ({ className, pagingData, setPagingData })
{
    const onChangeHandler = (e) =>
    {
        setPagingData({ ...pagingData, pageSize: e.target.value })
    }

    // useEffect(() =>
    // {
    //     setPagingData({ ...pagingData, pageSize: e.target.value })

    // }, [itemOffset])
    return (
        <div className="pagination-wrapper">
            <InputLabel htmlFor="sessionType" value="Page Size" /> :
            <select className={ className }
                value={ pagingData.pageSize }
                onChange={ (e) => onChangeHandler(e) }
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}
