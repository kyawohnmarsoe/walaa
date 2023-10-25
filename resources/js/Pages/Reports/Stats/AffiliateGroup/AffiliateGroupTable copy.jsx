import React, { useCallback, useEffect, useMemo, useState, useReducer } from "react";
import AffiliateGroupTableRow from './AffiliateGroupTableRow'
import { useForm } from '@inertiajs/react';



export default function AffiliateGroupTable ({ items })
{
    const { data, setData } = useForm({
        affiliateName: '',
        affiliateHierarchy: '',
        depositBalance: '',
        testsCredit: '',
        activeUsers: '',
        online: '',
        offline: ''
    })

    const reducer = (state, action) =>
    {
        switch (action.type)
        {
            case 'affiliateName':
                return { test: state.test.filter(t => t.affiliateName == data.affiliateName) };
            case 'depositBalance':
                return { test: state.test.filter(t => t.depositBalance == data.depositBalance) };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, { test: [...items] });


    // const searchHandler = (searchField) =>
    // {

    //     console.log('searchHandler working...')
    //     let result;

    //     console.log(!!data[searchField])

    //     if (!!data[searchField])
    //     {
    //         result = currentItems.filter(current => current[searchField] == data[searchField])
    //         setCurrentItems(result)
    //         console.log('true state')
    //         console.log(prevItems)
    //     } else
    //     {
    //         setCurrentItems([...prevItems])
    //         console.log('false state')
    //         console.log(prevItems)
    //     }

    // }


    return (
        <div className="overflow-x-auto">
            {/* <Pagination /> */ }
            <table className="table">
                {/* head */ }
                <thead>
                    <tr className='bg-emerald-300'>
                        <th>#Index</th>
                        <th>Affiliate Name</th>
                        <th>Affiliate Hierarchy</th>
                        <th>Deposit Balance</th>
                        <th>Tests Credit</th>
                        <th>Active Users</th>
                        <th>Online</th>
                        <th>Offline</th>

                    </tr>

                    <tr >

                        <th>#Search</th>
                        <th>

                            <input type="text"
                                id='affiliateName'
                                onChange={ (e) => setData('affiliateName', e.target.value) }
                                onBlur={ (e) => e.target.value && dispatch({ type: 'affiliateName' }) }

                            />

                        </th>

                        <th>

                            <input type="text"
                                id='depositBalance'
                                onChange={ (e) => setData('depositBalance', e.target.value) }
                                onBlur={ (e) => e.target.value && dispatch({ type: 'depositBalance' }) }

                            />

                        </th>
                        <th>{ state?.test?.length }</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        !!state?.test?.length ? state?.test.map((item, index) => <AffiliateGroupTableRow item={ item } key={ index } index={ index } />)
                            : <tr><td className='text-error'>No Items Found!</td></tr>
                    }
                </tbody>

                {/* foot */ }
                <tfoot>
                    <tr>

                    </tr>
                </tfoot>

            </table>
        </div>
    )
}
