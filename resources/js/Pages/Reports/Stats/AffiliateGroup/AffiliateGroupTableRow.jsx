import React from "react";

export default function AffiliateGroupTableRow ({ item, index })
{

    return (
        <tr>
            <td>{ index + 1 }</td>
            <td>{ item?.affiliateName }</td>
            <td>{ item?.affiliateHierarchy }</td>
            <td>{ item?.depositBalance }</td>
            <td>{ item?.testsCredit }</td>
            <td>{ item?.activeUsers }</td>
            <td>{ item?.online }</td>
            <td>{ item?.offline }</td>
        </tr>
    )
}
