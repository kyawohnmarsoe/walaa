import React, { useCallback, useEffect, useMemo, useState, useReducer } from "react";
import TestUsageTableRow from './TestUsageTableRow'
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';


export default function TestUsageTable ({ items })
{

    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#Index</th>
                        <th>Affiliate Name</th>
                        <th>Test Count</th>
                        <th>Last Date Used</th>
                        <th>User Id</th>

                    </tr>


                </thead>

                <tbody>
                    {
                        !!items?.length ? items.map((item, index) => <TestUsageTableRow item={ item } key={ index } index={ index } />)
                            : <tr><td className='text-error'>No Items Found!</td></tr>
                    }
                </tbody>



            </table>
        </div>
    )
}
