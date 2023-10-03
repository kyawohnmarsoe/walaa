
export default function CustomerInformation ({ user, className = '' })
{

    return (
        <div className="pt-12 ">
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
                <div className="bg-white overflow-hidden sm:rounded-lg">
                    <section className={ className }>
                        <header>
                            <h2 className="text-lg font-medium text-primary">Customer Information</h2>

                            <p className="mt-1 text-sm text-error">
                                Information in this section is publicly available to the user and can only be modified by the customer!
                            </p>
                        </header>

                        <table className="mt-6 space-y-6 ">
                            <tr>
                                <td>Full Name</td>
                                <td>: { user?.customer?.customerFullName }</td>
                            </tr>
                            <tr>
                                <td>Mobile Phone</td>
                                <td>: { user?.customer?.customerPhoneNumber }</td>
                            </tr>
                            <tr>
                                <td>2nd Mobile Phone</td>
                                <td>: { user?.customer?.customerSecondPhoneNumber }</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>: { user?.customer?.email }</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>: { user?.customer?.address }</td>
                            </tr>
                        </table>

                    </section>
                </div>
            </div>
        </div>
    );
}
