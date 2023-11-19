import React,{useEffect} from "react";
import axios from 'axios';

export default function Test ({ apitoken })
{
    useEffect(() =>
    {
        axios.request({
            headers: { 'Authorization': `Bearer ${ apitoken }` },
            method: "GET",
            url: `https://rapi.earthlink.iq/api/reseller/home/Dashboard`
        }).then(response =>
        {
            console.log(response.data);
        }).catch(err => console.log(err.message))
    }, [])

    return <div>{ apitoken }</div>;
}
