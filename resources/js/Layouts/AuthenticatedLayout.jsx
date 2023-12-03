import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import '../../css/paginate.css'

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { url } = usePage()

    const { roles, permissions } = usePage().props.user

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className=" mx-auto px-1 ">
                    {/* max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 */}
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>

                                {/* Users  */}
                                <div className="sm:flex sm:items-center">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Users

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="https://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>

                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content align={'left'}>
                                                <Dropdown.Link href={route('users.online')}>Online Users</Dropdown.Link>
                                                <Dropdown.Link href={route('users.management')}> Manage Users</Dropdown.Link >
                                                <Dropdown.Link href={route('customers.create')}> Create New User</Dropdown.Link >
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                {/* Reports  */}
                                <div className="sm:flex sm:items-center">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Reports

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="https://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>

                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content align={'left'}>
                                                <Dropdown.Link href={route('usersessions')}>User Sessions</Dropdown.Link>
                                                <Dropdown.Link href={route('prepaid.needed')}>Prepaid Needed</Dropdown.Link >
                                                {/* <Dropdown.Link href={ route('deposit.statement') }>Account Statement</Dropdown.Link > */}
                                                <Dropdown.Link href={route('deposit.transfer')}>Balance Transfer</Dropdown.Link >
                                                <Dropdown.Link href={route('payments')}>Payment</Dropdown.Link >
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                {/* Statistics  */}
                                <div className="sm:flex sm:items-center">
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        Statistics

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="https://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>

                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content align={'left'}>
                                                <Dropdown.Link href={route('affiliate.group')}>Affiliate Group Report</Dropdown.Link>
                                                <Dropdown.Link href={route('test.usage')}>Test Usage Report</Dropdown.Link >
                                                <Dropdown.Link href={route('account.stats')}>User Account Type Stats</Dropdown.Link >
                                                <Dropdown.Link href={route('affiliate.stats')}>Affiliate Subscriptions Stats</Dropdown.Link >
                                                <Dropdown.Link href={route('log.error')}>Error Log</Dropdown.Link>

                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>


                                <NavLink href={route('accounts')} active={url.startsWith('/accounts')}>
                                    Accounts
                                </NavLink>
                                <NavLink href={route('affiliates')} active={url.startsWith('/affiliates')}>
                                    Affiliates
                                </NavLink>
                                <NavLink href={route('customers')} active={url.startsWith('/customers')}>
                                    Users
                                </NavLink>
                                <NavLink href={route('tickets')} active={url.startsWith('/tickets')}>
                                    Tickets
                                </NavLink>

                            </div>
                        </div>

                        {/* Auth  */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="https://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}> Profile</Dropdown.Link>
                                        {/* <Dropdown.Link href={ route('earthlink.edit') }>EarthLink Profile</Dropdown.Link> */}
                                        {
                                            roles == 'admin' &&
                                            <>
                                                <Dropdown.Link href={route('systemuser')} active={url.startsWith('/systemuser')}> System Users Manage</Dropdown.Link>
                                                <Dropdown.Link href={route('usergroup')} active={url.startsWith('/usergroup')}> Users Group Manage</Dropdown.Link>
                                            </>
                                        }
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Humbergur */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>


                {/* Mobile Menu Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={route('users.online')} active={route().current('users.online')}>
                            Online Users
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('users.management')} active={route().current('users.management')}>
                            Manage Users
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={route('usersessions')} active={route().current('usersessions')}>
                            User Sessions
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('prepaid.needed')} active={route().current('prepaid.needed')}>
                            Prepaid Needed
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('deposit.transfer')} active={route().current('deposit.transfer')}>
                            Balance Transfer
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('affiliate.group')} active={route().current('affiliate.group')}>
                            Affiliate Group Report
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('test.usage')} active={route().current('test.usage')}>
                            Test Usage Report
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('account.stats')} active={route().current('account.stats')}>
                            User Account Type Stats
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('affiliate.stats')} active={route().current('affiliate.stats')}>
                            Affiliate Subscriptions Stats
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('log.error')} active={route().current('log.error')}>
                            Error Log
                        </ResponsiveNavLink>
                    </div>

                    {/* <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={ route('accounts') } active={ url.startsWith('/accounts') }>
                            Accounts
                        </ResponsiveNavLink>
                    </div> 
                    <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={ route('affiliates') } active={ url.startsWith('/affiliates') }>
                            Affiliates
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={ route('customers') } active={ url.startsWith('/customers') }>
                            Users
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1 border-t">
                        <ResponsiveNavLink href={ route('tickets') } active={ url.startsWith('/tickets') }>
                            Tickets
                        </ResponsiveNavLink>
                    </div>  */}

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <main>{children}</main>

        </div>
    );
}
