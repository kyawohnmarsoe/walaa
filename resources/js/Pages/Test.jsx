import React, { useEffect, useState } from "react";

export default function Test () {

    var data = JSON.stringify({
        'username': 'walaaim',
        'password': '@walaalink@',
        'loginType': '1',
        'grant_type': 'password'
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://rapi.earthlink.iq/api/reseller/Token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded' ,
            'Access-Control-Allow-Origin':'*'
    },
        data: data
    };

    useEffect(() =>
    {
        axios(config)
            .then(function (response)
            {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error)
            {
                console.log(error);
            });
    }, [])

  return <div>Test</div>;
}
