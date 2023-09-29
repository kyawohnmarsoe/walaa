import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Details({ auth,apitoken,id }) {
     const [onlineUsersData,setOnlineUsersData] = useState({users:[],errMessage:'',loading:true})
   const {users,errMessage,loading} = onlineUsersData

    const instance = axios.create({
        baseURL: 'https://rapi.earthlink.iq/api/reseller',
        headers: { 'Authorization': `Bearer ${apitoken}` }
        });

    useEffect(()=>{
       instance.get('/user/filter/WillBeDisabledIn2Days/20/30')
        .then(res => {
            setOnlineUsersData({users:res.data.value.itemsList,errMessage:'',loading:false}) 
            // console.log(res.data.value.itemsList[0].customer.customerFullName)
            console.log(res.data.value.itemsList[0])
        })
        .catch(err => {
          setOnlineUsersData({users:[],errMessage:err.message,loading:false})
          console.log(err)
        })
    },[])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Details</h2>}
        >
            <Head title="Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
