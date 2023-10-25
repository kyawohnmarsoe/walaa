import React, { useCallback, useEffect, useMemo, useState, useReducer } from "react";
import AffiliateGroupTableRow from './AffiliateGroupTableRow'
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';


export default function AffiliateGroupTable ({ items })
{
    const [currentItems, setCurrentItems] = useState([...items])

    const fieldNames = ['affiliateName', 'affiliateHierarchy', 'depositBalance', 'testsCredit', 'activeUsers', 'online', 'offline']

    const { data, setData } = useForm({
        affiliateName: '',
        affiliateHierarchy: '',
        depositBalance: '',
        testsCredit: '',
        activeUsers: '',
        online: '',
        offline: ''
    })

    const searchHandler = () =>
    {
        let result = [...items]

        if (!data.affiliateName && !data.affiliateHierarchy && !data.depositBalance && !data.testsCredit && !data.activeUsers && !data.online && !data.offline)
        {
            result = [...items]
        }

        if (!!data.affiliateName)
        {
            result = result.filter(r => r.affiliateName == data.affiliateName)
        }

        if (!!data.affiliateHierarchy)
        {
            result = result.filter(r => r.affiliateHierarchy == data.affiliateHierarchy)
        }

        if (!!data.depositBalance)
        {
            result = result.filter(r => r.depositBalance == data.depositBalance)
        }

        if (!!data.testsCredit)
        {
            result = result.filter(r => r.testsCredit == data.testsCredit)
        }

        if (!!data.activeUsers)
        {
            result = result.filter(r => r.activeUsers == data.activeUsers)
        }

        if (!!data.online)
        {
            result = result.filter(r => r.online == data.online)
        }

        if (!!data.offline)
        {
            result = result.filter(r => r.offline == data.offline)
        }

        console.log(result)
        setCurrentItems([...result])

    }

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
                            <TextInput
                                id="affiliateName"
                                className="mt-1 block w-full "
                                value={ data.affiliateName }
                                onChange={ (e) => setData('affiliateName', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="affiliateHierarchy"
                                className="mt-1 block w-full "
                                value={ data.affiliateHierarchy }
                                onChange={ (e) => setData('affiliateHierarchy', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="depositBalance"
                                className="mt-1 block w-full "
                                value={ data.depositBalance }
                                onChange={ (e) => setData('depositBalance', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="testsCredit"
                                className="mt-1 block w-full "
                                value={ data.testsCredit }
                                onChange={ (e) => setData('testsCredit', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="activeUsers"
                                className="mt-1 block w-full "
                                value={ data.activeUsers }
                                onChange={ (e) => setData('activeUsers', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="online"
                                className="mt-1 block w-full "
                                value={ data.online }
                                onChange={ (e) => setData('online', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>

                        <th>
                            <TextInput
                                id="offline"
                                className="mt-1 block w-full "
                                value={ data.offline }
                                onChange={ (e) => setData('offline', e.target.value) }
                                onBlur={ searchHandler }
                            />
                        </th>


                    </tr>

                </thead>

                <tbody>
                    {
                        !!currentItems?.length ? currentItems.map((item, index) => <AffiliateGroupTableRow item={ item } key={ index } index={ index } />)
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
